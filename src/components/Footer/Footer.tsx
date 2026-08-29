"use client";

import { listaDeIcones } from "@/config/ListaDeIcones";
import { BoxApp } from "../Box/BoxApp";
import { IconButtonTooltipApp } from "../Icon/IconButtonTooltipApp";
import { TextApp } from "../Text/TextApp";
import { useNavigateApp } from "@/hooks/UseNavigateApp";
import { useListarCategoriasApi } from "@/api/UseListarCategoriasApi";
import { rotas } from "@/config/ConfigRotas";
import { Button } from "../Button/ButtonApp";
import { useContext } from "react";
import { AppParceiroContext } from "@/context/AppParceiroContext";

export function Footer() {
  const { categorias } = useListarCategoriasApi();
  const { parceiro } = useContext(AppParceiroContext);
  const { navigate } = useNavigateApp();

  return (
    <footer>
      <BoxApp
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        padding="1rem"
      >
        <BoxApp>
          <TextApp
            titulo={parceiro?.nomeFantasia ?? ""}
            fontWeight={600}
            fontSize="18px"
          />
        </BoxApp>
        <BoxApp>
          <TextApp titulo="Categorias" fontWeight={600} fontSize="18px" />
          <BoxApp display="flex" flexDirection="column">
            {categorias.map((categoria) => (
              <Button
                onClick={() => navigate(`${rotas.categoria}/${categoria.id}`)}
                key={categoria.id}
                title={categoria.descricao}
              />
            ))}
          </BoxApp>
        </BoxApp>
      </BoxApp>
      <BoxApp
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        padding="1rem"
      >
        <TextApp
          titulo={`${parceiro?.nomeFantasia ?? ''} © ${new Date().getFullYear()}`}
        />
        <BoxApp>
          {parceiro?.telefones?.map((telefone, i) => (
            <IconButtonTooltipApp
              key={i}
              icon={listaDeIcones.whatsApp}
              titulo="WhatsApp"
              href={`https://api.whatsapp.com/send?phone=55${
                telefone.telefone
              }&text=Olá, estou iniciando esta conversa através do site da ${
                parceiro?.nomeFantasia ?? ""
              }`}
              cor="green"
              target="_blank"
            />
          ))}
          {parceiro?.redesSociais?.map((x, i) => (
            <IconButtonTooltipApp
              key={i}
              icon={
                x.redeSocialEnum === 1
                  ? listaDeIcones.facebook
                  : listaDeIcones.instagram
              }
              titulo={x.redeSocialEnum === 1 ? "Facebook" : "Instagram"}
              href={x.link}
              cor={x.redeSocialEnum === 1 ? "#497ce2" : "#db4437"}
              target="_blank"
            />
          ))}
        </BoxApp>
      </BoxApp>
      <BoxApp
        display="flex"
        alignItems="center"
        justifyContent="center"
        gap="1rem"
      >
        <TextApp titulo="Desenvoldido por" fontWeight={600} />
        <TextApp
          titulo="Open Adm ©"
          fontWeight={600}
          fontSize="1.2rem"
          color="primary"
        />
      </BoxApp>
    </footer>
  );
}
