import { IsString } from "class-validator";

export class RouteCreateDto {
  @IsString()
  path: string;
}
