import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { forwardRequest } from "../utils/httpProxy.js";

const router = express.Router();
router.use(authMiddleware);

router.all("/*", (req, res) => {
  const PAYMENT_SERVICE_URL = process.env.PAYMENT_SERVICE_URL || "http://payment-service:5003";
  forwardRequest(req, res, PAYMENT_SERVICE_URL);
});

export default router;
