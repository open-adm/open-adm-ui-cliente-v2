import { useApi } from "@/hooks/UseApi";
import { IPaginacaoResponse } from "@/types/PaginacaoResponse";
import { IProduto, IProdutoEcommerce } from "@/types/Produto";
import { IProdutoPaginacao } from "@/types/ProdutoPaginacao";

export function useProdutoApi() {
  const apiListarPorCategoria = useApi({
    method: "GET",
    url: "produtos/list-by-categorias?categoriaId=",
    statusInicial: "loading"
  });

  const apiListarPaginacao = useApi({
    method: "POST",
    url: "produto-ecommerce",
    statusInicial: "loading",
    naoRenderizarResposta: true,
  });

  async function listarPorCategorias(
    categoriaId: string
  ): Promise<IProduto[] | undefined> {
    return await apiListarPorCategoria.action({
      urlParams: categoriaId,
    });
  }

  async function paginacaoProduto(
    produtoPaginacao: IProdutoPaginacao
  ): Promise<IPaginacaoResponse<IProdutoEcommerce> | undefined> {
    return await apiListarPaginacao.action({
      body: produtoPaginacao,
    });
  }

  return {
    listarPorCategorias: {
      fetch: listarPorCategorias,
      status: apiListarPorCategoria.status,
    },
    paginacaoProduto: {
      fetch: paginacaoProduto,
      status: apiListarPaginacao.status,
    },
  };
}
