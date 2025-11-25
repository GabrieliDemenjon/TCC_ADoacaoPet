import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function listPetsController() {
  return prisma.pet.findMany({
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });
}

export async function getPetController(id: number) {
  return prisma.pet.findUnique({
    where: { id },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });
}

export async function createPetController(req: any, res: any, next: any) {
  try {
    const { name, age, type, description } = req.body;

    const pet = await prisma.pet.create({
      data: {
        name,
        age,
        type,
        description,  
        adopted: false,
        userId: req.userId, 
      },
    });

    return res.status(201).json(pet);
  } catch (error) {
    next(error);
  }
}
