'use client';

import { usePedidoApi } from '@/api/usePedidoApi';
import { BoxApp } from '@/components/Box/BoxApp';
import { Button } from '@/components/Button/ButtonApp';
import { DividerApp } from '@/components/Divider/DividerApp';
import { ImageApp } from '@/components/Image/ImageApp';
import { LoadingApp } from '@/components/Loading/LoadingApp';
import { TextApp } from '@/components/Text/TextApp';
import { TextoDuplo } from '@/components/Text/TextoDuplo';
import { rotas } from '@/config/ConfigRotas';
import { useNavigateApp } from '@/hooks/UseNavigateApp';
import { IPedido } from '@/types/Pedido';
import { formatDate } from '@/utils/FormatDate';
import { formatMoney } from '@/utils/FormatMoney';
import { useEffect, useState } from 'react';

export function ViewItensPedido() {
  const { obterPorId } = usePedidoApi();
  const { navigate, params } = useNavigateApp();
  const [pedido, setPedido] = useState<IPedido>();

  async function init() {
    const response = await obterPorId.fetch(params.id as string);
    setPedido(response);
  }

  useEffect(() => {
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (obterPorId.status === 'loading') {
    return <LoadingApp height="350px" />;
  }

  return (
    <BoxApp
      width="100%"
      maxWidth="800px"
      margin="0 auto"
      padding="1.5rem"
      display="flex"
      alignItems="start"
      justifyContent="center"
      flexDirection="column"
      gap="1rem"
    >
      <BoxApp display="flex" alignItems="center" justifyContent="space-between" width="100%">
        <BoxApp>
          <TextoDuplo titulo="Pedido:" texto={`${pedido?.numero ?? ''}`} />
          <TextoDuplo titulo="Data:" texto={`${formatDate(pedido?.dataDeCriacao) ?? ''}`} />
          <TextoDuplo titulo="Total:" texto={`${formatMoney(pedido?.valorTotal) ?? ''}`} />
        </BoxApp>
        <Button title="voltar" onClick={() => navigate(rotas.pedido)} />
      </BoxApp>
      <DividerApp width="100%" />
      {pedido?.itensPedido?.map((item) => (
        <BoxApp key={item.id} width="100%">
          <BoxApp display="flex" alignItems="center" width="100%" justifyContent="space-between">
            <ImageApp
              alt={item.produto.descricao}
              height={100}
              width={100}
              src={item.produto.foto}
            />
            <BoxApp>
              <TextoDuplo titulo="Produto:" texto={`${item.produto.descricao}`} />
              {item.peso && <TextoDuplo titulo="Peso:" texto={`${item.peso.descricao}`} />}
              {item.tamanho && <TextoDuplo titulo="Tamanho:" texto={`${item.tamanho.descricao}`} />}
            </BoxApp>
            <BoxApp>
              <TextApp titulo={`Qtd: ${item.quantidade}`} />
              <TextApp titulo={`Vlr unit: ${formatMoney(item.valorUnitario)}`} />
              <TextApp titulo={`Vlr total: ${formatMoney(item.valorTotal)}`} />
            </BoxApp>
          </BoxApp>
          <DividerApp width="100%" />
        </BoxApp>
      ))}
    </BoxApp>
  );
}
