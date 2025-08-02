import { DataTypes } from "sequelize";
import db from "./db.js";

const Comment = db.define("Comment", {
  text: {
    type: DataTypes.STRING,
  },
}, {
  timestamps: false,
});

Comment.associate = (models) => {
  Comment.belongsTo(models.User);
  Comment.belongsTo(models.Post);
};
export default Comment;
