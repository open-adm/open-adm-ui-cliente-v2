"use client";

import { useClienteApi } from "@/api/UseClienteApi";
import { BoxApp } from "@/components/Box/BoxApp";
import { Button } from "@/components/Button/ButtonApp";
import { DividerApp } from "@/components/Divider/DividerApp";
import { LoadingApp } from "@/components/Loading/LoadingApp";
import { TextApp } from "@/components/Text/TextApp";
import { TextoDuplo } from "@/components/Text/TextoDuplo";
import { rotas } from "@/config/ConfigRotas";
import { useNavigateApp } from "@/hooks/UseNavigateApp";
import { IUsuario } from "@/types/Usuario";
import { maskCpfCnpj } from "@/utils/MaskCpfCnpj";
import { maskPhone } from "@/utils/MaskPhone";
import { useEffect, useState } from "react";

export function ViewMinhaConta() {
  const [usuario, setUsuario] = useState<IUsuario>();
  const { obterUsuarioLogado } = useClienteApi();
  const { navigate } = useNavigateApp();

  async function init() {
    const response = await obterUsuarioLogado.fecth();
    setUsuario(response);
  }

  useEffect(() => {
    init();
  }, []);

  if (obterUsuarioLogado.status === "loading") {
    return <LoadingApp height="350px" />;
  }

  return (
    <BoxApp
      width="100%"
      maxWidth="500px"
      margin="0 auto"
      height="calc(100vh - 210px)"
      padding="1rem"
      display="flex"
      alignItems="start"
      flexDirection="column"
      gap="1rem"
      overflowy="auto"
    >
      <BoxApp
        display="flex"
        alignItems="center"
        width="100%"
        flexDirection="column"
        gap="1rem"
      >
        <TextApp
          titulo={`${usuario?.nome ?? ""}`}
          fontSize="18px"
          fontWeight={600}
        />
      </BoxApp>
      <BoxApp>
        <TextoDuplo
          titulo="Qtd de pedidos:"
          texto={`${usuario?.quantidadeDePedido ?? ""}`}
        />
        <TextoDuplo
          titulo="Qtd de pedidos em aberto:"
          texto={`${usuario?.pedidosEmAberto ?? ""}`}
        />
      </BoxApp>
      <DividerApp chip="Detalhes" width="100%" />
      <TextoDuplo titulo="E-mail:" texto={`${usuario?.email ?? ""}`} />
      <TextoDuplo
        titulo="CPF/CNPJ:"
        texto={`${maskCpfCnpj(usuario?.cpf ?? usuario?.cnpj) ?? ""}`}
      />
      <TextoDuplo
        titulo="Telefone:"
        texto={`${maskPhone(usuario?.telefone) ?? ""}`}
      />
      <DividerApp width="100%" />
      <BoxApp
        display="flex"
        alignItems="center"
        width="100%"
        flexDirection="column"
      >
        <Button
          onClick={() => navigate(rotas.editarMinhaConta)}
          title="editar minha conta"
          variant="contained"
        />
      </BoxApp>
    </BoxApp>
  );
}
