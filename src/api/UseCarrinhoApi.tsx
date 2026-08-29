import { useApi } from "@/hooks/UseApi";
import { IAdicionarProdutoCarrinho } from "@/types/AdicionarProdutoCarrinho";
import { ICarrinho } from "@/types/Carrinho";

export function useCarrinhoApi() {
  const apiQuantidadeItens = useApi({
    method: "GET",
    url: "carrinho/get-carrinho-count",
  });

  const apiAdicionarItens = useApi({
    method: "PUT",
    url: "carrinho/adicionar",
  });

  const apiExcluirProduto = useApi({
    method: "DELETE",
    url: "carrinho/delete-produto-carrinho?produtoId=",
  });

  const apiObterItens = useApi({
    method: "GET",
    url: "carrinho/get-carrinho-v2",
    statusInicial: "loading",
  });

  async function obterQuantidadeItensCarrinho(): Promise<number | undefined> {
    return await apiQuantidadeItens.action();
  }

  async function obterItensCarrinho(): Promise<ICarrinho | undefined> {
    return await apiObterItens.action();
  }

  async function adicionarItemCarrinho(
    body: IAdicionarProdutoCarrinho[]
  ): Promise<number | undefined> {
    return await apiAdicionarItens.action({
      body,
      message: "Produto adicionado com sucesso!",
    });
  }

  async function excluirProduto(produtoId: string): Promise<any> {
    return await apiExcluirProduto.action({
      urlParams: produtoId,
    });
  }

  return {
    obterQuantidadeItensCarrinho: {
      fetch: obterQuantidadeItensCarrinho,
      status: apiQuantidadeItens.status,
    },
    adicionarItemCarrinho: {
      fetch: adicionarItemCarrinho,
      status: apiAdicionarItens.status,
    },
    obterItensCarrinho: {
      fetch: obterItensCarrinho,
      status: apiObterItens.status,
    },
    excluirProduto: {
      fecth: excluirProduto,
      status: apiExcluirProduto.status,
    },
  };
}
