import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { ErrorMessage } from "src/common/messages/errors.message";
import { PaginationResponse } from "src/common/pagination/pagination-response.entity";
import { PaginationUtil } from "src/common/pagination/pagination.util";
import { PrismaService } from "src/providers/prisma/prisma.service";
import { CodeGeneratorUtil } from "src/utils/code-generator.util";
import { PageCreateDto } from "./dtos/page.create.dto";
import { PagePaginationDto } from "./dtos/page.pagination.dto";
import { PageResponseDto } from "./dtos/page.response.dto";
import { PageUpdateDto } from "./dtos/page.update.dto";
import { PagePagination } from "./page.pagination";

@Injectable()
export class PageService {
  constructor(private readonly prisma: PrismaService) {}

  private async pageOrThrow(id: string): Promise<PageResponseDto> {
    const page = await this.prisma.page.findFirst({ where: { id, deletedAt: null } });
    if (!page) throw new NotFoundException(ErrorMessage["AEC-0009"]);
    return page;
  }

  async create(dto: PageCreateDto): Promise<PageResponseDto> {
    const existing = await this.prisma.page.findFirst({
      where: {
        deletedAt: null,
        path: dto.path,
      },
    });
    if (existing) throw new ConflictException(ErrorMessage["AEC-0008"]);

    return this.prisma.page.create({
      data: {
        ...dto,
        code: CodeGeneratorUtil.execute(),
      },
    });
  }

  async delete(id: string): Promise<void> {
    await this.pageOrThrow(id);
    await this.prisma.page.delete({ where: { id } });

    return;
  }

  async update(dto: PageUpdateDto): Promise<PageResponseDto> {
    const { id, ...data } = dto;
    await this.pageOrThrow(id);

    return this.prisma.page.update({
      where: { id },
      data,
    });
  }

  async toggleStatus(id: string): Promise<PageResponseDto> {
    const page = await this.pageOrThrow(id);

    return this.prisma.page.update({
      where: { id },
      data: { disabled: !page.disabled },
    });
  }

  async list(pagination: PagePaginationDto): Promise<PaginationResponse<PageResponseDto>> {
    const options = PagePagination.execute(pagination);
    const pages = await this.prisma.page.findMany(options);
    const total = await this.prisma.page.count({ where: options.where });

    return PaginationUtil.result(pages, pagination, total);
  }
}
