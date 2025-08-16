/*
  Warnings:

  - The `response` column on the `logs` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `request` on the `logs` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "public"."logs" DROP COLUMN "request",
ADD COLUMN     "request" JSONB NOT NULL,
DROP COLUMN "response",
ADD COLUMN     "response" JSONB;
