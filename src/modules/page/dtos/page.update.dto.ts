import { PartialType } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { PageCreateDto } from "./page.create.dto";

export class PageUpdateDto extends PartialType(PageCreateDto) {
  @IsString()
  id: string;
}
