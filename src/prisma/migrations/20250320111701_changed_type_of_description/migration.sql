/*
  Warnings:

  - Made the column `itemStateDescription` on table `SeizedItems` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `CaseReg` MODIFY `case_description` TEXT NOT NULL,
    MODIFY `guilty_details` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `SeizedItems` MODIFY `item_description` TEXT NULL,
    MODIFY `itemStateDescription` TEXT NOT NULL;
