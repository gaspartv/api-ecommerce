-- DropForeignKey
ALTER TABLE "public"."users" DROP CONSTRAINT "users_id_user_role_fkey";

-- AlterTable
ALTER TABLE "public"."users" ALTER COLUMN "id_user_role" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."users" ADD CONSTRAINT "users_id_user_role_fkey" FOREIGN KEY ("id_user_role") REFERENCES "public"."user_roles"("id") ON DELETE SET NULL ON UPDATE CASCADE;
