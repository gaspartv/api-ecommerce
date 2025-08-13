import { Body, Controller, Post } from "@nestjs/common";
import { UserRoleCreateDto } from "./dtos/user-role.create.dto";
import { UserRoleService } from "./user-role.service";

@Controller("user-role")
export class UserRoleController {
  constructor(private readonly userRoleService: UserRoleService) {}

  @Post("create")
  async create(@Body() body: UserRoleCreateDto) {
    console.log(body);
    return await this.userRoleService.create(body);
  }
}
