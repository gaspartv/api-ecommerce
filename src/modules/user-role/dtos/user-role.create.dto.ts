import { IsArray, IsString } from "class-validator";

class PageDto {
  @IsString()
  id: string;

  @IsArray()
  routes: string[];

  @IsArray()
  actions: string[];
}

export class UserRoleCreateDto {
  @IsString()
  name: string;

  @IsArray()
  idUsers: string[];

  @IsArray()
  pages: PageDto[];
}
