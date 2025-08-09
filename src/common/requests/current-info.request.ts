import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { FastifyRequest } from "fastify";

async function callback(data: unknown, context: ExecutionContext) {
  const request = context.switchToHttp().getRequest<FastifyRequest>();
  return request.info;
}

export const CurrentInfoRequest = createParamDecorator(callback);
