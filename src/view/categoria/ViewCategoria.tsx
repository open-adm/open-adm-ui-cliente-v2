"use client";

import { useProdutoApi } from "@/api/UseProdutoApi";
import { BoxApp } from "@/components/Box/BoxApp";
import { GridApp } from "@/components/Grid/GridApp";
import { LoadingApp } from "@/components/Loading/LoadingApp";
import { TextApp } from "@/components/Text/TextApp";
import { IProduto } from "@/types/Produto";
import { useContext, useEffect, useState } from "react";
import { CardProduto } from "@/components/CardProduto/CardProduto";
import { useNavigateApp } from "@/hooks/UseNavigateApp";
import { AppAuthContext } from "@/context/AppAuthContext";

export function ViewCategoria() {
  const { listarPorCategorias } = useProdutoApi();
  const [produtos, setProdutos] = useState<IProduto[]>([]);
  const { params } = useNavigateApp();
  const { usuario } = useContext(AppAuthContext);

  async function init() {
    const response = await listarPorCategorias.fetch(params.id as string);
    if (response) {
      setProdutos(response);
    }
  }

  useEffect(() => {
    init();
  }, []);

  const categoria =
    produtos.length === 0 ? "" : produtos[0].categoria?.descricao;

  return (
    <BoxApp padding="1rem">
      <BoxApp
        display="flex"
        alignItems="center"
        justifyContent="center"
        padding="1rem"
      >
        <TextApp fontSize="20px" fontWeight={600} titulo={categoria ?? ""} />
      </BoxApp>
      {listarPorCategorias.status === "loading" && (
        <LoadingApp height="300px" marginTop="1rem" texto="Categorias..." />
      )}
      <GridApp container spacing={3}>
        {produtos.map((produto) => (
          <GridApp key={produto.id} xs={12} sm={6}>
            <CardProduto
              mostrarValorUnitario={usuario !== undefined}
              produto={produto}
            />
          </GridApp>
        ))}
      </GridApp>
    </BoxApp>
  );
}
