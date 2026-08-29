import { TipoCobranca } from './TipoCobranca';

export interface ICobrarPedido {
  pedidoId: string;
  meioDePagamento: TipoCobranca;
}

export interface ICobrarPedidoResponse {
  qrCodePix?: string;
  qrCodePixBase64?: string;
  linkPagamento?: string;
}
