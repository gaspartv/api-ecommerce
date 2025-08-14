import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Patch, Post, Query } from "@nestjs/common";
import { RouteActionCreateDto } from "./dtos/route-action.create.dto";
import { RouteActionPaginationDto } from "./dtos/route-action.pagination.dto";
import { RouteActionUpdateDto } from "./dtos/route-action.update.dto";
import { RouteActionService } from "./route-action.service";

@Controller("route-action")
export class RouteActionController {
  constructor(private readonly routeActionService: RouteActionService) {}

  @Post("create")
  @HttpCode(HttpStatus.CREATED)
  create(@Body() body: RouteActionCreateDto) {
    return this.routeActionService.create(body);
  }

  @Delete("delete")
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Query("id") id: string) {
    return this.routeActionService.delete(id);
  }

  @Patch("update")
  @HttpCode(HttpStatus.OK)
  update(@Body() body: RouteActionUpdateDto) {
    return this.routeActionService.update(body);
  }

  @Patch("update/toggle-status")
  @HttpCode(HttpStatus.OK)
  toggleStatus(@Query("id") id: string) {
    return this.routeActionService.toggleStatus(id);
  }

  @Get("list")
  @HttpCode(HttpStatus.OK)
  list(@Query() pagination: RouteActionPaginationDto) {
    return this.routeActionService.list(pagination);
  }
}
