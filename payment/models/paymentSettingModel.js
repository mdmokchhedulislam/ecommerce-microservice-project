import mongoose from "mongoose";

const PaymentSettingSchema = new mongoose.Schema({
    store_id: String,
    store_passwd: String,
    currency: String,
    init_url: String,
    success_url: String,
    fail_url: String,
    cancel_url: String,
    ipn_url: String
});

const PaymentSetting = mongoose.model("PaymentSetting", PaymentSettingSchema);
