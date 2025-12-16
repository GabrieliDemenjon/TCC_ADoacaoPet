import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sanitize } from "../../shared/utils/sanitizer";

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "change_this";


export async function loginController(email: string, password: string) {

  const safeEmail = sanitize(email);

  const user = await prisma.user.findUnique({
    where: { email: safeEmail }
  });

  if (!user) throw new Error("Usuário não encontrado");

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new Error("Senha incorreta");


  const token = jwt.sign(
    {
      id: user.id,
      role: user.role || "ADOTANTE",
    },
    JWT_SECRET,
    { expiresIn: "7d" }
  );

  return { token, user };
}


export async function registerController(data: any) {

  const name = sanitize(data.name);
  const email = sanitize(data.email);
  const password = data.password; 
  const phone = sanitize(data.phone);
  const city = sanitize(data.city);
  const state = sanitize(data.state);

  const hashed = await bcrypt.hash(password, 10);

  const newUser = await prisma.user.create({
    data: {
      name,
      email,
      password: hashed,
      phone,
      city,
      state,
      role: "ADOTANTE", 
    },
  });

  return { id: newUser.id };
}


export async function forgotPasswordController(email: string) {
  const safeEmail = sanitize(email);

  const user = await prisma.user.findUnique({
    where: { email: safeEmail }
  });

  if (!user) return { status: "ok" };

  console.log("Pedido de redefinição de senha:", safeEmail);

  return { status: "ok" };
}


export async function meController(req: any, res: any) {
  const user = await prisma.user.findUnique({
    where: { id: req.userId },
  });

  return res.json(user);
}

export async function updateProfileController(userId: number, data: any) {

  const name = sanitize(data.name);
  const email = sanitize(data.email);
  const phone = sanitize(data.phone);
  const city = sanitize(data.city);
  const state = sanitize(data.state);

  const updated = await prisma.user.update({
    where: { id: userId },
    data: {
      name,
      email,
      phone,
      city,
      state,
    },
  });

  return updated;
}
