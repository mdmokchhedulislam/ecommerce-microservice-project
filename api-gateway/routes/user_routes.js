// user_routes.js
import express from "express";
import { isAuthenticate } from "../middleware/auth.js";
import { forwardRequest } from "../utils/http_proxy.js";

const router = express.Router();

// Authentication middleware
// router.use(isAuthenticate);

// সব route User Service-এ forward
router.use(async (req, res) => {
  try {
    const USER_SERVICE_URL = process.env.USER_SERVICE_URL;
    await forwardRequest(req, res, USER_SERVICE_URL);
  } catch (error) {
    console.error("Error forwarding request to User Service:", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

export default router;
