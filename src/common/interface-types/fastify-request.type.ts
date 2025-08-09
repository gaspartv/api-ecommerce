import { FastifyRequest } from "fastify";
import { RequestInfoDto } from "../dtos/request.info.dto";
import { UsersSignInDto } from "../dtos/user.sign-in.dto";

declare module "fastify" {
  interface FastifyRequest {
    info?: RequestInfoDto;
    infoUser?: UsersSignInDto;
  }
}
