import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import api from "./api/index.js";
import * as middlewares from "./middlewares.js";
import db from "./models/db.js";
import models from "./models/index.js";

const app = express();

app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use("/api/v1", api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

db.sync({ alter: true })
  .then(() => {
    console.log("✅ Database connected and synchronized");
  })
  .catch((err) => {
    console.error("❌ Error synchronizing the database:", err);
  });

export default app;
