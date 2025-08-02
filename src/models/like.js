import db from "./db.js";

const Like = db.define("Like", {}, {
  timestamps: false,
});

Like.associate = (models) => {
  models.User.belongsToMany(models.Post, { through: "Like" });
  models.Post.belongsToMany(models.User, { through: "Like" });
};

export default Like;
