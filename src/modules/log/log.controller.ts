import { Controller, Get, HttpCode, HttpStatus, Query } from "@nestjs/common";
import { LogPaginationDto } from "./dtos/log.pagination.dto";
import { LogService } from "./log.service";

@Controller("log")
export class LogController {
  constructor(private readonly logService: LogService) {}

  @Get("list")
  @HttpCode(HttpStatus.OK)
  async list(@Query() pagination: LogPaginationDto) {
    return this.logService.list(pagination);
  }
}
