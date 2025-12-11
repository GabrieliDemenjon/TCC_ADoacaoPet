import { Application } from "express";
import authRoutes from "./routes/auth.routes";
import petsRoutes from "./routes/pets.routes";
import healthRoutes from "../../app/health-check/health.routes";

export function initRoutes(app: Application) {
  app.use("/auth", authRoutes);
  app.use("/pets", petsRoutes);
  app.use("/health", healthRoutes);

  app.use((req, res) => {
    res.status(404).json({ message: "Rota não encontrada" });
  });
}
