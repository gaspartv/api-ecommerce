import { PartialType } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { RouteActionCreateDto } from "./route-action.create.dto";

export class RouteActionUpdateDto extends PartialType(RouteActionCreateDto) {
  @IsString()
  id: string;
}
