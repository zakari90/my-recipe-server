import express from "express";
import { getProfile, login, register, updateProfile, updateUserPhoto, uploadUserPhoto } from "../controllers/user-controller.js";
import isLoggedIn from "../middlewares/authentication.js";
import upload from "../middlewares/upload.js";
import { updateUserValidationRules, userValidationRules, validate } from "../middlewares/validtor.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    message: "أهلًا بالعالم!",
  });
});
router.post("/account/login", login);
router.post("/account/register", userValidationRules(), validate, register);
router.get("/account/profile", isLoggedIn, getProfile);
router.put("/account/profile/update", updateUserValidationRules(), validate, isLoggedIn, updateProfile);
router.put("/account/profile/upload-photo", upload.single("avatar"), isLoggedIn, uploadUserPhoto);
router.put("/account/profile/update-user-photo", upload.single("avatar"), isLoggedIn, updateUserPhoto);

export default router;
