import { Logger, ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import {
  FastifyAdapter,
  NestFastifyApplication,
} from "@nestjs/platform-fastify";
import { AppModule } from "./app.module";
import { env } from "./configs/env.config";

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  app.enableCors({ origin: [env.FRONT_URL] });

  app.useGlobalPipes(
    new ValidationPipe({
      errorHttpStatusCode: 422,
      whitelist: true,
      transform: true,
      transformOptions: { groups: ["transform"] },
    }),
  );

  await app.listen(env.PORT, (err, address) => {
    if (err) Logger.error(err);
    if (env.NODE_ENV === "develop") {
      if (address) Logger.log(address, "Address");
      Logger.log(env.PORT, "PORT");
    }
  });
}
bootstrap().then((r) => r);
