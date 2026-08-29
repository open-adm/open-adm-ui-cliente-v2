import { IBase } from "./Base";
import { IPrecoProduto } from "./PrecoProduto";

export interface ITamanhos extends IBase {
  descricao: string;
  temEstoqueDisponivel?: boolean;
  precoProduto?: IPrecoProduto;
  quantidade?: number;
}
