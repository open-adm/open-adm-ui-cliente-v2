import { IEnderecoBase } from "./Base";
import { IProdutoEcommerce } from "./Produto";

export interface ICarrinho {
  itens: IProdutoEcommerce[];
  enderecoUsuario?: IEnderecoBase;
}
