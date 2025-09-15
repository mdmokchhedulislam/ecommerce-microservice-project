import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { forwardRequest } from "../utils/httpProxy.js";

const router = express.Router();
router.use(authMiddleware);

router.all("/*", (req, res) => {
  const CART_SERVICE_URL = process.env.CART_SERVICE_URL || "http://cart-service:5002";
  forwardRequest(req, res, CART_SERVICE_URL);
});

export default router;
