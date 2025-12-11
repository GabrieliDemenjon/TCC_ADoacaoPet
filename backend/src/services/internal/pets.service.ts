import { PrismaClient } from "@prisma/client";
import { sanitize } from "../../shared/utils/sanitizer";
import cloudinary from "../../shared/cloudinary/cloudinary";

const prisma = new PrismaClient();

export async function listPetsController() {
  return prisma.pet.findMany({
    include: {
      user: {
        select: { id: true, name: true, email: true }
      }
    }
  });
}

export async function getPetController(id: number) {
  return prisma.pet.findUnique({
    where: { id },
    include: {
      user: {
        select: { id: true, name: true, email: true }
      }
    }
  });
}

export async function createPetController(req: any, res: any, next: any) {
  try {

    const name = sanitize(req.body.name);
    const age = Number(req.body.age);
    const type = sanitize(req.body.type);
    const description = sanitize(req.body.description);

    if (!req.userId) {
      return res.status(401).json({ message: "Usuário não autenticado" });
    }

    let imageUrl = null;

    if (req.file) {

      imageUrl = req.file.path;
    }

    const pet = await prisma.pet.create({
      data: {
        name,
        age: Number(age),
        type,
        description,
        adopted: false,
        userId: req.userId,
        imageUrl,
      },
    });

    return res.status(201).json(pet);
  } catch (error) {
    next(error);
  }
}

export async function adoptPetController(req: any, res: any, next: any) {
  try {
    const id = Number(req.params.id);

    if (!req.userId) {
      return res.status(401).json({ message: "Usuário não autenticado" });
    }

    const pet = await prisma.pet.findUnique({ where: { id } });

    if (!pet) {
      return res.status(404).json({ message: "Pet não encontrado" });
    }

    if (pet.adopted) {
      return res.status(400).json({ message: "Pet já foi adotado" });
    }

    const updated = await prisma.pet.update({
      where: { id },
      data: {
        adopted: true,
        adoptedBy: req.userId,
        adoptedAt: new Date(),
      },
    });

    return res.json(updated);
  } catch (error) {
    next(error);
  }
}
