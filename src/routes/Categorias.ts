import { Router } from "express";
import { PrismaClient } from "../generated/prisma/client";
const   router = Router();
const prisma = new PrismaClient();

router.post("/", async (req, res) => {  
    const { nombre } = req.body;
    try {
        const categoria = await prisma.categoria.create({
            data: { nombre },
        });
        res.json(categoria);
    }catch (error) {
        console.error("❌ Error al crear categoría:", error);
        res.status(500).json({ error: "Error al crear categoría" });
    }
});

// Obtener todas las categorías
router.get("/", async (_req, res) => {
    const categorias = await prisma.categoria.findMany();
    res.json(categorias);
});

router.get("/", async (_req, res) => {
    const categorias = await prisma.categoria.findMany();
    res.json(categorias);

});
export default router;
