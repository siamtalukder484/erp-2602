const express = require("express");
const router = express.Router();
const authController = require("../../controllers/authController");
const { protect } = require("../../middleware/authMiddleware");
const upload = require("../../middleware/fileUpload");

router.post("/registration", authController.registrationController);
router.post("/login", authController.loginController);

router.get("/verify-email/:token", authController.verifyEmailController);

router.post("/resend-verification", authController.resendVerificationController);
router.post("/refresh-token", authController.refreshTokenController);
router.post("/logout", authController.logoutController);

router.post("/forgot-password", authController.forgotPasswordController);
router.post("/reset-password/:token", authController.resetPasswordController);

router.get("/me", protect, authController.getMeController);

// router.post("/registration", upload.single("picture"), authController.registrationController);

module.exports = router;
