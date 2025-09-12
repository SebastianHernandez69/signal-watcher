/*
  Warnings:

  - You are about to drop the column `watchlistid` on the `Event` table. All the data in the column will be lost.
  - Added the required column `watchlistId` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Event" DROP CONSTRAINT "Event_watchlistid_fkey";

-- AlterTable
ALTER TABLE "public"."Event" DROP COLUMN "watchlistid",
ADD COLUMN     "watchlistId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."Event" ADD CONSTRAINT "Event_watchlistId_fkey" FOREIGN KEY ("watchlistId") REFERENCES "public"."Watchlist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
