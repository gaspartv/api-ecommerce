/*
  Warnings:

  - You are about to drop the column `id_page_action` on the `map_page_roles` table. All the data in the column will be lost.
  - You are about to drop the `business_roles` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `page_actions` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."business_roles" DROP CONSTRAINT "business_roles_id_business_fkey";

-- DropForeignKey
ALTER TABLE "public"."map_page_roles" DROP CONSTRAINT "map_page_roles_id_page_action_fkey";

-- DropForeignKey
ALTER TABLE "public"."page_actions" DROP CONSTRAINT "page_actions_id_page_fkey";

-- AlterTable
ALTER TABLE "public"."map_page_roles" DROP COLUMN "id_page_action";

-- DropTable
DROP TABLE "public"."business_roles";

-- DropTable
DROP TABLE "public"."page_actions";

-- CreateTable
CREATE TABLE "public"."routes" (
    "id" TEXT NOT NULL,
    "code" VARCHAR(6) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),
    "disabled" BOOLEAN NOT NULL DEFAULT false,
    "path" TEXT NOT NULL,

    CONSTRAINT "routes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."route_actions" (
    "id" TEXT NOT NULL,
    "code" VARCHAR(6) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),
    "disabled" BOOLEAN NOT NULL DEFAULT false,
    "name" TEXT NOT NULL,

    CONSTRAINT "route_actions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."_MapPageRoleToRoute" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_MapPageRoleToRoute_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "public"."_MapPageRoleToRouteAction" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_MapPageRoleToRouteAction_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "routes_id_key" ON "public"."routes"("id");

-- CreateIndex
CREATE UNIQUE INDEX "routes_code_key" ON "public"."routes"("code");

-- CreateIndex
CREATE UNIQUE INDEX "routes_path_key" ON "public"."routes"("path");

-- CreateIndex
CREATE UNIQUE INDEX "route_actions_id_key" ON "public"."route_actions"("id");

-- CreateIndex
CREATE UNIQUE INDEX "route_actions_code_key" ON "public"."route_actions"("code");

-- CreateIndex
CREATE INDEX "_MapPageRoleToRoute_B_index" ON "public"."_MapPageRoleToRoute"("B");

-- CreateIndex
CREATE INDEX "_MapPageRoleToRouteAction_B_index" ON "public"."_MapPageRoleToRouteAction"("B");

-- AddForeignKey
ALTER TABLE "public"."_MapPageRoleToRoute" ADD CONSTRAINT "_MapPageRoleToRoute_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."map_page_roles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_MapPageRoleToRoute" ADD CONSTRAINT "_MapPageRoleToRoute_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."routes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_MapPageRoleToRouteAction" ADD CONSTRAINT "_MapPageRoleToRouteAction_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."map_page_roles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_MapPageRoleToRouteAction" ADD CONSTRAINT "_MapPageRoleToRouteAction_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."route_actions"("id") ON DELETE CASCADE ON UPDATE CASCADE;
