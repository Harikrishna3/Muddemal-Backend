/*
  Warnings:

  - You are about to alter the column `case_status` on the `CaseReg` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(2))` to `VarChar(191)`.
  - You are about to alter the column `status` on the `Court` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(5))` to `VarChar(191)`.
  - You are about to alter the column `current_status` on the `SeizedItems` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(4))` to `VarChar(191)`.

*/
-- AlterTable
ALTER TABLE `CaseReg` MODIFY `case_status` VARCHAR(191) NOT NULL DEFAULT 'Open';

-- AlterTable
ALTER TABLE `Court` MODIFY `status` VARCHAR(191) NULL DEFAULT 'Pending';

-- AlterTable
ALTER TABLE `SeizedItems` MODIFY `current_status` VARCHAR(191) NULL DEFAULT 'InCustody';
