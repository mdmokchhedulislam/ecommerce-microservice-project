import mongoose from "mongoose";
import axios from "axios";
import InvoiceProduct from "../models/invoiceProductModel.js";
import Invoice from "../models/invoiceModel.js";

const ObjectID = mongoose.Types.ObjectId;

export const CreateInvoice = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const user_id = req.user?._id;
    const cus_email = req.user?.email;
    const token = req.cookies?.token;

    if (!user_id || !cus_email || !token) {
      return res.status(401).json({ message: "Unauthorized: Missing token or user info" });
    }

    // ================= Step 1: Fetch Cart =================
    const cartRes = await axios.get("http://localhost:3002/api/cart/CartList", {
      headers: { Authorization: `Bearer ${token}` },
    });

    const CartProducts = cartRes.data?.data || [];

    if (CartProducts.length === 0) {
      return res.status(400).json({ message: "Cart is empty. Cannot create invoice." });
    }

    // ================= Step 2: Calculate totals =================
    let totalAmount = 0;
    CartProducts.forEach((el) => {
      const price = el.product?.discount
        ? parseFloat(el.product.discountPrice)
        : parseFloat(el.product.price);

      totalAmount += parseFloat(el.qty) * price;
    });

    const vat = totalAmount * 0.05;
    const payable = totalAmount + vat;

    // ================= Step 3: Fetch Profile =================
    const profileRes = await axios.get("http://localhost:3000/api/auth/profile", {
      headers: { Authorization: `Bearer ${token}` },
    });

    const Profile = profileRes.data?.data;
    if (!Profile) {
      return res.status(404).json({ message: "User profile not found" });
    }

    const cus_details = `Name:${Profile.name}, Email:${Profile.email}, Phone:${Profile.phone}`;
    // const ship_details = `Name:${Profile.ship_name}, City:${Profile.ship_city}, Address:${Profile.ship_add}, Phone:${Profile.ship_phone}`;

    // ================= Step 4: Transaction IDs =================
    const tran_id = Math.floor(10000000 + Math.random() * 90000000);
    const val_id = 0; // later update after payment gateway validation

    // ================= Step 5: Create Invoice =================
    const createInvoice = await Invoice.create(
      [
        {
          userID: user_id,
          payable,
          cus_details,
          // ship_details,
          tran_id,
          val_id,
          payment_status: "pending",
          delivery_status: "pending",
          total: totalAmount,
          vat,
        },
      ],
      { session }
    );

    const invoice_id = createInvoice[0]._id;

    // ================= Step 6: Create Invoice Products =================
    const invoiceProducts = CartProducts.map((el) => ({
      userID: user_id,
      productID: el.productID,
      invoiceID: invoice_id,
      qty: el.qty,
      price: el.product?.discount ? el.product.discountPrice : el.product.price,
      color: el.color,
      size: el.size,
    }));

    await InvoiceProduct.insertMany(invoiceProducts, { session });

    // ================= Step 7: Commit Transaction =================
    await session.commitTransaction();
    session.endSession();

    res.status(201).json({
      success: true,
      message: "Invoice created successfully",
      invoice: createInvoice[0],
      products: invoiceProducts,
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    console.error("CreateInvoice Error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to create invoice",
      error: error.message,
    });
  }
};



  // // ============= Step 6: Remove Cart ==========
  // await axios.delete(`${CART_SERVICE_URL}/clear/${user_id}`);

  // // ============= Step 7: Prepare SSL Payment ==========
  // let PaymentSettings = await PaymentSettingModel.findOne();

  // const form = new FormData();
  // form.append('store_id', PaymentSettings.store_id);
  // form.append('store_passwd', PaymentSettings.store_passwd);
  // form.append('total_amount', payable.toString());
  // form.append('currency', PaymentSettings.currency);
  // form.append('tran_id', tran_id);

  // form.append('success_url', `${PaymentSettings.success_url}/${tran_id}`);
  // form.append('fail_url', `${PaymentSettings.fail_url}/${tran_id}`);
  // form.append('cancel_url', `${PaymentSettings.cancel_url}/${tran_id}`);
  // form.append('ipn_url', `${PaymentSettings.ipn_url}/${tran_id}`);

  // form.append('cus_name', Profile.cus_name);
  // form.append('cus_email', cus_email);
  // form.append('cus_add1', Profile.cus_add);
  // form.append('cus_city', Profile.cus_city);
  // form.append('cus_state', Profile.cus_state);
  // form.append('cus_postcode', Profile.cus_postcode);
  // form.append('cus_country', Profile.cus_country);
  // form.append('cus_phone', Profile.cus_phone);

  // let SSLRes = await axios.post(PaymentSettings.init_url, form, { headers: form.getHeaders() });

  // return { status: "success", data: SSLRes.data };
// };

// const PaymentSuccessService = async (trxID) => {
//     await InvoiceModel.updateOne({ tran_id: trxID }, { payment_status: "success" });
//     return { status: "success" };
// };

// const PaymentFailService = async (trxID) => {
//     await InvoiceModel.updateOne({ tran_id: trxID }, { payment_status: "fail" });
//     return { status: "fail" };
// };

// const PaymentCancelService = async (trxID) => {
//     await InvoiceModel.updateOne({ tran_id: trxID }, { payment_status: "cancel" });
//     return { status: "cancel" };
// };

// const PaymentIPNService = async (trxID, status) => {
//     await InvoiceModel.updateOne({ tran_id: trxID }, { payment_status: status });
//     return { status: "success" };
// };

// const InvoiceListService = async (user_id) => {
//     let invoice = await InvoiceModel.find({ userID: user_id });
//     return { status: "success", data: invoice };
// };

// const InvoiceProductListService = async (user_id, invoice_id) => {
//     let products = await InvoiceProductModel.find({ userID: user_id, invoiceID: invoice_id });
//     return { status: "success", data: products };
// };

export default CreateInvoice;
