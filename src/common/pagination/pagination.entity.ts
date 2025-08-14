import { Expose } from "class-transformer";

export class PaginationEntity {
  @Expose() skip?: number;
  @Expose() take?: number;
  @Expose() size?: never;
  @Expose() orderBy?: any;
  @Expose() sort?: never;
  @Expose() where?: any;
}
