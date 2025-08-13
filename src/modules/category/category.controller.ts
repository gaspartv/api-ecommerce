import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { UsersSignInDto } from "src/common/dtos/user.sign-in.dto";
import { CurrentUserRequest } from "src/common/requests/current-user.request";
import { CategoryService } from "./category.service";
import { CategoryCreateDto } from "./dtos/category.create.dto";

@Controller("category")
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post("create")
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CategoryCreateDto, @CurrentUserRequest() userSignIn: UsersSignInDto) {
    return this.categoryService.create(dto, userSignIn.id);
  }
}
