import { Prisma } from "generated/prisma";
import { PaginationUtil } from "src/common/pagination/pagination.util";
import { RoutePaginationDto } from "./dtos/route.pagination.dto";

export class RoutePagination {
  static execute(pagination: RoutePaginationDto) {
    const where: Prisma.RouteWhereInput = { deletedAt: null };

    const options = PaginationUtil.options(pagination);
    Object.assign(options, { where });

    return options;
  }
}
