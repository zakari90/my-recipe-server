import Comment from "./comment.js";
import Like from "./like.js";
import Post_Image from "./post-image.js";
import Post from "./post.js";
import User from "./user.js";

const models = {
  User,
  Post,
  Post_Image,
  Comment,
  Like,
};

Object.keys(models).forEach((key) => {
  if ("associate" in models[key]) {
    models[key].associate(models);
  }
});

export default models;
