import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Patch, Post, Query } from "@nestjs/common";
import { UsersSignInDto } from "src/common/dtos/user.sign-in.dto";
import { CurrentUserRequest } from "src/common/requests/current-user.request";
import { CategoryService } from "./category.service";
import { CategoryCreateDto } from "./dtos/category.create.dto";
import { CategoryPaginationDto } from "./dtos/category.pagination.dto";
import { CategoryUpdateDto } from "./dtos/category.update.dto";

@Controller("category")
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post("create")
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CategoryCreateDto, @CurrentUserRequest() userSignIn: UsersSignInDto) {
    return this.categoryService.create(dto, userSignIn.id);
  }

  @Delete("delete")
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Query("id") id: string) {
    return this.categoryService.softDelete(id);
  }

  @Patch("update")
  @HttpCode(HttpStatus.OK)
  update(@Body() dto: CategoryUpdateDto) {
    return this.categoryService.update(dto);
  }

  @Patch("update/toggle-status")
  @HttpCode(HttpStatus.OK)
  toggleStatus(@Query("id") id: string) {
    return this.categoryService.toggleStatus(id);
  }

  @Get("list")
  @HttpCode(HttpStatus.OK)
  list(@Query() pagination: CategoryPaginationDto) {
    return this.categoryService.list(pagination);
  }
}
