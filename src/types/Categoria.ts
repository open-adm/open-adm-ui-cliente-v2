import { IBase } from "./Base";
import { IProduto } from "./Produto";

export interface ICategoria extends IBase {
  descricao: string;
  foto?: string;
  produtos: IProduto[];
}
