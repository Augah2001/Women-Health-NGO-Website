/*
  Warnings:

  - You are about to drop the `DrugInfo` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Province` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "DrugInfo" DROP CONSTRAINT "DrugInfo_ProvinceCode_fkey";

-- DropTable
DROP TABLE "DrugInfo";

-- DropTable
DROP TABLE "Province";
