-- CreateTable
CREATE TABLE `Question` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `questionNumber` VARCHAR(191) NOT NULL,
    `question` VARCHAR(191) NOT NULL,
    `article` VARCHAR(191) NOT NULL,
    `options` VARCHAR(191) NOT NULL,
    `answer` VARCHAR(191) NOT NULL,
    `questionType` VARCHAR(191) NOT NULL,
    `solution` VARCHAR(191) NOT NULL,
    `keyWords` VARCHAR(191) NOT NULL,
    `difficulty` INTEGER NULL,
    `incorrectRate` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
