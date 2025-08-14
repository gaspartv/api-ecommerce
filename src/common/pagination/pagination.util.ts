import { PaginationResponse } from "./pagination-response.entity";
import { PaginationDto } from "./pagination.dto";
import { PaginationEntity } from "./pagination.entity";

export class PaginationUtil {
  static options(dto: PaginationDto): PaginationEntity {
    const { page, take } = PaginationUtil.format(dto);
    return {
      skip: (page - 1) * take,
      take,
      orderBy: { [dto.sort]: dto.order },
    } as PaginationEntity;
  }

  static result<Entity>(
    entities: Entity[],
    options: PaginationDto,
    total: number,
    column?: any,
  ): PaginationResponse<Entity> {
    const { page, take } = PaginationUtil.format(options);
    const has_more = page * take < total;
    const last_page = Math.ceil(total / take);
    const next_page = page + 1 > Math.ceil(total / take) ? last_page : page + 1;
    const prev_page = page - 1 < 1 ? 1 : page - 1;
    return {
      page,
      size: take,
      total,
      sort: options.sort,
      order: options.order,
      has_more,
      prev_page: last_page > prev_page ? prev_page : last_page,
      next_page,
      last_page,
      column,
      data: entities,
    };
  }

  private static format({ page, size }: PaginationDto) {
    return {
      page: page ? Math.abs(Math.floor(page)) : 1,
      take: size ? Math.abs(Math.floor(size)) : 20,
    };
  }
}
