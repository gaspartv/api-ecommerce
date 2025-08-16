import { Prisma } from "@prisma/client";
import { PaginationUtil } from "src/common/pagination/pagination.util";
import { CategoryPaginationDto } from "./dtos/category.pagination.dto";

export class CategoryPagination {
  static execute(pagination: CategoryPaginationDto) {
    const where: Prisma.CategoryWhereInput = { deletedAt: null };

    const options = PaginationUtil.options(pagination);
    Object.assign(options, { where });

    return options;
  }
}
