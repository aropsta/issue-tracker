-- AlterTable
ALTER TABLE `Issue` ADD COLUMN `assignedToUerId` VARCHAR(255) NULL;

-- AddForeignKey
ALTER TABLE `Issue` ADD CONSTRAINT `Issue_assignedToUerId_fkey` FOREIGN KEY (`assignedToUerId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
