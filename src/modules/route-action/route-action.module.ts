import { Module } from "@nestjs/common";
import { RouteActionController } from "./route-action.controller";
import { RouteActionService } from "./route-action.service";

@Module({
  controllers: [RouteActionController],
  providers: [RouteActionService],
})
export class RouteActionModule {}
