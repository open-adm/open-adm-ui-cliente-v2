"use client";

import { AlertApp } from "@/components/Alert/AlertApp";
import { BoxApp } from "@/components/Box/BoxApp";
import { Button } from "@/components/Button/ButtonApp";
import { CardProdutoV2 } from "@/components/CardProduto/CardProdutoV2";
import { GridApp } from "@/components/Grid/GridApp";
import { LoadingApp } from "@/components/Loading/LoadingApp";
import { TextApp } from "@/components/Text/TextApp";
import { rotas } from "@/config/ConfigRotas";
import { listaDeIcones } from "@/config/ListaDeIcones";
import { AppCarrinhoContext } from "@/context/AppCarrinhoContext";
import { useNavigateApp } from "@/hooks/UseNavigateApp";
import { IProdutoEcommerce } from "@/types/Produto";
import { useContext, useEffect } from "react";
import { ViewResumoCarrinho } from "./ViewResumoCarrinho";

export function ViewCarrinho() {
  const {
    quantidadeItensCarrinho,
    obterProdutos,
    produtos,
    statusObterItens,
    setProdutos,
  } = useContext(AppCarrinhoContext);
  const { navigate } = useNavigateApp();

  function editarProduto(index: number, produto: IProdutoEcommerce) {
    const newProdutos = [...produtos];
    newProdutos[index] = produto;
    setProdutos(newProdutos);
  }

  useEffect(() => {
    obterProdutos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  if (
    (!quantidadeItensCarrinho || produtos.length === 0) &&
    statusObterItens !== "loading"
  ) {
    return (
      <BoxApp marginTop="1rem" padding="1rem" height="calc(100vh - 300px)">
        <TextApp
          titulo="Carrinho"
          fontSize="18px"
          fontWeight={600}
          marginBotton="1rem"
        />
        <TextApp titulo="Você não tem nada no seu carrinho. Vamos mudar isso, use o link abaixo para" />
        <TextApp
          titulo="começar a navegar pelos nossos produtos."
          marginBotton="1rem"
        />
        <Button
          endIcon={listaDeIcones.flechaDireita}
          onClick={() => navigate(rotas.produto)}
          title="Explorar produtos"
        />
      </BoxApp>
    );
  }

  return (
    <BoxApp width="100%">
      {statusObterItens === "loading" ? (
        <LoadingApp height="350px" />
      ) : (
        <>
          <BoxApp padding="0.5rem">
            <AlertApp
              tipo="warning"
              texto="Atenção, nosso tempo mínimo de entrega do pedido é de 30 dias."
            />
          </BoxApp>
          <GridApp container spacing={2}>
            <GridApp sm={8} xs={12} md={8}>
              <BoxApp
                height="calc(100vh - 60px)"
                overflowy="auto"
                padding="0.5rem"
                display="flex"
                flexDirection="column"
                gap="1rem"
              >
                <GridApp container spacing={2}>
                  {produtos.map((produto, index) => (
                    <GridApp sm={6} xs={12} md={6} lg={4} key={produto.id}>
                      <CardProdutoV2
                        desabilitarBtnAddCarrinho
                        produto={produto}
                        habilitarExclusaoProduto
                        onBlur={(prod) => editarProduto(index, prod)}
                        index={index}
                      />
                    </GridApp>
                  ))}
                </GridApp>
              </BoxApp>
            </GridApp>
            <GridApp sm={4} xs={12}>
              <ViewResumoCarrinho />
            </GridApp>
          </GridApp>
        </>
      )}
    </BoxApp>
  );
}
