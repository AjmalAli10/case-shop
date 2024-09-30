-- CreateEnum
CREATE TYPE "PhoneModel" AS ENUM ('iphonex', 'iphone11', 'iphone12', 'iphone13', 'iphone14', 'iphone15');

-- CreateEnum
CREATE TYPE "CaseMaterial" AS ENUM ('silicone', 'polycarbonate');

-- CreateEnum
CREATE TYPE "CaseFinish" AS ENUM ('smooth', 'textured');

-- CreateEnum
CREATE TYPE "CaseColor" AS ENUM ('black', 'blue', 'rose');

-- AlterTable
ALTER TABLE "Image" ADD COLUMN     "color" "CaseColor",
ADD COLUMN     "finish" "CaseFinish",
ADD COLUMN     "material" "CaseMaterial",
ADD COLUMN     "model" "PhoneModel";
