import { Router } from "express";
import { PrismaClient } from "../generated/prisma/client";


const router = Router();
const prisma = new PrismaClient();

// Crear profesional
router.post("/", async (req, res) => {
  const { nombre, modalidad, categoriaId } = req.body;
  try {
    const profesional = await prisma.profesional.create({
      data: { nombre, modalidad, categoriaId },
    });
    res.json(profesional);
  } catch (error) {
    console.error("❌ Error al crear profesional:", error);
    res.status(500).json({ error: "Error al crear profesional" });
  }
});

// Obtener todos
router.get("/", async (_req, res) => {
  const profesionales = await prisma.profesional.findMany({
    include: { categoria: true },
  });
  res.json(profesionales);
});

// Obtener uno
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const profesional = await prisma.profesional.findUnique({
    where: { id: Number(id) },
    include: { categoria: true },
  });
  res.json(profesional);
});

// Actualizar
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { nombre, modalidad, categoriaId } = req.body;
  const profesional = await prisma.profesional.update({
    where: { id: Number(id) },
    data: { nombre, modalidad, categoriaId },
  });
  res.json(profesional);
});

// Eliminar
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await prisma.profesional.delete({ where: { id: Number(id) } });
  res.json({ message: "Profesional eliminado" });
});

export default router;
