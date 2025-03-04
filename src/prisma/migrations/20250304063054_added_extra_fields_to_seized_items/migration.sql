/*
  Warnings:

  - You are about to drop the column `Image_item_id_caseReg_fkey` on the `Image` table. All the data in the column will be lost.
  - You are about to drop the column `brandModel` on the `SeizedItems` table. All the data in the column will be lost.
  - You are about to drop the column `chassisNumber` on the `SeizedItems` table. All the data in the column will be lost.
  - You are about to drop the column `counterfeit` on the `SeizedItems` table. All the data in the column will be lost.
  - You are about to drop the column `currencyType` on the `SeizedItems` table. All the data in the column will be lost.
  - You are about to drop the column `documentNumber` on the `SeizedItems` table. All the data in the column will be lost.
  - You are about to drop the column `documentType` on the `SeizedItems` table. All the data in the column will be lost.
  - You are about to drop the column `drugQuantity` on the `SeizedItems` table. All the data in the column will be lost.
  - You are about to drop the column `drugType` on the `SeizedItems` table. All the data in the column will be lost.
  - You are about to drop the column `engineNumber` on the `SeizedItems` table. All the data in the column will be lost.
  - You are about to drop the column `estimatedValue` on the `SeizedItems` table. All the data in the column will be lost.
  - You are about to drop the column `forgeryDetected` on the `SeizedItems` table. All the data in the column will be lost.
  - You are about to drop the column `imeiNumber` on the `SeizedItems` table. All the data in the column will be lost.
  - You are about to drop the column `issuingAuthority` on the `SeizedItems` table. All the data in the column will be lost.
  - You are about to drop the column `jewelryType` on the `SeizedItems` table. All the data in the column will be lost.
  - You are about to drop the column `jewelryWeight` on the `SeizedItems` table. All the data in the column will be lost.
  - You are about to drop the column `purityLevel` on the `SeizedItems` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `SeizedItems` table. All the data in the column will be lost.
  - You are about to drop the column `registrationNumber` on the `SeizedItems` table. All the data in the column will be lost.
  - You are about to drop the column `serialNumber` on the `SeizedItems` table. All the data in the column will be lost.
  - You are about to drop the column `totalAmount` on the `SeizedItems` table. All the data in the column will be lost.
  - You are about to drop the column `vehicleOwner` on the `SeizedItems` table. All the data in the column will be lost.
  - You are about to drop the column `vehicleType` on the `SeizedItems` table. All the data in the column will be lost.
  - You are about to drop the column `weaponModel` on the `SeizedItems` table. All the data in the column will be lost.
  - You are about to drop the column `weaponType` on the `SeizedItems` table. All the data in the column will be lost.
  - You are about to alter the column `weight` on the `SeizedItems` table. The data in that column could be lost. The data in that column will be cast from `Double` to `VarChar(191)`.
  - You are about to drop the `SerialNumber` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `VehicleDocument` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `SerialNumber` DROP FOREIGN KEY `SerialNumber_item_id_fkey`;

-- DropForeignKey
ALTER TABLE `VehicleDocument` DROP FOREIGN KEY `VehicleDocument_item_id_fkey`;

-- AlterTable
ALTER TABLE `Image` DROP COLUMN `Image_item_id_caseReg_fkey`;

-- AlterTable
ALTER TABLE `SeizedItems` DROP COLUMN `brandModel`,
    DROP COLUMN `chassisNumber`,
    DROP COLUMN `counterfeit`,
    DROP COLUMN `currencyType`,
    DROP COLUMN `documentNumber`,
    DROP COLUMN `documentType`,
    DROP COLUMN `drugQuantity`,
    DROP COLUMN `drugType`,
    DROP COLUMN `engineNumber`,
    DROP COLUMN `estimatedValue`,
    DROP COLUMN `forgeryDetected`,
    DROP COLUMN `imeiNumber`,
    DROP COLUMN `issuingAuthority`,
    DROP COLUMN `jewelryType`,
    DROP COLUMN `jewelryWeight`,
    DROP COLUMN `purityLevel`,
    DROP COLUMN `quantity`,
    DROP COLUMN `registrationNumber`,
    DROP COLUMN `serialNumber`,
    DROP COLUMN `totalAmount`,
    DROP COLUMN `vehicleOwner`,
    DROP COLUMN `vehicleType`,
    DROP COLUMN `weaponModel`,
    DROP COLUMN `weaponType`,
    ADD COLUMN `Bhag` VARCHAR(191) NULL DEFAULT 'Not Specified',
    ADD COLUMN `NoOfItems` VARCHAR(191) NULL DEFAULT 'Not Specified',
    ADD COLUMN `depositDate` VARCHAR(191) NULL DEFAULT 'Not Specified',
    ADD COLUMN `fromWhomReceived` VARCHAR(191) NULL DEFAULT 'Not Specified',
    ADD COLUMN `itemStateDescription` VARCHAR(191) NULL DEFAULT 'Not Specified',
    MODIFY `sub_category` VARCHAR(50) NULL,
    MODIFY `item_description` VARCHAR(191) NULL,
    MODIFY `weight` VARCHAR(191) NULL DEFAULT 'Not Specified';

-- DropTable
DROP TABLE `SerialNumber`;

-- DropTable
DROP TABLE `VehicleDocument`;
