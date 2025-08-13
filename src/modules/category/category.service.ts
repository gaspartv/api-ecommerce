import { ConflictException, Injectable } from "@nestjs/common";
import { ErrorMessage } from "src/common/messages/errors.message";
import { PrismaService } from "src/providers/prisma/prisma.service";
import { CodeGeneratorUtil } from "src/utils/code-generator.util";
import { CategoryCreateDto } from "./dtos/category.create.dto";

@Injectable()
export class CategoryService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(dto: CategoryCreateDto, idUser: string) {
    const existingCategory = await this.prismaService.category.findUnique({ where: { name: dto.name } });
    if (existingCategory) throw new ConflictException(ErrorMessage["AEC-0005"]);

    return await this.prismaService.category.create({
      data: {
        code: CodeGeneratorUtil.execute(),
        name: dto.name,
        description: dto.description,
        idUserIns: idUser,
      },
    });
  }
}
