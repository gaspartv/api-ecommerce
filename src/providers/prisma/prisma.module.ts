import { Global } from "@nestjs/common";
import { Module } from "@nestjs/common/decorators/modules/module.decorator";
import { PrismaService } from "./prisma.service";

@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
