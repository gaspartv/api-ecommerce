export class AuthJwtDto {
  iss: string;
  ses: string;
  sub: string;
  exp?: number;
  iat?: number;
  is: "user" | "client";
}
