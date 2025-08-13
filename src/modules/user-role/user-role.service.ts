import { ConflictException, Injectable } from "@nestjs/common";
import { ErrorMessage } from "src/common/messages/errors.message";
import { PrismaService } from "src/providers/prisma/prisma.service";
import { CodeGeneratorUtil } from "src/utils/code-generator.util";
import { UserRoleCreateDto } from "./dtos/user-role.create.dto";
// UserRoleCreateDto {
//   name: 'Test 01',
//   idUsers: [ 'cme9e55pr0000vdn8xenb6jms' ],
//   pages: [
//     {
//       id: 'cme9e6z940001vdn8tyn8d1ra',
//     {
//     {
//       id: 'cme9e6z940001vdn8tyn8d1ra',
//       routes: [Array],
//       actions: [Array]
//     }
//   ]
// }
@Injectable()
export class UserRoleService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(dto: UserRoleCreateDto) {
    const existingRole = await this.prismaService.userRole.findUnique({ where: { name: dto.name } });
    if (existingRole) {
      throw new ConflictException(ErrorMessage["AEC-0007"]);
    }

    return await this.prismaService.userRole.create({
      data: {
        code: CodeGeneratorUtil.execute(),
        name: dto.name,
        Users: { connect: dto.idUsers.map((id) => ({ id })) },
        MapPageRoles: {
          create: dto.pages.map((page) => ({
            code: CodeGeneratorUtil.execute(),
            idPage: page.id,
            Routes: { connect: page.routes.map((id) => ({ id })) },
            Actions: { connect: page.actions.map((id) => ({ id })) },
          })),
        },
      },
    });
  }
}
