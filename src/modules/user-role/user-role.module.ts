import { Module } from "@nestjs/common";
import { UserRoleController } from "./user-role.controller";
import { UserRoleService } from "./user-role.service";

@Module({
  imports: [],
  controllers: [UserRoleController],
  providers: [UserRoleService],
  exports: [],
})
export class UserRoleModule {}
