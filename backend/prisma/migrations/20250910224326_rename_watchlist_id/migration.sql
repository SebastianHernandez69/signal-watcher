/*
  Warnings:

  - You are about to drop the column `watchlistid` on the `Term` table. All the data in the column will be lost.
  - Added the required column `watchlistId` to the `Term` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Term" DROP CONSTRAINT "Term_watchlistid_fkey";

-- AlterTable
ALTER TABLE "public"."Term" DROP COLUMN "watchlistid",
ADD COLUMN     "watchlistId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."Term" ADD CONSTRAINT "Term_watchlistId_fkey" FOREIGN KEY ("watchlistId") REFERENCES "public"."Watchlist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
