'use client';

import { useFormikAdapter } from '@/adapters/FormikAdapter';
import { YupAdapter } from '@/adapters/YupAdapter';
import { usePedidoApi } from '@/api/usePedidoApi';
import { BoxApp } from '@/components/Box/BoxApp';
import { DividerApp } from '@/components/Divider/DividerApp';
import { DropDownApp } from '@/components/DropDown/drop-down-app';
import { FormApp } from '@/components/Form/FormApp';
import { TextApp } from '@/components/Text/TextApp';
import { AppAuthContext } from '@/context/AppAuthContext';
import { useNavigateApp } from '@/hooks/UseNavigateApp';
import { MeioPagamentoSelect } from '@/opcoes-select/meio-pagamento-select';
import { ICobrarPedido, ICobrarPedidoResponse } from '@/types/CobrarPedido';
import { IPedidoCobranca } from '@/types/Pedido';
import { formatMoney } from '@/utils/FormatMoney';
import { useContext, useEffect, useState } from 'react';
import { ModalPix } from '@/components/Modal/ModalPix';

export function CobrancaPedidoView() {
  const { obterParaGerarCobranca, gerarCobranca } = usePedidoApi();
  const { params } = useNavigateApp();
  const { usuario } = useContext(AppAuthContext);
  const [pedido, setPedido] = useState<IPedidoCobranca>();
  const [cobranca, setCobranca] = useState<ICobrarPedidoResponse>();

  const form = useFormikAdapter<ICobrarPedido>({
    initialValues: {
      meioDePagamento: 1,
      pedidoId: params.id as string,
    },
    validationSchema: new YupAdapter().number('meioDePagamento').build(),
    onSubmit: submit,
  });

  async function init() {
    const response = await obterParaGerarCobranca.fetch((params.id as string) ?? '');
    setPedido(response);
  }

  async function submit() {
    const response = await gerarCobranca.fetch(form.values);
    setCobranca(response);
  }

  useEffect(() => {
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <ModalPix
        open={!!cobranca}
        setOpen={() => setCobranca(undefined)}
        qrCodeBase64={cobranca?.qrCodePixBase64 ?? ''}
        copiaECola={cobranca?.qrCodePix ?? ''}
        linkPagamento={cobranca?.linkPagamento ?? ''}
        valor={pedido?.valorTotal ?? 0}
      />
      <FormApp loading={gerarCobranca.loading} submit={form.onSubmit} textoButton="Confirmar">
        <BoxApp
          display="flex"
          alignItems="start"
          justifyContent="start"
          flexDirection="column"
          padding="1rem"
          gap="1rem"
        >
          <TextApp fontSize="22px" fontWeight={600} titulo={`Olá, ${usuario?.nome ?? ''}!`} />
          <TextApp fontSize="22px" fontWeight={600} titulo="✅ Pedido confirmado!" />
          <TextApp fontSize="18px" titulo={`Pedido: ${pedido?.numeroPedido}`} />
          <TextApp fontSize="18px" titulo={`Sub total: ${formatMoney(pedido?.valor)}`} />
          <TextApp fontSize="18px" titulo={`Frete: ${formatMoney(pedido?.valorFrete ?? 0)}`} />
          <DividerApp width="100%" />
          <TextApp
            fontSize="22px"
            fontWeight={600}
            titulo={`Total: ${formatMoney(pedido?.valorTotal ?? 0)}`}
          />
          <DividerApp width="100%" />
          <DropDownApp
            desabilitarExclusao
            keyLabel="descricao"
            label="Selecione o meio de pagamento"
            values={MeioPagamentoSelect}
            width="100%"
            id="meioDePagamento"
            value={MeioPagamentoSelect.find((x) => x.id === form.values.meioDePagamento)}
            onChange={form.onChange}
            required
            error={form.error('meioDePagamento')}
            helperText={form.helperText('meioDePagamento')}
          />
        </BoxApp>
      </FormApp>
    </>
  );
}
