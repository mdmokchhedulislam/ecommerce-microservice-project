import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { forwardRequest } from "../utils/httpProxy.js";

const router = express.Router();
router.use(authMiddleware);

router.all("/*", (req, res) => {
  const USER_SERVICE_URL = process.env.USER_SERVICE_URL;
  forwardRequest(req, res, USER_SERVICE_URL);
});

export default router;
