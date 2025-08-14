import { Injectable, NotFoundException } from "@nestjs/common";
import { ErrorMessage } from "src/common/messages/errors.message";
import { PaginationUtil } from "src/common/pagination/pagination.util";
import { PrismaService } from "src/providers/prisma/prisma.service";
import { CodeGeneratorUtil } from "src/utils/code-generator.util";
import { RouteActionCreateDto } from "./dtos/route-action.create.dto";
import { RouteActionPaginationDto } from "./dtos/route-action.pagination.dto";
import { RouteActionUpdateDto } from "./dtos/route-action.update.dto";
import { RouteActionPagination } from "./route-action.pagination";

@Injectable()
export class RouteActionService {
  constructor(private readonly prisma: PrismaService) {}

  private async routeOrThrow(id: string) {
    const route = await this.prisma.routeAction.findUnique({ where: { id } });
    if (!route) throw new NotFoundException(ErrorMessage["AEC-0013"]);

    return route;
  }

  async create({ name }: RouteActionCreateDto) {
    const existingRoute = await this.prisma.routeAction.findFirst({ where: { name } });
    if (existingRoute) throw new NotFoundException(ErrorMessage["AEC-0012"]);

    return this.prisma.routeAction.create({
      data: {
        code: CodeGeneratorUtil.execute(),
        name,
      },
    });
  }

  async delete(id: string) {
    await this.routeOrThrow(id);
    await this.prisma.routeAction.delete({ where: { id } });

    return;
  }

  async update(dto: RouteActionUpdateDto) {
    const { id, ...data } = dto;
    await this.routeOrThrow(id);

    return this.prisma.routeAction.update({
      where: { id },
      data,
    });
  }

  async toggleStatus(id: string) {
    const route = await this.routeOrThrow(id);

    return this.prisma.routeAction.update({
      where: { id },
      data: { disabled: !route.disabled },
    });
  }

  async list(pagination: RouteActionPaginationDto) {
    const options = RouteActionPagination.execute(pagination);
    const routes = await this.prisma.routeAction.findMany(options);
    const total = await this.prisma.routeAction.count({ where: options.where });

    return PaginationUtil.result(routes, pagination, total);
  }
}
