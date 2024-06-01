/*
  Warnings:

  - You are about to alter the column `questionNumber` on the `Question` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - Added the required column `testNumber` to the `Question` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Question` ADD COLUMN `testNumber` VARCHAR(191) NOT NULL,
    MODIFY `questionNumber` INTEGER NOT NULL;
