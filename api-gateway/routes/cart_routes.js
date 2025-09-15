// import express from "express";
// import { isAuthenticate } from "../middleware/auth.js";
// import { forwardRequest } from "../utils/http_proxy.js";

// const router = express.Router();
// router.use(isAuthenticate);

// router.all("/*", (req, res) => {
//   const CART_SERVICE_URL = process.env.CART_SERVICE_URL || "http://cart-service:5002";
//   forwardRequest(req, res, CART_SERVICE_URL);
// });

// export default router;
