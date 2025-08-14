import { IsEnum, IsOptional, IsString } from "class-validator";

export enum PaginationOrder {
  ASC = "asc",
  DESC = "desc",
}

export class PaginationDto {
  @IsOptional()
  @IsString()
  page: number;

  @IsOptional()
  @IsString()
  size: number;

  @IsOptional()
  @IsString()
  sort: string;

  @IsOptional()
  @IsEnum(PaginationOrder)
  order: PaginationOrder;
}
