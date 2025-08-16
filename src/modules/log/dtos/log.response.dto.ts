import { JsonValue } from "@prisma/client/runtime/library";

export class LogResponseDto {
  id: string;
  code: string;
  createdAt: Date;
  idUserIns: string | null;
  model: string;
  request: JsonValue;
  response: JsonValue | null;
}
