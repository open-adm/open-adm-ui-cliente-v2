import { useApi } from "@/hooks/UseApi";
import { IPaginacaoResponse } from "@/types/PaginacaoResponse";
import { IProdutoEcommerce } from "@/types/Produto";
import { IProdutoPaginacao } from "@/types/ProdutoPaginacao";

export function useProdutoApi() {
  const apiListarPaginacao = useApi({
    method: "POST",
    url: "produto-ecommerce",
    statusInicial: "loading",
    naoRenderizarResposta: true,
  });

  async function paginacaoProduto(
    produtoPaginacao: IProdutoPaginacao
  ): Promise<IPaginacaoResponse<IProdutoEcommerce> | undefined> {
    return await apiListarPaginacao.action({
      body: produtoPaginacao,
    });
  }

  return {
    paginacaoProduto: {
      fetch: paginacaoProduto,
      status: apiListarPaginacao.status,
    },
  };
}
