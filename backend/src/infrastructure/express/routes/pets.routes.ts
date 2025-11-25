import { Router } from "express";
import {
  listPetsController,
  getPetController,
  createPetController,
} from "../../../services/internal/pets.service";

import { jwtAuth } from "../../../shared/middlewares/auth.middleware";

const router = Router();


router.get("/", async (req, res, next) => {
  try {
    const pets = await listPetsController();
    res.json(pets);
  } catch (error) {
    next(error);
  }
});


router.get("/:id", async (req, res, next) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ message: "ID inválido" });
    }

    const pet = await getPetController(id);

    if (!pet) {
      return res.status(404).json({ message: "Pet não encontrado" });
    }

    res.json(pet);
  } catch (error) {
    next(error);
  }
});


router.post("/", jwtAuth, createPetController);

export default router;
