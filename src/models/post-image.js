import { DataTypes } from "sequelize";
import db from "./db.js";

const Post_Image = db.define("Post_Image", {
  img_uri: {
    type: DataTypes.STRING,
  },
}, {
  timestamps: false,
});

Post_Image.associate = (models) => {
  Post_Image.belongsTo(models.Post);
};

export default Post_Image;
