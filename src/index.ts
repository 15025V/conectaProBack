import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import ProfesionalRoutes from './routes/Profesionals'
import categoriaRoutes from './routes/Categorias'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

app.use('/api/professionals', ProfesionalRoutes)

app.use("/api/categories", categoriaRoutes);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`)
})
