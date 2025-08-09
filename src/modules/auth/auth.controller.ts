import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { IsPublic } from "src/common/decorators/is-public.decorator";
import { RequestInfoDto } from "src/common/dtos/request.info.dto";
import { UsersSignInDto } from "src/common/dtos/user.sign-in.dto";
import { CurrentInfoRequest } from "src/common/requests/current-info.request";
import { CurrentUserRequest } from "src/common/requests/current-user.request";
import { AuthService } from "./auth.service";
import { AuthSignInDto } from "./dtos/auth.sign-in.dto";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @IsPublic()
  @Post("sign-in")
  @HttpCode(HttpStatus.OK)
  signIn(@Body() body: AuthSignInDto, @CurrentInfoRequest() { ip, headers }: RequestInfoDto) {
    return this.authService.signIn(body, ip, headers["user-agent"]);
  }

  @Delete("sign-out")
  @HttpCode(HttpStatus.NO_CONTENT)
  signOut(@CurrentUserRequest() userSignIn: UsersSignInDto) {
    return this.authService.signOut(userSignIn.id);
  }

  @Get("profile")
  @HttpCode(HttpStatus.OK)
  profile(@CurrentUserRequest() userSignIn: UsersSignInDto) {
    if (userSignIn.is === "client") {
      return this.authService.clientProfile(userSignIn.id);
    }
    return this.authService.userProfile(userSignIn.id);
  }
}
