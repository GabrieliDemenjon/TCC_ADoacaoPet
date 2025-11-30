import { Router } from "express";
import {
  listPetsController,
  getPetController,
  createPetController,
  adoptPetController,
} from "../../../services/internal/pets.service";

import { jwtAuth } from "../../../shared/middlewares/auth.middleware";
import { upload } from "../../../shared/multer/multer";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = Router();


router.get("/", async (req, res, next) => {
  try {
    const pets = await listPetsController();
    res.json(pets);
  } catch (e) {
    next(e);
  }
});


router.get("/my-pets", jwtAuth, async (req: any, res, next) => {
  try {
    const pets = await prisma.pet.findMany({
      where: { userId: req.userId },
      include: { user: true },
    });

    res.json(pets);
  } catch (e) {
    next(e);
  }
});


router.get("/:id", async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const pet = await getPetController(id);
    res.json(pet);
  } catch (e) {
    next(e);
  }
});


router.post("/", jwtAuth, upload.single("image"), createPetController);


router.patch("/:id/adopt", jwtAuth, adoptPetController);

export default router;
