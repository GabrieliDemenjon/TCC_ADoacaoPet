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
      include: {
        user: true,
        adopter: true,
      },
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


router.patch("/:id", jwtAuth, async (req: any, res, next) => {
  try {
    const id = Number(req.params.id);
    const { name, age, type, description } = req.body;

    const pet = await prisma.pet.findUnique({ where: { id } });
    if (!pet) return res.status(404).json({ message: "Pet não encontrado" });

   
    if (pet.userId !== req.userId)
      return res.status(403).json({ message: "Não autorizado" });

    const updated = await prisma.pet.update({
      where: { id },
      data: {
        name,
        age: Number(age),
        type,
        description,
      },
    });

    res.json(updated);
  } catch (e) {
    next(e);
  }
});


router.delete("/:id", jwtAuth, async (req: any, res, next) => {
  try {
    const id = Number(req.params.id);

    const pet = await prisma.pet.findUnique({ where: { id } });
    if (!pet) return res.status(404).json({ message: "Pet não encontrado" });


    if (pet.userId !== req.userId)
      return res.status(403).json({ message: "Não autorizado" });

    await prisma.pet.delete({ where: { id } });

    res.json({ message: "Pet removido com sucesso" });
  } catch (e) {
    next(e);
  }
});

export default router;
