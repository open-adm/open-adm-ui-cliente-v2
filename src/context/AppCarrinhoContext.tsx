"use client";

import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { keysLocalStorage } from "@/config/keysLocalStorage";
import { useCarrinhoApi } from "@/api/UseCarrinhoApi";
import { useLocalStorage } from "@/hooks/UseLocalStorage";
import { IAdicionarProdutoCarrinho } from "@/types/AdicionarProdutoCarrinho";
import { StatusRequisicao } from "@/types/StatusRequisicao";
import { IProdutoEcommerce } from "@/types/Produto";
import { removerItemDeArrayPorIndex } from "@/utils/RemoverItemDeArrayPorIndex";
import { IEnderecoBase } from "@/types/Base";

export interface IAppCarrinhoContext {
  quantidadeItensCarrinho: number;
  adicionarItens: (itens: IAdicionarProdutoCarrinho[]) => Promise<any>;
  setProdutos: (produtos: IProdutoEcommerce[]) => void;
  statusAdicionar?: StatusRequisicao;
  statusObterItens?: StatusRequisicao;
  statusExcluirItem?: StatusRequisicao;
  produtos: IProdutoEcommerce[];
  obterProdutos: () => Promise<void>;
  excluirProdutoCarrinho: (index: number) => Promise<void>;
  resetarCarrinho: () => void;
  enderecoUsuario?: IEnderecoBase;
  setEnderecoUsuario: (endereco: IEnderecoBase) => void;
}

interface IAppCarrinhoProvider {
  children: ReactNode;
}

export const AppCarrinhoContext = createContext({} as IAppCarrinhoContext);

export function useAppCarrinhoContext(): IAppCarrinhoContext {
  return useContext(AppCarrinhoContext);
}

export function AppCarrinhoProvider(props: IAppCarrinhoProvider) {
  const [produtos, setProdutos] = useState<IProdutoEcommerce[]>([]);
  const [enderecoUsuario, setEnderecoUsuario] = useState<IEnderecoBase>();
  const [quantidadeItensCarrinho, setQuantidadeItensCarrinho] = useState(0);
  const {
    obterQuantidadeItensCarrinho,
    adicionarItemCarrinho,
    obterItensCarrinho,
    excluirProduto,
  } = useCarrinhoApi();

  const { getItem } = useLocalStorage();

  async function init() {
    const jwt = getItem(keysLocalStorage.jwt);
    if (jwt) {
      const response = await obterQuantidadeItensCarrinho.fetch();
      if (response) {
        setQuantidadeItensCarrinho(response);
      }
    }
  }

  async function obterProdutos() {
    const response = await obterItensCarrinho.fetch();
    if (response) {
      setProdutos(Array.isArray(response.itens) ? response.itens : []);
      setEnderecoUsuario(response.enderecoUsuario);
    }
  }

  async function adicionarItens(itens: IAdicionarProdutoCarrinho[]) {
    const response = await adicionarItemCarrinho.fetch(itens);
    if (response) {
      setQuantidadeItensCarrinho(response);
    }
  }

  async function excluirProdutoCarrinho(index: number) {
    const response = await excluirProduto.fecth(produtos[index].id);
    if (response) {
      setProdutos(removerItemDeArrayPorIndex(index, produtos));
    }
  }

  function resetarCarrinho() {
    setQuantidadeItensCarrinho(0);
    setProdutos([]);
  }

  useEffect(() => {
    init();
  }, []);

  return (
    <AppCarrinhoContext.Provider
      value={{
        quantidadeItensCarrinho,
        adicionarItens,
        statusAdicionar: adicionarItemCarrinho.status,
        statusObterItens: obterItensCarrinho.status,
        produtos,
        obterProdutos,
        setProdutos,
        excluirProdutoCarrinho,
        statusExcluirItem: excluirProduto.status,
        resetarCarrinho,
        enderecoUsuario,
        setEnderecoUsuario,
      }}
    >
      {props.children}
    </AppCarrinhoContext.Provider>
  );
}
