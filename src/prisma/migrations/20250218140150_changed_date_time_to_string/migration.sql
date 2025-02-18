-- AlterTable
ALTER TABLE `CaseReg` MODIFY `filing_date` VARCHAR(191) NOT NULL,
    MODIFY `closure_date` VARCHAR(191) NULL,
    MODIFY `acquired_date` VARCHAR(191) NOT NULL,
    MODIFY `case_date` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Court` MODIFY `hearing_date` VARCHAR(191) NULL,
    MODIFY `verdict_date` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `SeizedItems` MODIFY `seized_date` VARCHAR(191) NOT NULL,
    MODIFY `release_date` VARCHAR(191) NULL;
