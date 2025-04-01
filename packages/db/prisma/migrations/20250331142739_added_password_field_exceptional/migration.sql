-- AlterTable
ALTER TABLE "Rooms" ADD COLUMN     "thumbnail" TEXT;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "password" DROP NOT NULL;
