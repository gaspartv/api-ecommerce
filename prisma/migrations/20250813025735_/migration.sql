/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `user_roles` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "user_roles_name_key" ON "public"."user_roles"("name");
