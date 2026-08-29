"use client";

import { usePedidoApi } from "@/api/usePedidoApi";
import { BoxApp } from "@/components/Box/BoxApp";
import { LoadingApp } from "@/components/Loading/LoadingApp";
import SelectApp from "@/components/Select/SelectApp";
import { IPedido, StatusPedido } from "@/types/Pedido";
import { useEffect, useState } from "react";
import {
  corStatusPedido,
  descricaoStatusPedido,
  opcoesStatusPedido,
} from "./ConfiguracaoPedido";
import { TextApp } from "@/components/Text/TextApp";
import { DividerApp } from "@/components/Divider/DividerApp";
import { formatDate } from "@/utils/FormatDate";
import { formatMoney } from "@/utils/FormatMoney";
import { IconButtonTooltipApp } from "@/components/Icon/IconButtonTooltipApp";
import { listaDeIcones } from "@/config/ListaDeIcones";
import { TextoDuplo } from "@/components/Text/TextoDuplo";
import { useNavigateApp } from "@/hooks/UseNavigateApp";
import { rotas } from "@/config/ConfigRotas";
import { ChipApp } from "@/components/Chip/ChipApp";
import ModalApp from "@/components/Modal/ModalApp";
import { InputApp } from "@/components/Input/InputApp";
import { Button } from "@/components/Button/ButtonApp";

export function ViewPedido() {
  const { obterPorStatus, cancelarPedido } = usePedidoApi();
  const { navigate } = useNavigateApp();
  const [statusPedido, setStatusPedido] = useState<StatusPedido>(0);
  const [pedidos, setPedidos] = useState<IPedido[]>([]);
  const [pedidoCancelar, setPedidoCancelar] = useState<IPedido>();
  const [motivoCancelarPedido, setMotivoCancelarPedido] = useState<string>("");

  async function init() {
    const response = await obterPorStatus.fetch(statusPedido);
    setPedidos(response ?? []);
  }

  function fecharModal() {
    setPedidoCancelar(undefined);
    setMotivoCancelarPedido("");
  }

  async function cancelar() {
    if (!pedidoCancelar) {
      return;
    }

    const response = await cancelarPedido.fetch({
      pedidoId: pedidoCancelar.id,
      motivo: motivoCancelarPedido,
    });

    if (response) {
      fecharModal();
      await init();
    }
  }

  useEffect(() => {
    init();
  }, [statusPedido]);

  if (obterPorStatus.status === "loading") {
    return <LoadingApp height="350px" />;
  }

  return (
    <>
      <ModalApp open={pedidoCancelar !== undefined} close={fecharModal}>
        <form>
          <BoxApp
            display="flex"
            alignItems="start"
            flexDirection="column"
            gap="1rem"
          >
            <TextApp
              titulo={`Cancelar pedido: ${pedidoCancelar?.numero ?? ""}`}
              fontWeight={600}
            />
            <TextApp
              titulo="Deseja informar o motivo do cancelamento?"
              fontWeight={600}
            />
            <InputApp
              value={motivoCancelarPedido}
              label="Motivo"
              autoFocus
              id="motivoCancelar"
              onChange={(_, value) => setMotivoCancelarPedido(value)}
              maxLength={255}
              fullWidth
            />
            <Button
              variant="contained"
              onClick={cancelar}
              type="submit"
              loading={cancelarPedido.status === "loading"}
            />
          </BoxApp>
        </form>
      </ModalApp>
      <BoxApp
        padding="1.5rem"
        width="100%"
        maxWidth="800px"
        margin="0 auto"
      >
        <BoxApp display="flex" alignItems="center">
          <SelectApp
            opcoes={opcoesStatusPedido}
            keyDescricao="descricao"
            keyValue="id"
            label="Selecione o status"
            value={statusPedido}
            width="100%"
            onChange={(value) => setStatusPedido(value)}
            id="statusPedido"
          />
        </BoxApp>
        {pedidos.length === 0 ? (
          <BoxApp padding="1rem">
            <TextApp
              fontWeight={600}
              fontSize="18px"
              titulo={`Não há pedidos para o status: ${descricaoStatusPedido[statusPedido]}`}
            />
          </BoxApp>
        ) : (
          <>
            {pedidos.map((pedido) => (
              <BoxApp key={pedido.id} marginTop="1rem">
                <BoxApp
                  display="flex"
                  gap="1rem"
                  alignItems="center"
                  justifyContent="center"
                >
                  <TextoDuplo titulo="Pedido: " texto={`${pedido.numero}`} />
                  <TextoDuplo
                    titulo="Data: "
                    texto={`${formatDate(pedido.dataDeCriacao)}`}
                  />
                  <ChipApp
                    label={descricaoStatusPedido[pedido.statusPedido]}
                    color={corStatusPedido[pedido.statusPedido] as any}
                  />
                  <TextoDuplo
                    titulo="Total: "
                    texto={`${formatMoney(pedido.valorTotal)}`}
                  />
                  {pedido.statusPedido === 0 && (
                    <IconButtonTooltipApp
                      icon={listaDeIcones.close}
                      cor="red"
                      titulo="Cancelar"
                      onClick={() => setPedidoCancelar(pedido)}
                    />
                  )}
                  <IconButtonTooltipApp
                    icon={listaDeIcones.flechaDireita}
                    titulo="Visualizar"
                    onClick={() => navigate(`${rotas.pedido}/${pedido.id}`)}
                  />
                </BoxApp>
                <DividerApp width="100%" />
              </BoxApp>
            ))}
          </>
        )}
      </BoxApp>
    </>
  );
}
