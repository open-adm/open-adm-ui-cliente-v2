export interface IPaginacaoResponse<T> {
  values: T[];
  totalPaginas: number;
  totalDeRegistros: number;
}
