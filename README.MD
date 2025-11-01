# 🧠 CONECTAPRO – Backend

Este backend forma parte de **CONECTAPRO**, una plataforma para conectar profesionales con usuarios que buscan servicios especializados. Está construido con **Express**, **Prisma** y **PostgreSQL**, y expone una API RESTful para gestionar profesionales y categorías.

---

## 🚀 Tecnologías utilizadas

- [Express](https://expressjs.com/) – Framework para servidor HTTP
- [Prisma](https://www.prisma.io/) – ORM para Node.js
- [PostgreSQL](https://www.postgresql.org/) – Base de datos relacional
- [TypeScript](https://www.typescriptlang.org/) – Tipado estático para JavaScript

---

## 📦 Instalación

1. Clona el repositorio:

```bash
git clone https://github.com/tu-usuario/conectapro-backend.git
cd conectapro-backend

Instala dependencias:

bash
npm install
Configura tu archivo .env:

env
DATABASE_URL="postgresql://usuario:contraseña@localhost:5432/conectapro"
PORT=3000
Ejecuta migraciones:

bash
npx prisma migrate dev --name init
Inicia el servidor:

bash
npm run dev
🧪 Endpoints disponibles
Profesionales
GET /api/profesionales – Lista todos los profesionales

POST /api/profesionales – Crea un nuevo profesional

PUT /api/profesionales/:id – Actualiza un profesional existente

GET /api/profesionales/:id – Obtiene un profesional por ID