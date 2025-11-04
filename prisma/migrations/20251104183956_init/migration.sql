/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Usuario` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Usuario" DROP COLUMN "createdAt",
ADD COLUMN     "rol" TEXT NOT NULL DEFAULT 'usuario';
