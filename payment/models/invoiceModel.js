import mongoose from "mongoose";

const InvoiceSchema = new mongoose.Schema({
    userID: { type: mongoose.Schema.Types.ObjectId, required: true },
    payable: Number,
    total: Number,
    vat: Number,
    cus_details: String,
    ship_details: String,
    tran_id: Number,
    val_id: Number,
    payment_status: { type: String, default: "pending" },
    delivery_status: { type: String, default: "pending" },
}, { timestamps: true });

const Invoice = mongoose.model("Invoice", InvoiceSchema);

export default Invoice
