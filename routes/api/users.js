const express = require("express");

const ctrl = require("../../controllers/users");

const {validateBody, authenticate, validateSubscription, upload, validateEmailVerification} = require("../../middlewares");

const {schemas} = require("../../models/user");

const router = express.Router();

router.post("/register", validateBody(schemas.authSchema), ctrl.register);

router.get("/verify/:verificationToken", ctrl.verifyEmail);

router.post("/verify", validateEmailVerification(schemas.emailSchema), ctrl.resendVerifyEmail);

router.post("/login", validateBody(schemas.authSchema), ctrl.login);

router.post("/logout", authenticate, ctrl.logout);

router.get("/current", authenticate, ctrl.getCurrent);

router.patch("/", authenticate, validateSubscription(schemas.subscriptionSchema), ctrl.changeSubscription);

router.patch("/avatars", authenticate, upload.single("avatar"), ctrl.updateAvatar);

module.exports = router;
