/*
  Warnings:

  - You are about to drop the `Rooms` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Rooms" DROP CONSTRAINT "Rooms_adminId_fkey";

-- DropTable
DROP TABLE "Rooms";

-- CreateTable
CREATE TABLE "Room" (
    "Id" TEXT NOT NULL,
    "Name" TEXT NOT NULL,
    "roomId" TEXT NOT NULL,
    "adminId" TEXT NOT NULL,
    "thumbnail" TEXT,
    "isPrivate" BOOLEAN NOT NULL DEFAULT false,
    "subscribers" TEXT[],
    "subadmins" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Room_pkey" PRIMARY KEY ("Id")
);

-- AddForeignKey
ALTER TABLE "Room" ADD CONSTRAINT "Room_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "User"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;
