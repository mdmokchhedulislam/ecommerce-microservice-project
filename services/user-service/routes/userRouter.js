import { Router } from "express";

import { upload } from "../utils/multer.js";
import { registerUser, loginUser, findProfile } from "../controller/user-controller.js";
import { isAuthenticate } from "../middleware/authMiddleware.js";




const router = Router();

router.post("/signup", upload.single("image"), registerUser);
router.post("/login", loginUser);
// router.get("/profile",isAuthenticate, findProfile)
// router.get("/logout",isAuthenticate, logOut);
// router.get("/refresh-token", refreshToken);
router.get("/profile",isAuthenticate, findProfile);
// router.put("/update/role",isAuthenticate, updateUserRole);
// router.get("/verify",isAuthenticate, verifyTokenFromCookie);

export default router;