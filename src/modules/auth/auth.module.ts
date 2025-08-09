import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { env } from "src/configs/env.config";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { AuthJwtStrategy } from "./auth.strategy";

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: "jwt" }),
    JwtModule.register({
      global: true,
      secret: env.JWT_SECRET,
      signOptions: { expiresIn: env.JWT_EXPIRES_IN_TIME },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthJwtStrategy],
})
export class AuthModule {}
