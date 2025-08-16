import { PartialType } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { LogCreateDto } from "./log.create.dto";

export class LogUpdateDto extends PartialType(LogCreateDto) {
  @IsString()
  id: string;
}
