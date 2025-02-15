/*
  Warnings:

  - You are about to drop the column `court_case_number` on the `Court` table. All the data in the column will be lost.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the `Case_reg` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Seized_Items` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[courtCaseNumber]` on the table `Court` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `courtCaseNumber` to the `Court` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Court` DROP FOREIGN KEY `Court_case_id_fkey`;

-- DropForeignKey
ALTER TABLE `Image` DROP FOREIGN KEY `Image_item_id_fkey`;

-- DropForeignKey
ALTER TABLE `Seized_Items` DROP FOREIGN KEY `Seized_Items_case_id_fkey`;

-- DropForeignKey
ALTER TABLE `SerialNumber` DROP FOREIGN KEY `SerialNumber_item_id_fkey`;

-- DropForeignKey
ALTER TABLE `VehicleDocument` DROP FOREIGN KEY `VehicleDocument_item_id_fkey`;

-- DropIndex
DROP INDEX `Court_case_id_fkey` ON `Court`;

-- DropIndex
DROP INDEX `Court_court_case_number_key` ON `Court`;

-- DropIndex
DROP INDEX `Image_item_id_fkey` ON `Image`;

-- DropIndex
DROP INDEX `SerialNumber_item_id_fkey` ON `SerialNumber`;

-- DropIndex
DROP INDEX `VehicleDocument_item_id_fkey` ON `VehicleDocument`;

-- AlterTable
ALTER TABLE `Court` DROP COLUMN `court_case_number`,
    ADD COLUMN `courtCaseNumber` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `User` DROP PRIMARY KEY,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `password` VARCHAR(191) NOT NULL,
    ADD COLUMN `policeStationId` VARCHAR(191) NULL,
    ADD COLUMN `role` ENUM('ADMIN', 'USER') NOT NULL DEFAULT 'USER',
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- DropTable
DROP TABLE `Case_reg`;

-- DropTable
DROP TABLE `Seized_Items`;

-- CreateTable
CREATE TABLE `PoliceStation` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `region` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `state` VARCHAR(191) NOT NULL,
    `district` VARCHAR(191) NOT NULL,
    `taluka` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CaseReg` (
    `case_id` BIGINT NOT NULL AUTO_INCREMENT,
    `case_number` VARCHAR(191) NOT NULL,
    `case_description` VARCHAR(191) NOT NULL,
    `policeStationId` VARCHAR(191) NOT NULL,
    `investigating_officer` VARCHAR(100) NOT NULL,
    `case_status` ENUM('Open', 'Closed', 'Investigation') NOT NULL,
    `filing_date` DATETIME(3) NOT NULL,
    `closure_date` DATETIME(3) NULL,
    `userId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `CaseReg_case_number_key`(`case_number`),
    PRIMARY KEY (`case_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SeizedItems` (
    `item_id` BIGINT NOT NULL AUTO_INCREMENT,
    `case_id` BIGINT NOT NULL,
    `item_category` ENUM('Jewelry', 'Vehicle', 'Electronics', 'Mobile', 'Documents', 'Drugs', 'Other') NOT NULL,
    `sub_category` VARCHAR(50) NOT NULL,
    `item_description` VARCHAR(191) NOT NULL,
    `seized_date` DATETIME(3) NOT NULL,
    `seized_location` VARCHAR(255) NOT NULL,
    `seizing_officer` VARCHAR(100) NOT NULL,
    `current_status` ENUM('InCustody', 'Released', 'Disposed', 'Transferred') NOT NULL,
    `release_date` DATETIME(3) NULL,
    `released_to` VARCHAR(100) NULL,
    `remarks` VARCHAR(191) NULL,
    `jewelryType` VARCHAR(191) NULL,
    `jewelryWeight` DOUBLE NULL,
    `purityLevel` VARCHAR(191) NULL,
    `quantity` INTEGER NULL,
    `weight` DOUBLE NULL,
    `estimatedValue` DOUBLE NULL,
    `brandModel` VARCHAR(191) NULL,
    `serialNumber` VARCHAR(191) NULL,
    `imeiNumber` VARCHAR(191) NULL,
    `vehicleType` VARCHAR(191) NULL,
    `registrationNumber` VARCHAR(191) NULL,
    `chassisNumber` VARCHAR(191) NULL,
    `engineNumber` VARCHAR(191) NULL,
    `vehicleOwner` VARCHAR(191) NULL,
    `documentType` VARCHAR(191) NULL,
    `documentNumber` VARCHAR(191) NULL,
    `issuingAuthority` VARCHAR(191) NULL,
    `forgeryDetected` BOOLEAN NULL,
    `currencyType` VARCHAR(191) NULL,
    `totalAmount` DOUBLE NULL,
    `counterfeit` BOOLEAN NULL,
    `drugType` VARCHAR(191) NULL,
    `drugQuantity` DOUBLE NULL,
    `weaponType` VARCHAR(191) NULL,
    `weaponModel` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`item_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Logs` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `entityType` ENUM('CaseReg', 'SeizedItem', 'Court') NOT NULL,
    `entityId` BIGINT NOT NULL,
    `actionType` ENUM('Created', 'Updated', 'Deleted') NOT NULL,
    `changedData` JSON NULL,
    `userId` VARCHAR(191) NOT NULL,
    `timestamp` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Court_courtCaseNumber_key` ON `Court`(`courtCaseNumber`);

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_policeStationId_fkey` FOREIGN KEY (`policeStationId`) REFERENCES `PoliceStation`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CaseReg` ADD CONSTRAINT `CaseReg_policeStationId_fkey` FOREIGN KEY (`policeStationId`) REFERENCES `PoliceStation`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CaseReg` ADD CONSTRAINT `CaseReg_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

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

-- AddForeignKey
ALTER TABLE `Logs` ADD CONSTRAINT `Logs_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
