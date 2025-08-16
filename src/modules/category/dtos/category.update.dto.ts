import { PartialType } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { CategoryCreateDto } from "./category.create.dto";

export class CategoryUpdateDto extends PartialType(CategoryCreateDto) {
  @IsString()
  id: string;
}
