// import express from "express";
// import { isAuthenticate } from "../middleware/auth.js";
// import { forwardRequest } from "../utils/http_proxy.js";

// const router = express.Router();
// router.use(isAuthenticate);

// router.all("/*", (req, res) => {
//   const PAYMENT_SERVICE_URL = process.env.PAYMENT_SERVICE_URL || "http://payment-service:5003";
//   forwardRequest(req, res, PAYMENT_SERVICE_URL);
// });

// export default router;
