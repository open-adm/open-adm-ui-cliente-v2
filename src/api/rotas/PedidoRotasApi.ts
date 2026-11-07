export const pedidoRotasApi = {
  createPedido: 'pedidos/create',
  cancelarPedido: 'pedidos/cancelar',
  pedidoMinimo: 'configuracao-do-sistema/pedido-minimo',
  todasConfiguracoesDePedido: 'configuracao-do-sistema/todas-configuracoes',
  pedidoStatus: 'pedidos/list?statusPedido=',
  pedidoId: 'pedidos/get?pedidoId=',
  paraGerarCobranca: 'pedidos/get-gerar-pix?pedidoId=',
  gerarCobranca: 'pedido/cobrar',
};
