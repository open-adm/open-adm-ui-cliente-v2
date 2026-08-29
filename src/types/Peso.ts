import { IBase } from "./Base";
import { IPrecoProduto } from "./PrecoProduto";

export interface IPeso extends IBase {
  descricao: string;
  precoProduto?: IPrecoProduto;
  temEstoqueDisponivel?: boolean;
  quantidade?: number;
}
