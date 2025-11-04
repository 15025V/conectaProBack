import express from "express"
import  {PrismaClient } from "@prisma/client"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()

const router = express.Router()
const prisma = new PrismaClient()

const SECRET = process.env.JWT_SECRET ?? "fallback-secret"
const EXPIRES_IN = process.env.JWT_EXPIRES_IN ?? "3d"

// Registro
router.post("/register", async (req, res) => {
  const { nombre, correo, password, rol } = req.body
  const hashed = await bcrypt.hash(password, 10)

  try {
    const usuario = await prisma.usuario.create({
      data: {
        nombre,
        correo,
        password: hashed,
        rol: rol || "usuario" // ✅ Incluye el rol en el registro
      }
    })
    res.json({ id: usuario.id, correo: usuario.correo, rol: usuario.rol })
  } catch (err) {
    res.status(400).json({ error: "Correo ya registrado" })
  }
})

// Login
router.post("/login", async (req, res) => {
  const { correo, password } = req.body

  try {
    const usuario = await prisma.usuario.findUnique({where: { correo } })
    if (!usuario) return res.status(404).json({ error: "Usuario no encontrado" })

    const valid = await bcrypt.compare(password, usuario.password)
    if (!valid) return res.status(401).json({ error: "Contraseña incorrecta" })

    const token = jwt.sign(
      { id: usuario.id, correo: usuario.correo, rol: usuario.rol }, // ✅ Incluye el rol en el token
      SECRET,
      { expiresIn: EXPIRES_IN } as jwt.SignOptions
    )

    res.json({ token })
  } catch (err) {
    console.error("Error en login:", err)
    res.status(500).json({ error: "Error interno del servidor" })
  }
})

export default router
