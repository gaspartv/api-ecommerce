import { Logger } from "@nestjs/common";
import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  API_NAME: z.string(),
  NODE_ENV: z.enum(["develop", "homolog", "production"]),
  PORT: z.coerce.number(),
  FRONT_URL: z.string(),
  JWT_SECRET: z.string(),
  JWT_EXPIRES_IN_TIME: z.coerce.number().min(0).max(86400000),
});

const _env = envSchema.safeParse(process.env);

if (_env.success === false) {
  _env.error.issues.map((error) => {
    Logger.error(String(error.path[0]) + ": " + error.message, "EnvError");
  });

  process.exit(1);
}

const env = _env.data;

export { env };
