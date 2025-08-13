-- CreateTable
CREATE TABLE "public"."businesses" (
    "id" TEXT NOT NULL,
    "code" VARCHAR(6) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),
    "disabled" BOOLEAN NOT NULL DEFAULT false,
    "company_name" VARCHAR(60) NOT NULL,
    "permissions" TEXT[],

    CONSTRAINT "businesses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."business_roles" (
    "id" TEXT NOT NULL,
    "code" VARCHAR(6) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),
    "disabled" BOOLEAN NOT NULL DEFAULT false,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "path" TEXT NOT NULL,
    "id_business" TEXT NOT NULL,

    CONSTRAINT "business_roles_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "businesses_id_key" ON "public"."businesses"("id");

-- CreateIndex
CREATE UNIQUE INDEX "businesses_code_key" ON "public"."businesses"("code");

-- CreateIndex
CREATE UNIQUE INDEX "business_roles_id_key" ON "public"."business_roles"("id");

-- CreateIndex
CREATE UNIQUE INDEX "business_roles_code_key" ON "public"."business_roles"("code");

-- CreateIndex
CREATE UNIQUE INDEX "business_roles_path_key" ON "public"."business_roles"("path");

-- AddForeignKey
ALTER TABLE "public"."business_roles" ADD CONSTRAINT "business_roles_id_business_fkey" FOREIGN KEY ("id_business") REFERENCES "public"."businesses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
