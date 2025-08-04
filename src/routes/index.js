import express from "express";
import { deleteMyPost, getAllMyPosts, getAllPosts, getPost, newPost } from "../controllers/post-controller.js";
import { getProfile, login, register, updateProfile, updateUserPhoto, uploadUserPhoto } from "../controllers/user-controller.js";
import isLoggedIn from "../middlewares/authentication.js";
import upload from "../middlewares/upload.js";
import { postValidationRules, updateUserValidationRules, userValidationRules, validate } from "../middlewares/validtor.js";

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

// post router

router.post("/posts/create", upload.array("postImg", 5), postValidationRules(), validate, isLoggedIn, newPost);
router.get("/posts", isLoggedIn, getAllPosts);
router.get("/posts/:postId", isLoggedIn, getPost);
router.get("/my-posts", isLoggedIn, getAllMyPosts);
router.delete("/my-posts/delete", isLoggedIn, deleteMyPost);

export default router;
