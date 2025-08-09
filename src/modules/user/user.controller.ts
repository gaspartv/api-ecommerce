import { Controller, Patch, Post } from "@nestjs/common";
import { IsPublic } from "src/common/decorators/is-public.decorator";
import { UserService } from "./user.service";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Patch("self-update")
  selfUpdate() {}

  @Patch("update")
  update() {}

  @IsPublic()
  @Post("complete-registration")
  completeRegistration() {}

  @IsPublic()
  @Post("forgot-password")
  forgotPassword() {}

  @IsPublic()
  @Post("reset-password")
  resetPassword() {}

  @IsPublic()
  @Post("resend-verification")
  resendVerification() {}

  @IsPublic()
  @Post("change-password")
  changePassword() {}
}
