export const pedidoRotasApi = {
  createPedido: 'pedidos/create',
  cancelarPedido: 'pedidos/cancelar',
  pedidoMinimo: 'configuracoes-de-pedido/pedido-minimo',
  todasConfiguracoesDePedido: 'configuracoes-de-pedido/todas-configuracoes',
  pedidoStatus: 'pedidos/list?statusPedido=',
  pedidoId: 'pedidos/get?pedidoId=',
  paraGerarCobranca: 'pedidos/get-gerar-pix?pedidoId=',
  gerarCobranca: 'pedido/cobrar',
};
