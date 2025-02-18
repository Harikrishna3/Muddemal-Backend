/*
  Warnings:

  - The primary key for the `CaseReg` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Court` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Image` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Logs` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `SeizedItems` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `SerialNumber` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `VehicleDocument` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE `Court` DROP FOREIGN KEY `Court_case_id_fkey`;

-- DropForeignKey
ALTER TABLE `Image` DROP FOREIGN KEY `Image_item_id_fkey`;

-- DropForeignKey
ALTER TABLE `SeizedItems` DROP FOREIGN KEY `SeizedItems_case_id_fkey`;

-- DropForeignKey
ALTER TABLE `SerialNumber` DROP FOREIGN KEY `SerialNumber_item_id_fkey`;

-- DropForeignKey
ALTER TABLE `VehicleDocument` DROP FOREIGN KEY `VehicleDocument_item_id_fkey`;

-- DropIndex
DROP INDEX `Court_case_id_fkey` ON `Court`;

-- DropIndex
DROP INDEX `Image_item_id_fkey` ON `Image`;

-- DropIndex
DROP INDEX `SeizedItems_case_id_fkey` ON `SeizedItems`;

-- DropIndex
DROP INDEX `SerialNumber_item_id_fkey` ON `SerialNumber`;

-- DropIndex
DROP INDEX `VehicleDocument_item_id_fkey` ON `VehicleDocument`;

-- AlterTable
ALTER TABLE `CaseReg` DROP PRIMARY KEY,
    ADD COLUMN `region` VARCHAR(191) NOT NULL DEFAULT 'default_region',
    ADD COLUMN `year` INTEGER NOT NULL DEFAULT 2025,
    MODIFY `case_id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`case_id`);

-- AlterTable
ALTER TABLE `Court` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `case_id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `Image` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `item_id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `Logs` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `entityId` VARCHAR(191) NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `SeizedItems` DROP PRIMARY KEY,
    MODIFY `item_id` VARCHAR(191) NOT NULL,
    MODIFY `case_id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`item_id`);

-- AlterTable
ALTER TABLE `SerialNumber` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `item_id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `User` ADD COLUMN `designation` VARCHAR(191) NOT NULL DEFAULT 'default_designation',
    ADD COLUMN `mobile` VARCHAR(191) NOT NULL DEFAULT '000-000-0000';

-- AlterTable
ALTER TABLE `VehicleDocument` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `item_id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AddForeignKey
ALTER TABLE `SeizedItems` ADD CONSTRAINT `SeizedItems_case_id_fkey` FOREIGN KEY (`case_id`) REFERENCES `CaseReg`(`case_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Court` ADD CONSTRAINT `Court_case_id_fkey` FOREIGN KEY (`case_id`) REFERENCES `CaseReg`(`case_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Image` ADD CONSTRAINT `Image_item_id_fkey` FOREIGN KEY (`item_id`) REFERENCES `SeizedItems`(`item_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `VehicleDocument` ADD CONSTRAINT `VehicleDocument_item_id_fkey` FOREIGN KEY (`item_id`) REFERENCES `SeizedItems`(`item_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SerialNumber` ADD CONSTRAINT `SerialNumber_item_id_fkey` FOREIGN KEY (`item_id`) REFERENCES `SeizedItems`(`item_id`) ON DELETE CASCADE ON UPDATE CASCADE;
