import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { PermissionGuard } from "./common/guards/permission.guard";
import { JwtAuthGuard } from "./modules/auth/auth.guard";
import { AuthModule } from "./modules/auth/auth.module";
import { CategoryModule } from "./modules/category/category.module";
import { PageModule } from "./modules/page/page.module";
import { RouteActionModule } from "./modules/route-action/route-action.module";
import { RouteModule } from "./modules/route/route.module";
import { UserRoleModule } from "./modules/user-role/user-role.module";
import { UserModule } from "./modules/user/user.module";
import { PrismaModule } from "./providers/prisma/prisma.module";

@Module({
  imports: [
    AuthModule,
    CategoryModule,
    PageModule,
    PrismaModule,
    RouteActionModule,
    RouteModule,
    UserModule,
    UserRoleModule,
  ],
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
