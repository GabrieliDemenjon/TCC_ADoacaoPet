import express from "express";
import helmet from "helmet";
import cors from "cors";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";
import { initRoutes } from "./infrastructure/express/express.routes";
import { errorHandler } from "./shared/handler/error.handler";

dotenv.config();

const app = express();

app.use(helmet());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 200,
  })
);

initRoutes(app);

app.use(errorHandler);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`🚀 Backend rodando em http://localhost:${PORT}`);
});
