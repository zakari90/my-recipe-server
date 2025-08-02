import { DataTypes } from "sequelize";
import db from "./db.js";

const User = db.define("User", {
  name: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
  },
  img_url: {
    type: DataTypes.STRING,
  },
}, {
  timestamps: true,
});

User.associate = (models) => {
  User.hasMany(models.Post);
  User.hasMany(models.Comment);
};
export default User;
