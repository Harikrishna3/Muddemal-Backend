-- AlterTable
ALTER TABLE `CaseReg` ADD COLUMN `acquire_date` VARCHAR(191) NOT NULL DEFAULT 'Not Specified',
    ADD COLUMN `seized_date` VARCHAR(191) NOT NULL DEFAULT 'Not Specified';
