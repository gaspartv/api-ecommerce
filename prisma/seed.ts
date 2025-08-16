import { PrismaClient } from "@prisma/client";
import "dotenv/config";
import { CodeGeneratorUtil } from "../src/utils/code-generator.util";

const prisma = new PrismaClient();

const routes = [
  // Category
  {
    code: CodeGeneratorUtil.execute(),
    path: "/category/create",
  },

  // User Role
  {
    code: CodeGeneratorUtil.execute(),
    path: "/user-role/create",
  },
];

const routeActions = [
  {
    code: CodeGeneratorUtil.execute(),
    name: "create",
  },
  {
    code: CodeGeneratorUtil.execute(),
    name: "update",
  },
  {
    code: CodeGeneratorUtil.execute(),
    name: "delete",
  },
  {
    code: CodeGeneratorUtil.execute(),
    name: "list",
  },
];

const pages = [
  // {
  //   code: CodeGeneratorUtil.execute(),
  //   path: "/",
  //   public: true,
  // },
];

async function seed() {
  console.log("Iniciando a seed...");
  await prisma.$transaction(async (tx) => {
    await tx.business.create({
      data: {
        code: CodeGeneratorUtil.execute(),
        name: "Default Business",
      },
    });

    await tx.user.create({
      data: {
        code: CodeGeneratorUtil.execute(),
        name: "Diego Monteiro de Carvalho Souza",
        email: "contato@diegogaspar.dev.br",
        password: "$2b$10$czbpZwq8LtAjo73Pe0H6J.RZ0cq1tvvpZy2.fNYbI6ROVS72MaZLG",
        isAdmin: true,
      },
    });

    await tx.route.createMany({ data: routes, skipDuplicates: true });
    await tx.routeAction.createMany({ data: routeActions, skipDuplicates: true });
    await tx.page.createMany({ data: pages, skipDuplicates: true });
  });
}

seed()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
