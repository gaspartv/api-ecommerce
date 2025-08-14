import { IsBoolean, IsOptional, IsString } from "class-validator";

export class PageCreateDto {
  @IsString()
  path: string;

  @IsOptional()
  @IsBoolean()
  public?: boolean;
}
