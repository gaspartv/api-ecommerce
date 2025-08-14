import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Patch, Post, Query } from "@nestjs/common";
import { PageCreateDto } from "./dtos/page.create.dto";
import { PagePaginationDto } from "./dtos/page.pagination.dto";
import { PageUpdateDto } from "./dtos/page.update.dto";
import { PageService } from "./page.service";

@Controller("page")
export class PageController {
  constructor(private readonly pageService: PageService) {}

  @Post("create")
  @HttpCode(HttpStatus.CREATED)
  create(@Body() body: PageCreateDto) {
    return this.pageService.create(body);
  }

  @Delete("delete")
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Query("id") id: string) {
    return this.pageService.delete(id);
  }

  @Patch("update")
  @HttpCode(HttpStatus.OK)
  update(@Body() body: PageUpdateDto) {
    return this.pageService.update(body);
  }

  @Patch("update/toggle-status")
  @HttpCode(HttpStatus.OK)
  toggleStatus(@Query("id") id: string) {
    return this.pageService.toggleStatus(id);
  }

  @Get("list")
  @HttpCode(HttpStatus.OK)
  list(@Query() pagination: PagePaginationDto) {
    return this.pageService.list(pagination);
  }
}
