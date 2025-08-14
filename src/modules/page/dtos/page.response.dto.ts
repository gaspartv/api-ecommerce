export class PageResponseDto {
  id: string;
  code: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  disabled: boolean;
  path: string;
  public: boolean;
}
