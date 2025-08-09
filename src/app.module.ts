import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { JwtAuthGuard } from "./modules/auth/auth.guard";
import { AuthModule } from "./modules/auth/auth.module";

@Module({
  imports: [AuthModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
