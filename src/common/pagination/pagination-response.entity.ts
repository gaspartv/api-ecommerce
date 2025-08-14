import { ApiProperty } from "@nestjs/swagger";
import { PaginationOrder } from "./pagination.dto";

export class PaginationResponse<T> {
  @ApiProperty()
  page: number;

  @ApiProperty()
  size: number;

  @ApiProperty()
  total: number;

  @ApiProperty()
  has_more: boolean;

  @ApiProperty()
  next_page: number;

  @ApiProperty()
  prev_page: number;

  @ApiProperty()
  last_page: number;

  @ApiProperty()
  sort: string;

  @ApiProperty({ enum: PaginationOrder, enumName: "PaginationOrder" })
  order: PaginationOrder;

  @ApiProperty({ type: () => [Object] })
  data: T[];

  @ApiProperty({ type: () => Object })
  column: any;
}
