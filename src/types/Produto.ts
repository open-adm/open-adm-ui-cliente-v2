import { IBase } from "./Base";
import { ICategoria } from "./Categoria";
import { IPeso } from "./Peso";
import { ITamanhos } from "./Tamanho";

export interface IProduto extends IBase {
  descricao: string;
  foto: string;
  referencia?: string;
  categoria: ICategoria;
  especificacaoTecnica?: string;
  pesos: IPeso[];
  tamanhos: ITamanhos[];
}

export interface IProdutoEcommerce {
  id: string,
  descricao: string,
  referencia?: string,
  foto: string,
  categoria: string,
  numero: number,
  tamanhos: IProdutoTamanhoPesoEcommerce[],
  pesos: IProdutoTamanhoPesoEcommerce[]
}

export interface IProdutoTamanhoPesoEcommerce {
  id: string
  descricao: string
  quantidade?: number
  valorUnitario?: number
  quantidadeEstoqueDisponivel?: number
  temEstoqueDisponivel?: boolean
}