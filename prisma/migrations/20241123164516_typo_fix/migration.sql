/*
  Warnings:

  - You are about to drop the column `updateAt` on the `Page` table. All the data in the column will be lost.
  - You are about to drop the column `updateAt` on the `Site` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Page" DROP COLUMN "updateAt",
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Site" DROP COLUMN "updateAt",
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
