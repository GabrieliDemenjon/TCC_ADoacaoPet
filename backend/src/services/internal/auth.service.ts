import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "change_this";

export async function loginController(email: string, password: string) {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) throw new Error("Usuário não encontrado");

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new Error("Senha incorreta");

  const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "7d" });

  return { token, user };
}

export async function registerController(data: any) {
  const hashed = await bcrypt.hash(data.password, 10);

  const newUser = await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: hashed,
      phone: data.phone,
      city: data.city,
      state: data.state,
    },
  });

  return { id: newUser.id };
}

export async function forgotPasswordController(email: string) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return { status: "ok" }; // segurança

  console.log("Solicitação de redefinição:", email);
  return { status: "ok" };
}

export async function meController(req: any, res: any) {
  const user = await prisma.user.findUnique({
    where: { id: req.userId },
  });

  return res.json(user);
}
