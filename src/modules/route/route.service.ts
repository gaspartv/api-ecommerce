import { Injectable, NotFoundException } from "@nestjs/common";
import { ErrorMessage } from "src/common/messages/errors.message";
import { PaginationUtil } from "src/common/pagination/pagination.util";
import { PrismaService } from "src/providers/prisma/prisma.service";
import { CodeGeneratorUtil } from "src/utils/code-generator.util";
import { RouteCreateDto } from "./dtos/route.create.dto";
import { RoutePaginationDto } from "./dtos/route.pagination.dto";
import { RouteUpdateDto } from "./dtos/route.update.dto";
import { RoutePagination } from "./route.pagination";

@Injectable()
export class RouteService {
  constructor(private readonly prisma: PrismaService) {}

  private async routeOrThrow(id: string) {
    const route = await this.prisma.route.findUnique({ where: { id } });
    if (!route) throw new NotFoundException(ErrorMessage["AEC-0011"]);

    return route;
  }

  async create({ path }: RouteCreateDto) {
    const existingRoute = await this.prisma.route.findUnique({ where: { path } });
    if (existingRoute) throw new NotFoundException(ErrorMessage["AEC-0010"]);

    return this.prisma.route.create({
      data: {
        code: CodeGeneratorUtil.execute(),
        path,
      },
    });
  }

  async delete(id: string) {
    await this.routeOrThrow(id);
    await this.prisma.route.delete({ where: { id } });

    return;
  }

  async update(dto: RouteUpdateDto) {
    const { id, ...data } = dto;
    await this.routeOrThrow(id);

    return this.prisma.route.update({
      where: { id },
      data,
    });
  }

  async toggleStatus(id: string) {
    const route = await this.routeOrThrow(id);

    return this.prisma.route.update({
      where: { id },
      data: { disabled: !route.disabled },
    });
  }

  async list(pagination: RoutePaginationDto) {
    const options = RoutePagination.execute(pagination);
    const routes = await this.prisma.route.findMany(options);
    const total = await this.prisma.route.count({ where: options.where });

    return PaginationUtil.result(routes, pagination, total);
  }
}
