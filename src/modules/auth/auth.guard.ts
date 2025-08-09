import { ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthGuard } from "@nestjs/passport";
import { FastifyRequest } from "fastify";
import { IS_PUBLIC_KEY } from "src/common/decorators/is-public.decorator";

@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext): Promise<boolean> | boolean {
    const request: FastifyRequest = context.switchToHttp().getRequest<FastifyRequest>();

    request.info = {
      method: request.method,
      url: `${request.protocol}://${request.hostname}${request.originalUrl}`,
      params: request.params,
      query: request.query,
      body: request.body,
      headers: request.headers,
      ip: request.ip,
      error: request.validationError,
    };

    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) return true;

    const canActivate = super.canActivate(context);
    if (typeof canActivate === "boolean") {
      return canActivate;
    }

    const canActivatePromise = canActivate as Promise<boolean>;

    return canActivatePromise.catch((error) => {
      if (error instanceof UnauthorizedException) {
        throw new UnauthorizedException(error.message);
      }

      throw new UnauthorizedException("JWT token is invalid");
    });
  }
}
