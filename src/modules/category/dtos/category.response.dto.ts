export class CategoryResponseDto {
  id: string;
  code: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  disabled: boolean;
  name: string;
  description: string | null;
  idUserIns: string | null;
}
