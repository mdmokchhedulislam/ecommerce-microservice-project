import { Router } from "express";

import { upload } from "../utils/multer.js";
import { isAuthenticate } from "../middleware/authMiddleware.js";
import { registerUser, loginUser, logOut, updateUserRole, verifyTokenFromCookie } from "../controller/user-controller.js";



const router = Router();

router.post("/signup", upload.single("image"), registerUser);
router.post("/login", loginUser);
router.get("/logout",isAuthenticate, logOut);
router.put("/update/role",isAuthenticate, updateUserRole);
router.get("/verify-token", verifyTokenFromCookie);

export default router;