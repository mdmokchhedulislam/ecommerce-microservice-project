import express from "express"
import { auth } from "../middleware/verify.js";
import CreateInvoice from "../controller/invoiceController.js";
const router = express.Router();


router.post("/create-invoice", CreateInvoice);

// router.get("/payment-success/:trxID");

// router.get("/payment-fail/:trxID");

// router.get("/payment-cancel/:trxID");

// router.post("/payment-ipn/:trxID");

// router.get("/invoice-list/:user_id");

// router.get("/invoice-product-list/:user_id/:invoice_id");

export default router;
