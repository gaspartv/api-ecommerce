import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { env } from "src/configs/env.config";
import { SessionEntity } from "src/entities/session.entity";
import { PrismaService } from "src/providers/prisma/prisma.service";
import { AuthJwtDto } from "./dtos/auth.jwt.dto";
import { AuthSignInDto } from "./dtos/auth.sign-in.dto";

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(dto: AuthSignInDto, ip: string, userAgent: string) {
    const userFound = await this.prismaService.user.findUnique({ where: { email: dto.email } });
    const clientFound = await this.prismaService.client.findUnique({ where: { email: dto.email } });
    if (!userFound && !clientFound) throw new UnauthorizedException("Credenciais inválidas.");

    const password = userFound?.password ?? clientFound?.password;

    const passwordIsValid = bcrypt.compareSync(dto.password, password!);
    if (!passwordIsValid) throw new UnauthorizedException("Credenciais inválidas.");

    await this.prismaService.session.updateMany({
      where: {
        idUser: userFound ? userFound.id : null,
        idClient: clientFound ? clientFound.id : null,
      },
      data: { revokedAt: new Date() },
    });

    const session = new SessionEntity();
    session.create({
      ipAddress: ip,
      userAgent,
      idUser: userFound ? userFound.id : null,
      idClient: clientFound ? clientFound.id : null,
    });
    await this.prismaService.session.create({ data: session.getSessionData() });

    console.log("Session created:", Math.floor(session.getSessionData().expiredAt.getTime() / 1000));

    const payload: AuthJwtDto = {
      iss: env.API_NAME,
      ses: session.getSessionData().id,
      sub: userFound ? userFound.id : clientFound?.id!,
      is: userFound ? "user" : "client",
    };
    const token = this.jwtService.sign(payload);

    return {
      token,
      expiresAt: session.expiredAt,
    };
  }

  async signOut(idUser: string) {
    await this.prismaService.session.updateMany({
      where: { idUser },
      data: { revokedAt: new Date() },
    });
  }
}
