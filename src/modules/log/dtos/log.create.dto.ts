import { IsJSON, IsString } from "class-validator";

export class LogCreateDto {
  @IsString()
  model: string;

  @IsJSON()
  request: any;

  @IsJSON()
  response: any;

  @IsString()
  idUserIns: string;
}
