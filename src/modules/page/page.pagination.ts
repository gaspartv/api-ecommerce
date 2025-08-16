import { Prisma } from "@prisma/client";
import { PaginationUtil } from "src/common/pagination/pagination.util";
import { PagePaginationDto } from "./dtos/page.pagination.dto";

export class PagePagination {
  static execute(pagination: PagePaginationDto) {
    const where: Prisma.PageWhereInput = { deletedAt: null };

    const options = PaginationUtil.options(pagination);
    Object.assign(options, { where });

    return options;
  }
}
