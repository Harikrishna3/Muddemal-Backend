/*
  Warnings:

  - You are about to drop the `Image` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Image` DROP FOREIGN KEY `Image_item_id_fkey`;

-- AlterTable
ALTER TABLE `SeizedItems` ADD COLUMN `images` JSON NULL;

-- DropTable
DROP TABLE `Image`;
