export class PaginatedDto<TData> {
  total?: number;
  items: TData[];
}
