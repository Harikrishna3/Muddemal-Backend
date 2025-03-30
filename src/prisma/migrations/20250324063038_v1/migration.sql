-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `role` ENUM('ADMIN', 'USER') NOT NULL DEFAULT 'USER',
    `policeStationId` VARCHAR(191) NULL,
    `designation` VARCHAR(191) NOT NULL DEFAULT 'default_designation',
    `mobile` VARCHAR(191) NOT NULL DEFAULT '000-000-0000',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

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
    `case_id` VARCHAR(191) NOT NULL,
    `case_number` VARCHAR(191) NOT NULL,
    `case_description` TEXT NOT NULL,
    `policeStationId` VARCHAR(191) NOT NULL,
    `investigating_officer` VARCHAR(100) NOT NULL,
    `case_status` VARCHAR(191) NOT NULL DEFAULT 'Open',
    `filing_date` VARCHAR(191) NOT NULL,
    `closure_date` VARCHAR(191) NULL,
    `region` VARCHAR(191) NOT NULL DEFAULT 'default_region',
    `year` INTEGER NOT NULL DEFAULT 2025,
    `userId` VARCHAR(191) NOT NULL,
    `acts` JSON NULL,
    `court_order` VARCHAR(191) NOT NULL DEFAULT 'Pending',
    `crime_number` VARCHAR(191) NOT NULL DEFAULT 'Unknown',
    `guilty_details` TEXT NOT NULL,
    `bhags` JSON NULL,
    `images` JSON NULL,
    `seized_date` VARCHAR(191) NOT NULL DEFAULT 'Not Specified',
    `acquire_date` VARCHAR(191) NOT NULL DEFAULT 'Not Specified',
    `QRbase64` LONGTEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`case_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SeizedItems` (
    `item_id` VARCHAR(191) NOT NULL,
    `case_id` VARCHAR(191) NOT NULL,
    `item_category` VARCHAR(191) NOT NULL,
    `sub_category` VARCHAR(50) NULL,
    `item_description` TEXT NULL,
    `seized_date` VARCHAR(191) NOT NULL,
    `seized_location` VARCHAR(255) NOT NULL,
    `seizing_officer` VARCHAR(100) NOT NULL,
    `current_status` VARCHAR(191) NULL DEFAULT 'InCustody',
    `release_date` VARCHAR(191) NULL,
    `released_to` VARCHAR(100) NULL,
    `remarks` VARCHAR(191) NULL,
    `Bhag` VARCHAR(191) NULL DEFAULT 'Not Specified',
    `depositDate` VARCHAR(191) NULL DEFAULT 'Not Specified',
    `fromWhomReceived` VARCHAR(191) NULL DEFAULT 'Not Specified',
    `weight` VARCHAR(191) NULL DEFAULT 'Not Specified',
    `NoOfItems` VARCHAR(191) NULL DEFAULT 'Not Specified',
    `price` VARCHAR(191) NULL DEFAULT 'Not Specified',
    `itemStateDescription` TEXT NOT NULL,
    `QRbase64` LONGTEXT NULL,
    `images` JSON NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`item_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Court` (
    `id` VARCHAR(191) NOT NULL,
    `order_number` VARCHAR(191) NOT NULL,
    `court_type` VARCHAR(191) NOT NULL,
    `court_name` VARCHAR(191) NOT NULL,
    `courtCaseNumber` VARCHAR(191) NOT NULL,
    `court_policestation_info` VARCHAR(191) NOT NULL,
    `court_order_info` VARCHAR(191) NOT NULL,
    `case_id` VARCHAR(191) NOT NULL,
    `hearing_date` VARCHAR(191) NULL,
    `verdict_date` VARCHAR(191) NULL,
    `verdict_summary` VARCHAR(191) NULL,
    `judge_name` VARCHAR(191) NULL,
    `status` VARCHAR(191) NULL DEFAULT 'Pending',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `QR` (
    `id` VARCHAR(191) NOT NULL,
    `seizedItem_Name` VARCHAR(191) NOT NULL,
    `case_id` VARCHAR(191) NOT NULL,
    `qr_base64` LONGTEXT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Logs` (
    `id` VARCHAR(191) NOT NULL,
    `entityType` ENUM('CaseReg', 'SeizedItem', 'Court') NOT NULL,
    `entityId` VARCHAR(191) NULL,
    `actionType` ENUM('Created', 'Updated', 'Deleted') NOT NULL,
    `changedData` JSON NULL,
    `userId` VARCHAR(191) NOT NULL,
    `timestamp` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

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
ALTER TABLE `Logs` ADD CONSTRAINT `Logs_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
