import { ConflictException, Injectable } from "@nestjs/common";
import { ErrorMessage } from "src/common/messages/errors.message";
import { PaginationResponse } from "src/common/pagination/pagination-response.entity";
import { PaginationUtil } from "src/common/pagination/pagination.util";
import { PrismaService } from "src/providers/prisma/prisma.service";
import { CodeGeneratorUtil } from "src/utils/code-generator.util";
import { LogService } from "../log/log.service";
import { CategoryPagination } from "./category.pagination";
import { CategoryCreateDto } from "./dtos/category.create.dto";
import { CategoryPaginationDto } from "./dtos/category.pagination.dto";
import { CategoryResponseDto } from "./dtos/category.response.dto";
import { CategoryUpdateDto } from "./dtos/category.update.dto";

@Injectable()
export class CategoryService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly logService: LogService,
  ) {}

  private async categoryOrThrow(id: string): Promise<CategoryResponseDto> {
    const category = await this.prismaService.category.findFirst({ where: { id, deletedAt: null } });
    if (!category) throw new ConflictException(ErrorMessage["AEC-0006"]);
    return category;
  }

  async create(dto: CategoryCreateDto, idUser: string): Promise<CategoryResponseDto> {
    const existingCategory = await this.prismaService.category.findUnique({ where: { name: dto.name } });
    if (existingCategory) throw new ConflictException(ErrorMessage["AEC-0005"]);

    const category = await this.prismaService.category.create({
      data: {
        code: CodeGeneratorUtil.execute(),
        name: dto.name,
        description: dto.description,
        idUserIns: idUser,
      },
    });

    await this.logService.create({
      idUserIns: idUser,
      model: "category",
      request: dto,
      response: category,
    });

    return category;
  }

  async softDelete(id: string): Promise<void> {
    await this.categoryOrThrow(id);
    await this.prismaService.category.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
    return;
  }

  async update(dto: CategoryUpdateDto): Promise<CategoryResponseDto> {
    const { id, ...data } = dto;
    await this.categoryOrThrow(id);

    return this.prismaService.category.update({
      where: { id },
      data,
    });
  }

  async toggleStatus(id: string): Promise<CategoryResponseDto> {
    const category = await this.categoryOrThrow(id);

    return this.prismaService.category.update({
      where: { id },
      data: { disabled: !category.disabled },
    });
  }

  async list(pagination: CategoryPaginationDto): Promise<PaginationResponse<CategoryResponseDto>> {
    const options = CategoryPagination.execute(pagination);
    const categories = await this.prismaService.category.findMany(options);
    const total = await this.prismaService.category.count({ where: options.where });

    return PaginationUtil.result<CategoryResponseDto>(categories, pagination, total);
  }
}
