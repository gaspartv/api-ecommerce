-- CreateTable
CREATE TABLE "public"."logs" (
    "id" TEXT NOT NULL,
    "code" VARCHAR(6) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "model" TEXT NOT NULL,
    "request" TEXT NOT NULL,
    "response" TEXT,
    "id_user_ins" TEXT,

    CONSTRAINT "logs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "logs_id_key" ON "public"."logs"("id");

-- CreateIndex
CREATE UNIQUE INDEX "logs_code_key" ON "public"."logs"("code");

-- AddForeignKey
ALTER TABLE "public"."logs" ADD CONSTRAINT "logs_id_user_ins_fkey" FOREIGN KEY ("id_user_ins") REFERENCES "public"."users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
