import { DataTypes } from "sequelize";
import db from "./db.js";

const Post = db.define("Post", {
  title: {
    type: DataTypes.STRING,
  },
  contents: {
    type: DataTypes.TEXT,
  },
  steps: {
    type: DataTypes.JSON,
  },
  country: {
    type: DataTypes.STRING,
  },
  region: {
    type: DataTypes.STRING,
  },
});

Post.associate = (models) => {
  Post.belongsTo(models.User);// this will add userId to Post model
  Post.hasMany(models.Post_Image); // this will add postId to Post_Image model
  Post.hasMany(models.Comment); // this will add postId to Comment model
};

export default Post;
