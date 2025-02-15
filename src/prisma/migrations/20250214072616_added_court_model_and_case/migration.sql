/*
  Warnings:

  - You are about to drop the `Documents` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Jewelry` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Seized_Mobiles` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Vehicles` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Documents` DROP FOREIGN KEY `Documents_item_id_fkey`;

-- DropForeignKey
ALTER TABLE `Jewelry` DROP FOREIGN KEY `Jewelry_item_id_fkey`;

-- DropForeignKey
ALTER TABLE `Seized_Mobiles` DROP FOREIGN KEY `Seized_Mobiles_item_id_fkey`;

-- DropForeignKey
ALTER TABLE `Vehicles` DROP FOREIGN KEY `Vehicles_item_id_fkey`;

-- AlterTable
ALTER TABLE `Seized_Items` ADD COLUMN `brandModel` VARCHAR(191) NULL,
    ADD COLUMN `chassisNumber` VARCHAR(191) NULL,
    ADD COLUMN `counterfeit` BOOLEAN NULL,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `currencyType` VARCHAR(191) NULL,
    ADD COLUMN `documentNumber` VARCHAR(191) NULL,
    ADD COLUMN `documentType` VARCHAR(191) NULL,
    ADD COLUMN `drugQuantity` DOUBLE NULL,
    ADD COLUMN `drugType` VARCHAR(191) NULL,
    ADD COLUMN `engineNumber` VARCHAR(191) NULL,
    ADD COLUMN `estimatedValue` DOUBLE NULL,
    ADD COLUMN `forgeryDetected` BOOLEAN NULL,
    ADD COLUMN `imeiNumber` VARCHAR(191) NULL,
    ADD COLUMN `issuingAuthority` VARCHAR(191) NULL,
    ADD COLUMN `jewelryType` VARCHAR(191) NULL,
    ADD COLUMN `jewelryWeight` DOUBLE NULL,
    ADD COLUMN `purityLevel` VARCHAR(191) NULL,
    ADD COLUMN `quantity` INTEGER NULL,
    ADD COLUMN `registrationNumber` VARCHAR(191) NULL,
    ADD COLUMN `serialNumber` VARCHAR(191) NULL,
    ADD COLUMN `totalAmount` DOUBLE NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `vehicleOwner` VARCHAR(191) NULL,
    ADD COLUMN `vehicleType` VARCHAR(191) NULL,
    ADD COLUMN `weaponModel` VARCHAR(191) NULL,
    ADD COLUMN `weaponType` VARCHAR(191) NULL,
    ADD COLUMN `weight` DOUBLE NULL;

-- DropTable
DROP TABLE `Documents`;

-- DropTable
DROP TABLE `Jewelry`;

-- DropTable
DROP TABLE `Seized_Mobiles`;

-- DropTable
DROP TABLE `Vehicles`;

-- CreateTable
CREATE TABLE `Case_reg` (
    `case_id` BIGINT NOT NULL AUTO_INCREMENT,
    `case_number` VARCHAR(191) NOT NULL,
    `case_description` VARCHAR(191) NOT NULL,
    `police_station` VARCHAR(100) NOT NULL,
    `investigating_officer` VARCHAR(100) NOT NULL,
    `case_status` ENUM('Open', 'Closed', 'Investigation') NOT NULL,
    `filing_date` DATETIME(3) NOT NULL,
    `closure_date` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Case_reg_case_number_key`(`case_number`),
    PRIMARY KEY (`case_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Court` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `order_number` VARCHAR(191) NOT NULL,
    `court_type` VARCHAR(191) NOT NULL,
    `court_name` VARCHAR(191) NOT NULL,
    `court_case_number` VARCHAR(191) NOT NULL,
    `court_policestation_info` VARCHAR(191) NOT NULL,
    `court_order_info` VARCHAR(191) NOT NULL,
    `case_id` BIGINT NOT NULL,
    `hearing_date` DATETIME(3) NULL,
    `verdict_date` DATETIME(3) NULL,
    `verdict_summary` VARCHAR(191) NULL,
    `judge_name` VARCHAR(191) NULL,
    `status` ENUM('Pending', 'Closed', 'UnderAppeal') NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Court_order_number_key`(`order_number`),
    UNIQUE INDEX `Court_court_case_number_key`(`court_case_number`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Image` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `item_id` BIGINT NOT NULL,
    `url` TEXT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `VehicleDocument` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `item_id` BIGINT NOT NULL,
    `doc_url` TEXT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SerialNumber` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `item_id` BIGINT NOT NULL,
    `serial` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Seized_Items` ADD CONSTRAINT `Seized_Items_case_id_fkey` FOREIGN KEY (`case_id`) REFERENCES `Case_reg`(`case_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Court` ADD CONSTRAINT `Court_case_id_fkey` FOREIGN KEY (`case_id`) REFERENCES `Case_reg`(`case_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Image` ADD CONSTRAINT `Image_item_id_fkey` FOREIGN KEY (`item_id`) REFERENCES `Seized_Items`(`item_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `VehicleDocument` ADD CONSTRAINT `VehicleDocument_item_id_fkey` FOREIGN KEY (`item_id`) REFERENCES `Seized_Items`(`item_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SerialNumber` ADD CONSTRAINT `SerialNumber_item_id_fkey` FOREIGN KEY (`item_id`) REFERENCES `Seized_Items`(`item_id`) ON DELETE CASCADE ON UPDATE CASCADE;
