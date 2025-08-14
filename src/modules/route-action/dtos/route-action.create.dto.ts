import { IsString } from "class-validator";

export class RouteActionCreateDto {
  @IsString()
  name: string;
}
