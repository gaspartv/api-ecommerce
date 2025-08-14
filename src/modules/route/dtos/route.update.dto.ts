import { PartialType } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { RouteCreateDto } from "./route.create.dto";

export class RouteUpdateDto extends PartialType(RouteCreateDto) {
  @IsString()
  id: string;
}
