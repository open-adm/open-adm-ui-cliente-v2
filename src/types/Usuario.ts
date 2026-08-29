import { IBase, IEnderecoBase } from "./Base";

export interface IUsuario extends IBase {
  nome: string;
  email: string;
  telefone: string;
  cnpj?: string;
  cpf?: string;
  pedidosEmAberto?: number;
  quantidadeDePedido?: number;
  enderecoUsuario?: IEnderecoBase;
}

export interface IUsuarioCreate {
  nome: string;
  email: string;
  telefone: string;
  cpf: string;
  senha: string;
  reSenha: string;
  validouCnpj: boolean;
}
