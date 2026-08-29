import { useApi } from '@/hooks/UseApi';
import { IPedidoMinimo, ITodasConfiguracoesDePedido } from '@/types/PedidoMinimo';
import { pedidoRotasApi } from './rotas/PedidoRotasApi';
import { ICreatePedido, ICreatePedidoResponse } from '@/types/CreatePedido';
import { IPedido, IPedidoCobranca, StatusPedido } from '@/types/Pedido';
import { ICobrarPedido, ICobrarPedidoResponse } from '@/types/CobrarPedido';

export function usePedidoApi() {
  const apiPedidoMinimo = useApi({
    method: 'GET',
    url: pedidoRotasApi.pedidoMinimo,
    naoRenderizarErro: true,
    naoRenderizarResposta: true,
  });

  const apiTodasConfiguracoesDePedido = useApi({
    method: 'GET',
    url: pedidoRotasApi.todasConfiguracoesDePedido,
    naoRenderizarErro: true,
    naoRenderizarResposta: true,
  });

  const apiPedidoStatus = useApi({
    method: 'GET',
    url: pedidoRotasApi.pedidoStatus,
    statusInicial: 'loading',
  });

  const apiPedidoId = useApi({
    method: 'GET',
    url: pedidoRotasApi.pedidoId,
    statusInicial: 'loading',
  });

  const apiPedidoParaGerarCobranca = useApi({
    method: 'GET',
    url: pedidoRotasApi.paraGerarCobranca,
    statusInicial: 'loading',
  });

  const apiPedidoGerarCobranca = useApi({
    method: 'POST',
    url: pedidoRotasApi.gerarCobranca,
    naoRenderizarResposta: true,
  });

  const apiPedidoCreate = useApi({
    method: 'POST',
    url: pedidoRotasApi.createPedido,
    naoRenderizarResposta: true,
  });

  const apiPedidoCancelar = useApi({
    method: 'PUT',
    url: pedidoRotasApi.cancelarPedido,
  });

  async function obterPedidoMinimo(): Promise<IPedidoMinimo | undefined> {
    return await apiPedidoMinimo.action();
  }

  async function obterTodasConfiguracoesDePedido(): Promise<
    ITodasConfiguracoesDePedido | undefined
  > {
    return await apiTodasConfiguracoesDePedido.action();
  }

  async function criarPedido(body: ICreatePedido): Promise<ICreatePedidoResponse | undefined> {
    return await apiPedidoCreate.action({
      body,
    });
  }

  async function obterPorStatus(statusPedido: StatusPedido): Promise<IPedido[] | undefined> {
    return await apiPedidoStatus.action({ urlParams: `${statusPedido}` });
  }

  async function obterPorId(pedidoId: string): Promise<IPedido | undefined> {
    return await apiPedidoId.action({ urlParams: `${pedidoId}` });
  }

  async function obterParaGerarCobranca(pedidoId: string): Promise<IPedidoCobranca | undefined> {
    return await apiPedidoParaGerarCobranca.action({ urlParams: `${pedidoId}` });
  }

  async function gerarCobranca(body: ICobrarPedido): Promise<ICobrarPedidoResponse | undefined> {
    return await apiPedidoGerarCobranca.action({
      body,
    });
  }

  async function cancelarPedido(body: any): Promise<any> {
    return await apiPedidoCancelar.action({
      body,
      message: 'Pedido cancelado com sucesso!',
    });
  }

  return {
    obterPedidoMinimo: {
      fetch: obterPedidoMinimo,
      status: apiPedidoMinimo.status,
    },
    criarPedido: {
      fecth: criarPedido,
      status: apiPedidoCreate.status,
    },
    obterPorStatus: {
      fetch: obterPorStatus,
      status: apiPedidoStatus.status,
    },
    obterPorId: {
      fetch: obterPorId,
      status: apiPedidoId.status,
    },
    cancelarPedido: {
      fetch: cancelarPedido,
      status: apiPedidoCancelar.status,
    },
    obterTodasConfiguracoesDePedido: {
      fetch: obterTodasConfiguracoesDePedido,
      status: apiTodasConfiguracoesDePedido.status,
    },
    obterParaGerarCobranca: {
      fetch: obterParaGerarCobranca,
      loading: apiPedidoParaGerarCobranca.loading,
    },
    gerarCobranca: {
      fetch: gerarCobranca,
      loading: apiPedidoGerarCobranca.loading,
    },
  };
}
