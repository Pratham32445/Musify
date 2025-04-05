-- CreateTable
CREATE TABLE "Song" (
    "Id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "roomId" TEXT NOT NULL,
    "thumbnail" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Song_pkey" PRIMARY KEY ("Id")
);

-- AddForeignKey
ALTER TABLE "Song" ADD CONSTRAINT "Song_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;
