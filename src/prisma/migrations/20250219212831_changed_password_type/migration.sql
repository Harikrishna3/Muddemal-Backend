/*
  Warnings:

  - You are about to drop the column `case_date` on the `CaseReg` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `CaseReg` DROP COLUMN `case_date`;

-- AlterTable
ALTER TABLE `User` MODIFY `password` VARCHAR(255) NOT NULL;
