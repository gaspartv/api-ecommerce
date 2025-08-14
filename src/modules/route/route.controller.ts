import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Patch, Post, Query } from "@nestjs/common";
import { RouteCreateDto } from "./dtos/route.create.dto";
import { RoutePaginationDto } from "./dtos/route.pagination.dto";
import { RouteUpdateDto } from "./dtos/route.update.dto";
import { RouteService } from "./route.service";

@Controller("route")
export class RouteController {
  constructor(private readonly routeService: RouteService) {}

  @Post("create")
  @HttpCode(HttpStatus.CREATED)
  create(@Body() body: RouteCreateDto) {
    return this.routeService.create(body);
  }

  @Delete("delete")
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Query("id") id: string) {
    return this.routeService.delete(id);
  }

  @Patch("update")
  @HttpCode(HttpStatus.OK)
  update(@Body() body: RouteUpdateDto) {
    return this.routeService.update(body);
  }

  @Patch("update/toggle-status")
  @HttpCode(HttpStatus.OK)
  toggleStatus(@Query("id") id: string) {
    return this.routeService.toggleStatus(id);
  }

  @Get("list")
  @HttpCode(HttpStatus.OK)
  list(@Body() pagination: RoutePaginationDto) {
    return this.routeService.list(pagination);
  }
}
