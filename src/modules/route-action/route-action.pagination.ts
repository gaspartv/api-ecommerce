import { Prisma } from "@prisma/client";
import { PaginationUtil } from "src/common/pagination/pagination.util";
import { RouteActionPaginationDto } from "./dtos/route-action.pagination.dto";

export class RouteActionPagination {
  static execute(pagination: RouteActionPaginationDto) {
    const where: Prisma.RouteActionWhereInput = { deletedAt: null };

    const options = PaginationUtil.options(pagination);
    Object.assign(options, { where });

    return options;
  }
}
