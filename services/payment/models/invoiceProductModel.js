import mongoose from "mongoose";

const InvoiceProductSchema = new mongoose.Schema({
    userID: { type: mongoose.Schema.Types.ObjectId, required: true },
    invoiceID: { type: mongoose.Schema.Types.ObjectId, required: true },
    productID: { type: mongoose.Schema.Types.ObjectId, required: true },
    qty: Number,
    price: Number,
    color: String,
    size: String,
}, { timestamps: true });

const InvoiceProduct  = mongoose.model("InvoiceProduct", InvoiceProductSchema);
export default InvoiceProduct