import { ConflictException, Injectable } from "@nestjs/common";
import { ErrorMessage } from "src/common/messages/errors.message";
import { PaginationResponse } from "src/common/pagination/pagination-response.entity";
import { PaginationUtil } from "src/common/pagination/pagination.util";
import { PrismaService } from "src/providers/prisma/prisma.service";
import { CodeGeneratorUtil } from "src/utils/code-generator.util";
import { LogCreateDto } from "./dtos/log.create.dto";
import { LogPaginationDto } from "./dtos/log.pagination.dto";
import { LogResponseDto } from "./dtos/log.response.dto";
import { LogPagination } from "./log.pagination";

@Injectable()
export class LogService {
  constructor(private readonly prismaService: PrismaService) {}

  private async logOrThrow(id: string): Promise<any> {
    const log = await this.prismaService.log.findFirst({ where: { id } });
    if (!log) throw new ConflictException(ErrorMessage["AEC-0014"]);
    return log;
  }

  async create(dto: LogCreateDto): Promise<LogResponseDto> {
    return await this.prismaService.log.create({
      data: {
        code: CodeGeneratorUtil.execute(),
        model: dto.model,
        request: JSON.parse(JSON.stringify(dto.request)),
        response: JSON.parse(JSON.stringify(dto.response)),
        idUserIns: dto.idUserIns,
      },
    });
  }

  async list(pagination: LogPaginationDto): Promise<PaginationResponse<LogResponseDto>> {
    const options = LogPagination.execute(pagination);
    const logs = await this.prismaService.log.findMany(options);
    const total = await this.prismaService.log.count({ where: options.where });

    return PaginationUtil.result<LogResponseDto>(logs, pagination, total);
  }
}
