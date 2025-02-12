-- CreateTable
CREATE TABLE `Seized_Items` (
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

    PRIMARY KEY (`item_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Seized_Mobiles` (
    `item_id` BIGINT NOT NULL,
    `brand` VARCHAR(50) NOT NULL,
    `model` VARCHAR(50) NOT NULL,
    `IMEI_no_1` VARCHAR(15) NOT NULL,
    `IMEI_no_2` VARCHAR(15) NULL,
    `serial_no` VARCHAR(50) NOT NULL,
    `mobile_condition` ENUM('Working', 'Damaged', 'Unknown') NOT NULL,
    `charger_available` BOOLEAN NOT NULL,
    `sim_card_status` ENUM('Present', 'Removed', 'NotApplicable') NOT NULL,
    `network_operator` VARCHAR(50) NULL,
    `locked_status` ENUM('Locked', 'Unlocked', 'Unknown') NOT NULL,

    UNIQUE INDEX `Seized_Mobiles_IMEI_no_1_key`(`IMEI_no_1`),
    UNIQUE INDEX `Seized_Mobiles_IMEI_no_2_key`(`IMEI_no_2`),
    UNIQUE INDEX `Seized_Mobiles_serial_no_key`(`serial_no`),
    PRIMARY KEY (`item_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Jewelry` (
    `item_id` BIGINT NOT NULL,
    `metal_type` ENUM('Gold', 'Silver', 'Diamond', 'Platinum', 'Other') NOT NULL,
    `weight_gm` DECIMAL(10, 2) NOT NULL,
    `karat` VARCHAR(10) NOT NULL,
    `jewelry_type` VARCHAR(50) NOT NULL,
    `hallmark_present` BOOLEAN NOT NULL,
    `estimated_value` DECIMAL(12, 2) NOT NULL,

    PRIMARY KEY (`item_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Vehicles` (
    `item_id` BIGINT NOT NULL,
    `vehicle_type` ENUM('Bike', 'Car', 'Truck', 'Bus', 'Auto', 'Other') NOT NULL,
    `make` VARCHAR(50) NOT NULL,
    `model` VARCHAR(50) NOT NULL,
    `color` VARCHAR(30) NOT NULL,
    `registration_no` VARCHAR(20) NULL,
    `chassis_no` VARCHAR(30) NULL,
    `engine_no` VARCHAR(30) NULL,
    `owner_name` VARCHAR(100) NOT NULL,
    `owner_contact` VARCHAR(15) NOT NULL,
    `fuel_type` ENUM('Petrol', 'Diesel', 'Electric', 'CNG', 'Other') NOT NULL,
    `RC_available` BOOLEAN NOT NULL,

    UNIQUE INDEX `Vehicles_registration_no_key`(`registration_no`),
    UNIQUE INDEX `Vehicles_chassis_no_key`(`chassis_no`),
    UNIQUE INDEX `Vehicles_engine_no_key`(`engine_no`),
    PRIMARY KEY (`item_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Documents` (
    `item_id` BIGINT NOT NULL,
    `document_type` ENUM('Passport', 'License', 'Aadhar', 'PropertyPapers', 'Cheque', 'Other') NOT NULL,
    `holder_name` VARCHAR(100) NOT NULL,
    `document_number` VARCHAR(50) NOT NULL,
    `issue_date` DATETIME(3) NOT NULL,
    `expiry_date` DATETIME(3) NULL,
    `issuing_authority` VARCHAR(100) NOT NULL,

    UNIQUE INDEX `Documents_document_number_key`(`document_number`),
    PRIMARY KEY (`item_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Seized_Mobiles` ADD CONSTRAINT `Seized_Mobiles_item_id_fkey` FOREIGN KEY (`item_id`) REFERENCES `Seized_Items`(`item_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Jewelry` ADD CONSTRAINT `Jewelry_item_id_fkey` FOREIGN KEY (`item_id`) REFERENCES `Seized_Items`(`item_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Vehicles` ADD CONSTRAINT `Vehicles_item_id_fkey` FOREIGN KEY (`item_id`) REFERENCES `Seized_Items`(`item_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Documents` ADD CONSTRAINT `Documents_item_id_fkey` FOREIGN KEY (`item_id`) REFERENCES `Seized_Items`(`item_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
