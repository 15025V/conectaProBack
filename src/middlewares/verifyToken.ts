// src/middleware/verifyToken.ts
import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"

const SECRET = process.env.JWT_SECRET
if (!SECRET) throw new Error("JWT_SECRET no está definido en .env")

export interface JwtPayloadExtended extends jwt.JwtPayload {
  id?: number
  correo?: string
  rol?: string
}

export function verifyToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Token no proporcionado" })
  }

  const token = authHeader.split(" ")[1]

  try {
    const decoded = jwt.verify(token, SECRET) as JwtPayloadExtended

    // Puedes acceder a req.user en tus controladores
    req.user = {
      id: decoded.id,
      correo: decoded.correo,
      rol: decoded.rol
    }

    next()
  } catch (err) {
    console.error("Error al verificar token:", err)
    return res.status(403).json({ error: "Token inválido o expirado" })
  }
}
