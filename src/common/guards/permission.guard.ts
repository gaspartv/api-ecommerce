import { BadRequestException, CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { FastifyRequest } from "fastify";
import { PrismaService } from "src/providers/prisma/prisma.service";
import { ErrorMessage } from "../messages/errors.message";

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private readonly prismaService: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<FastifyRequest>();
    const type = request.url.split("/")[3];
    if (!type) return true;

    console.log("PermissionGuard", type);

    if (!request.infoUser) throw new BadRequestException(ErrorMessage["AEC-0006"]);

    const frontPath = request.headers["x-frontend-path"];
    if (!frontPath || typeof frontPath !== "string") throw new BadRequestException(ErrorMessage["AEC-0006"]);

    console.log("Front Path:", frontPath);

    console.log("Back Path:", request.url);

    const page = await this.prismaService.page.findFirst({
      where: {
        path: frontPath,
        deletedAt: null,
        disabled: false,
        MapPageRoles: {
          some: {
            deletedAt: null,
            disabled: false,
            UserRole: {
              deletedAt: null,
              disabled: false,
              Users: {
                some: {
                  id: request.infoUser.id,
                  deletedAt: null,
                  disabled: false,
                },
              },
            },
            Routes: {
              some: {
                deletedAt: null,
                disabled: false,
                path: request.url,
              },
            },
            Actions: {
              some: {
                deletedAt: null,
                disabled: false,
                name: type,
              },
            },
          },
        },
      },
      select: {
        public: true,
      },
    });
    if (!page) throw new BadRequestException(ErrorMessage["AEC-0006"]);
    if (page.public) return true;

    return true;
  }
}
