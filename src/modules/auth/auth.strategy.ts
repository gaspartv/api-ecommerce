import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { FastifyRequest } from "fastify";
import { ExtractJwt, Strategy } from "passport-jwt";
import { ErrorMessage } from "src/common/messages/errors.message";
import { env } from "src/configs/env.config";
import { PrismaService } from "src/providers/prisma/prisma.service";
import { AuthJwtDto } from "./dtos/auth.jwt.dto";

@Injectable()
export class AuthJwtStrategy extends PassportStrategy(Strategy, "jwt") {
  constructor(private readonly prismaService: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: env.JWT_SECRET,
      passReqToCallback: true,
    });
  }

  async validate(request: FastifyRequest, payload: AuthJwtDto) {
    const { iss, ses, sub, is, exp, iat } = payload;
    const validateDecoded =
      !ses ||
      !sub ||
      iss !== env.API_NAME ||
      (is !== "user" && is !== "client") ||
      exp! < Math.floor(Date.now() / 1000) ||
      iat! > exp!;
    if (validateDecoded) throw new UnauthorizedException(ErrorMessage["AEC-0003"]);
    const session = await this.prismaService.session.findUnique({ where: { id: ses } });
    if (!session || session.revokedAt) throw new UnauthorizedException(ErrorMessage["AEC-0003"]);

    request.infoUser = { id: sub };

    return true;
  }
}
