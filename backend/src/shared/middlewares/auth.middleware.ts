import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "super_secret_key_123";

export function jwtAuth(req: Request, res: Response, next: NextFunction) {
  const auth = req.headers.authorization;

  if (!auth) {
    return res.status(401).json({ message: "Token não fornecido" });
  }

  const parts = auth.split(" ");

  if (parts.length !== 2 || parts[0] !== "Bearer") {
    return res.status(401).json({ message: "Formato de token inválido" });
  }

  const token = parts[1];

  try {
    const payload = jwt.verify(token, JWT_SECRET) as any;

    if (!payload.id) {
      return res.status(401).json({ message: "Token malformado" });
    }

    (req as any).userId = payload.id;

    return next();
  } catch (err) {
    return res.status(401).json({ message: "Token inválido ou expirado" });
  }
}
