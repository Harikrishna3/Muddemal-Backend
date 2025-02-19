/*
  Warnings:

  - You are about to alter the column `item_category` on the `SeizedItems` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(1))` to `VarChar(191)`.
  - Added the required column `Image_item_id_caseReg_fkey` to the `Image` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `CaseReg_case_number_key` ON `CaseReg`;

-- DropIndex
DROP INDEX `Court_courtCaseNumber_key` ON `Court`;

-- DropIndex
DROP INDEX `Court_order_number_key` ON `Court`;

-- AlterTable
ALTER TABLE `Image` ADD COLUMN `Image_item_id_caseReg_fkey` VARCHAR(191) NOT NULL,
    ADD COLUMN `type` VARCHAR(191) NOT NULL DEFAULT 'image';

-- AlterTable
ALTER TABLE `SeizedItems` MODIFY `item_category` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `QR` (
    `id` VARCHAR(191) NOT NULL,
    `seizedItem_Name` VARCHAR(191) NOT NULL,
    `case_id` VARCHAR(191) NOT NULL,
    `qr_base64` LONGTEXT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- RenameIndex
ALTER TABLE `Image` RENAME INDEX `Image_item_id_fkey` TO `Image_item_id_idx`;
