-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('male', 'female');

-- CreateTable
CREATE TABLE "DrugInfo" (
    "id" SERIAL NOT NULL,
    "startAge" INTEGER NOT NULL,
    "endAge" INTEGER NOT NULL,
    "gender" TEXT NOT NULL,
    "race" TEXT NOT NULL,
    "drugName" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "location" TEXT NOT NULL,
    "usersCount" INTEGER NOT NULL,
    "ProvinceCode" TEXT NOT NULL,

    CONSTRAINT "DrugInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Province" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "resetTokenExpires" TIMESTAMP(3),
    "resetToken" TEXT,

    CONSTRAINT "Province_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SuperUser" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "SuperUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResearchWithUs" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "collaborators" TEXT[],
    "documentUrl" TEXT NOT NULL,
    "postDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ResearchWithUs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Research" (
    "id" SERIAL NOT NULL,
    "publicationDate" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "abstract" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "documentUrl" TEXT NOT NULL,

    CONSTRAINT "Research_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "News" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,

    CONSTRAINT "News_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Picture" (
    "id" SERIAL NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "PeerOutreachId" INTEGER,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ImageCollectionTitle" TEXT,

    CONSTRAINT "Picture_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ImageCollection" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ImageCollection_pkey" PRIMARY KEY ("title")
);

-- CreateTable
CREATE TABLE "PeerOutreach" (
    "id" SERIAL NOT NULL,
    "theme" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "From" TIMESTAMP(3) NOT NULL,
    "To" TIMESTAMP(3) NOT NULL,
    "description" TEXT NOT NULL,
    "body" TEXT NOT NULL,

    CONSTRAINT "PeerOutreach_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkingPaper" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "abstract" TEXT NOT NULL,
    "documentUrl" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WorkingPaper_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Province_name_key" ON "Province"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Province_code_key" ON "Province"("code");

-- CreateIndex
CREATE UNIQUE INDEX "SuperUser_username_key" ON "SuperUser"("username");

-- AddForeignKey
ALTER TABLE "DrugInfo" ADD CONSTRAINT "DrugInfo_ProvinceCode_fkey" FOREIGN KEY ("ProvinceCode") REFERENCES "Province"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Picture" ADD CONSTRAINT "Picture_PeerOutreachId_fkey" FOREIGN KEY ("PeerOutreachId") REFERENCES "PeerOutreach"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Picture" ADD CONSTRAINT "Picture_ImageCollectionTitle_fkey" FOREIGN KEY ("ImageCollectionTitle") REFERENCES "ImageCollection"("title") ON DELETE SET NULL ON UPDATE CASCADE;
