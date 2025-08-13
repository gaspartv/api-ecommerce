import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { PermissionGuard } from "./common/guards/permission.guard";
import { JwtAuthGuard } from "./modules/auth/auth.guard";
import { AuthModule } from "./modules/auth/auth.module";
import { CategoryModule } from "./modules/category/category.module";
import { UserRoleModule } from "./modules/user-role/user-role.module";
import { UserModule } from "./modules/user/user.module";
import { PrismaModule } from "./providers/prisma/prisma.module";

@Module({
  imports: [AuthModule, CategoryModule, UserModule, UserRoleModule, PrismaModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: PermissionGuard,
    },
  ],
})
export class AppModule {}
