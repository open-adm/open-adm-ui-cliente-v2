"use client";

import { useProdutoApi } from "@/api/UseProdutoApi";
import { BoxApp } from "@/components/Box/BoxApp";
import { CardProdutoV2 } from "@/components/CardProduto/CardProdutoV2";
import { GridApp } from "@/components/Grid/GridApp";
import { LoadingApp } from "@/components/Loading/LoadingApp";
import { TextApp } from "@/components/Text/TextApp";
import { AppAuthContext } from "@/context/AppAuthContext";
import { useNavigateApp } from "@/hooks/UseNavigateApp";
import { IPaginacaoResponse } from "@/types/PaginacaoResponse";
import { IProdutoEcommerce } from "@/types/Produto";
import { Pagination } from "@mui/material";
import { useContext, useEffect, useState } from "react";

export function ViewCategoria() {
  const { paginacaoProduto } = useProdutoApi();
  const [pagina, setPagina] = useState(1);
  const [paginacao, setPaginacao] = useState<IPaginacaoResponse<IProdutoEcommerce>>({
    totalDeRegistros: 0,
    totalPaginas: 0,
    values: [],
  });
  const { params } = useNavigateApp();
  const { usuario } = useContext(AppAuthContext);

  async function init() {
    const response = await paginacaoProduto.fetch({
      page: pagina,
      categoriasIds: [params.id as string],
    });
    if (response) {
      setPaginacao(response);
    }
  }

  useEffect(() => {
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagina, params.id]);

  const categoria =
    paginacao.values.length === 0 ? "" : paginacao.values[0].categoria;

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
      {paginacaoProduto.status === "loading" && (
        <LoadingApp height="300px" marginTop="1rem" texto="Categorias..." />
      )}
      <GridApp container spacing={3}>
        {paginacao.values.map((produto) => (
          <GridApp key={produto.id} xs={12} sm={6}>
            <CardProdutoV2
              mostrarValorUnitario={usuario !== undefined}
              produto={produto}
            />
          </GridApp>
        ))}
      </GridApp>
      {paginacao.totalPaginas > 1 && (
        <BoxApp
          display="flex"
          alignItems="center"
          justifyContent="center"
          padding="1rem"
        >
          <Pagination
            count={paginacao.totalPaginas}
            page={pagina}
            onChange={(_, value) => setPagina(value)}
            variant="outlined"
            shape="rounded"
          />
        </BoxApp>
      )}
    </BoxApp>
  );
}
