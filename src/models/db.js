import { Sequelize } from "sequelize";

const db = new Sequelize("my_recipe", "postgres", "123456789", {
  host: "localhost",
  dialect: "postgres",
  logging: false,
});

db.authenticate()
  .then(() => {
    console.log("✅ Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("❌ Unable to connect to the database:", err);
  });

export default db;
