-- CreateTable
CREATE TABLE "public"."sessions" (
    "id" TEXT NOT NULL,
    "login_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expired_at" TIMESTAMP(3) NOT NULL,
    "revoked_at" TIMESTAMP(3),
    "ip_address" TEXT,
    "user_agent" TEXT,
    "id_user" TEXT,
    "id_client" TEXT,

    CONSTRAINT "sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."users" (
    "id" TEXT NOT NULL,
    "code" VARCHAR(6) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),
    "disabled" BOOLEAN NOT NULL DEFAULT false,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "avatar_url" TEXT,
    "id_user_role" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."user_roles" (
    "id" TEXT NOT NULL,
    "code" VARCHAR(6) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),
    "disabled" BOOLEAN NOT NULL DEFAULT false,
    "name" TEXT NOT NULL,

    CONSTRAINT "user_roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."map_page_roles" (
    "id" TEXT NOT NULL,
    "code" VARCHAR(6) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),
    "disabled" BOOLEAN NOT NULL DEFAULT false,
    "id_user_role" TEXT NOT NULL,
    "id_page" TEXT NOT NULL,
    "id_page_action" TEXT NOT NULL,

    CONSTRAINT "map_page_roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."pages" (
    "id" TEXT NOT NULL,
    "code" VARCHAR(6) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),
    "disabled" BOOLEAN NOT NULL DEFAULT false,
    "path" TEXT NOT NULL,

    CONSTRAINT "pages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."page_actions" (
    "id" TEXT NOT NULL,
    "code" VARCHAR(6) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),
    "disabled" BOOLEAN NOT NULL DEFAULT false,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "type" TEXT NOT NULL,
    "id_page" TEXT NOT NULL,

    CONSTRAINT "page_actions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."clients" (
    "id" TEXT NOT NULL,
    "code" VARCHAR(6) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),
    "disabled" BOOLEAN NOT NULL DEFAULT false,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "avatar_url" TEXT,

    CONSTRAINT "clients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."categories" (
    "id" TEXT NOT NULL,
    "code" VARCHAR(6) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),
    "disabled" BOOLEAN NOT NULL DEFAULT false,
    "id_user_ins" TEXT,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."products" (
    "id" TEXT NOT NULL,
    "code" VARCHAR(6) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),
    "disabled" BOOLEAN NOT NULL DEFAULT false,
    "id_user_ins" TEXT,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "sessions_id_key" ON "public"."sessions"("id");

-- CreateIndex
CREATE UNIQUE INDEX "users_id_key" ON "public"."users"("id");

-- CreateIndex
CREATE UNIQUE INDEX "users_code_key" ON "public"."users"("code");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "public"."users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_roles_id_key" ON "public"."user_roles"("id");

-- CreateIndex
CREATE UNIQUE INDEX "user_roles_code_key" ON "public"."user_roles"("code");

-- CreateIndex
CREATE UNIQUE INDEX "map_page_roles_id_key" ON "public"."map_page_roles"("id");

-- CreateIndex
CREATE UNIQUE INDEX "map_page_roles_code_key" ON "public"."map_page_roles"("code");

-- CreateIndex
CREATE UNIQUE INDEX "pages_id_key" ON "public"."pages"("id");

-- CreateIndex
CREATE UNIQUE INDEX "pages_code_key" ON "public"."pages"("code");

-- CreateIndex
CREATE UNIQUE INDEX "pages_path_key" ON "public"."pages"("path");

-- CreateIndex
CREATE UNIQUE INDEX "page_actions_id_key" ON "public"."page_actions"("id");

-- CreateIndex
CREATE UNIQUE INDEX "page_actions_code_key" ON "public"."page_actions"("code");

-- CreateIndex
CREATE UNIQUE INDEX "clients_id_key" ON "public"."clients"("id");

-- CreateIndex
CREATE UNIQUE INDEX "clients_code_key" ON "public"."clients"("code");

-- CreateIndex
CREATE UNIQUE INDEX "clients_email_key" ON "public"."clients"("email");

-- CreateIndex
CREATE UNIQUE INDEX "categories_id_key" ON "public"."categories"("id");

-- CreateIndex
CREATE UNIQUE INDEX "categories_code_key" ON "public"."categories"("code");

-- CreateIndex
CREATE UNIQUE INDEX "products_id_key" ON "public"."products"("id");

-- CreateIndex
CREATE UNIQUE INDEX "products_code_key" ON "public"."products"("code");

-- AddForeignKey
ALTER TABLE "public"."sessions" ADD CONSTRAINT "sessions_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "public"."users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."sessions" ADD CONSTRAINT "sessions_id_client_fkey" FOREIGN KEY ("id_client") REFERENCES "public"."clients"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."users" ADD CONSTRAINT "users_id_user_role_fkey" FOREIGN KEY ("id_user_role") REFERENCES "public"."user_roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."map_page_roles" ADD CONSTRAINT "map_page_roles_id_user_role_fkey" FOREIGN KEY ("id_user_role") REFERENCES "public"."user_roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."map_page_roles" ADD CONSTRAINT "map_page_roles_id_page_fkey" FOREIGN KEY ("id_page") REFERENCES "public"."pages"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."map_page_roles" ADD CONSTRAINT "map_page_roles_id_page_action_fkey" FOREIGN KEY ("id_page_action") REFERENCES "public"."page_actions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."page_actions" ADD CONSTRAINT "page_actions_id_page_fkey" FOREIGN KEY ("id_page") REFERENCES "public"."pages"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."categories" ADD CONSTRAINT "categories_id_user_ins_fkey" FOREIGN KEY ("id_user_ins") REFERENCES "public"."users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."products" ADD CONSTRAINT "products_id_user_ins_fkey" FOREIGN KEY ("id_user_ins") REFERENCES "public"."users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
