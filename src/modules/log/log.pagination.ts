import { Prisma } from "@prisma/client";
import { PaginationUtil } from "src/common/pagination/pagination.util";
import { LogPaginationDto } from "./dtos/log.pagination.dto";

export class LogPagination {
  static execute(pagination: LogPaginationDto) {
    const where: Prisma.LogWhereInput = {};

    const options = PaginationUtil.options(pagination);
    Object.assign(options, { where });

    return options;
  }
}
