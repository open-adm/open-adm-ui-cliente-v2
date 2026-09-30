"use client";

import { useListarCategoriasApi } from "@/api/UseListarCategoriasApi";
import { usePesoApi } from "@/api/UsePesoTamanho";
import { useProdutoApi } from "@/api/UseProdutoApi";
import { useTamanhoApi } from "@/api/UseTamanhoApi";
import { BoxApp } from "@/components/Box/BoxApp";
import { CardProdutoV2 } from "@/components/CardProduto/CardProdutoV2";
import { CheckBoxApp } from "@/components/Checkbox/CheckBoxApp";
import { DividerApp } from "@/components/Divider/DividerApp";
import { GridApp } from "@/components/Grid/GridApp";
import { IconButtonApp } from "@/components/Icon/IconButtonApp";
import { IconButtonTooltipApp } from "@/components/Icon/IconButtonTooltipApp";
import { TextApp } from "@/components/Text/TextApp";
import { listaDeIcones } from "@/config/ListaDeIcones";
import { AppAuthContext } from "@/context/AppAuthContext";
import { useThemeApp } from "@/hooks/UseThemeApp";
import { ICategoria } from "@/types/Categoria";
import { IPaginacaoResponse } from "@/types/PaginacaoResponse";
import { IPeso } from "@/types/Peso";
import { IProdutoEcommerce } from "@/types/Produto";
import { ITamanhos } from "@/types/Tamanho";
import { Drawer, Pagination } from "@mui/material";
import { ReactNode, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

type TipoFiltro = 'categoriasIds' | 'pesosIds' | 'tamanhosIds';

export function ViewProduto() {
  const { slug } = useParams();
  const { paginacaoProduto } = useProdutoApi();
  const { isMobile } = useThemeApp();
  const { categorias } = useListarCategoriasApi();
  const { listarTamanhos } = useTamanhoApi();
  const { listarPesos } = usePesoApi();
  const { usuario } = useContext(AppAuthContext);
  const [pagina, setPagina] = useState(1);
  const [open, setOpen] = useState(false);
  const [pesosIds, setPesosIds] = useState<string[]>([]);
  const [tamanhosIds, setTamanhosIds] = useState<string[]>([]);
  const [categoriasIds, setCategoriasIds] = useState<string[]>([]);
  const [pesos, setPesos] = useState<IPeso[]>([]);
  const [tamanhos, setTamanhos] = useState<ITamanhos[]>([]);
  const [paginacao, setPaginacao] = useState<IPaginacaoResponse<IProdutoEcommerce>>({
    totalDeRegistros: 0, totalPaginas: 0, values: [],
  });

  async function carregarProdutos(categorias: string[], pesosSelecionados: string[], tamanhosSelecionados: string[], page = 1) {
    window.scrollTo(0, 0);
    const response = await paginacaoProduto.fetch({
      page, categoriasIds: categorias, pesosIds: pesosSelecionados, tamanhosIds: tamanhosSelecionados,
    });
    if (response) setPaginacao(response);
  }

  async function mudarPagina(value: number) {
    setPagina(value);
    await carregarProdutos(categoriasIds, pesosIds, tamanhosIds, value);
  }

  async function filtrar(id: string, value: boolean, tipoFiltro: TipoFiltro) {
    setPagina(1);
    if (tipoFiltro === 'categoriasIds') {
      const novasCategorias = value ? [id] : [];
      setCategoriasIds(novasCategorias);
      await carregarProdutos(novasCategorias, pesosIds, tamanhosIds, 1);
    }
    if (tipoFiltro === 'pesosIds') {
      const novosPesosIds = value ? [...pesosIds, id] : pesosIds.filter(x => x !== id);
      setPesosIds(novosPesosIds);
      await carregarProdutos(categoriasIds, novosPesosIds, tamanhosIds, 1);
    }
    if (tipoFiltro === 'tamanhosIds') {
      const novosTamanhosIds = value ? [...tamanhosIds, id] : tamanhosIds.filter(x => x !== id);
      setTamanhosIds(novosTamanhosIds);
      await carregarProdutos(categoriasIds, pesosIds, novosTamanhosIds, 1);
    }
  }

  useEffect(() => {
    if (!slug || categorias.length === 0) {
      carregarProdutos([], [], [], 1);
      return;
    }
    const slugCategoria = decodeURIComponent(slug ?? '');
    const categoria = categorias.find((x) => x.descricao.trim() === slugCategoria);
    if (!categoria) return;
    const novasCategoriasIds = [categoria.id];
    carregarProdutos(novasCategoriasIds, [], [], 1);
    setCategoriasIds(novasCategoriasIds);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug, categorias]);

  useEffect(() => {
    async function carregarFiltros() {
      const [responseTamanhos, responsePesos] = await Promise.all([
        listarTamanhos.fetch(), listarPesos.fetch(),
      ]);
      setPesos(responsePesos || []);
      setTamanhos(responseTamanhos || []);
    }
    carregarFiltros();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const categoria = categoriasIds.length ? categorias.find((x) => x.id === categoriasIds[0]) : undefined;

  return (
    <BoxApp padding="1rem" maxWidth="1200px" width="100%" margin="0 auto">
      {isMobile && <MenuFiltroMobile menuFiltro={
        <MenuFiltro categorias={categorias} pesos={pesos} tamanhos={tamanhos}
          categoriasIds={categoriasIds} pesosIds={pesosIds} tamanhosIds={tamanhosIds}
          filtrar={filtrar} height="calc(100vh - 100px)" width="100%" />
      } close={() => setOpen(false)} open={open} />}
      <BoxApp display="flex" alignItems="center" justifyContent={isMobile ? "space-between" : "start"} padding="1rem" gap="1rem">
        <BoxApp>
          <TextApp titulo="Catálogo" />
          {categoria
            ? <TextApp fontSize="20px" fontWeight={600} color="primary" titulo={categoria.descricao} />
            : <TextApp fontSize="20px" fontWeight={600} color="primary" titulo="Todos os produtos" />}
        </BoxApp>
        {isMobile && <IconButtonTooltipApp onClick={() => setOpen(true)} icon={listaDeIcones.filtro} titulo="Filtros" />}
      </BoxApp>
      <BoxApp display="flex" gap="1rem">
        {!isMobile && <MenuFiltro categorias={categorias} pesos={pesos} tamanhos={tamanhos}
          categoriasIds={categoriasIds} pesosIds={pesosIds} tamanhosIds={tamanhosIds} filtrar={filtrar} />}
        <GridApp container spacing={3}>
          {paginacao.values.map((produto) => (
            <GridApp key={produto.id} xs={12} sm={6} md={6}>
              <CardProdutoV2 produto={produto} mostrarValorUnitario={usuario !== undefined} />
            </GridApp>
          ))}
        </GridApp>
      </BoxApp>
      <BoxApp display="flex" alignItems="center" justifyContent="center" padding="1rem">
        <Pagination count={paginacao.totalPaginas} page={pagina}
          onChange={async (_, value) => await mudarPagina(value)} variant="outlined" shape="rounded" />
      </BoxApp>
    </BoxApp>
  );
}

interface MenuFiltroMobileProps { open: boolean; close: () => void; menuFiltro: ReactNode }

function MenuFiltroMobile(props: MenuFiltroMobileProps) {
  return (
    <Drawer anchor="right" open={props.open} onClose={props.close}>
      <BoxApp padding="1rem" width="calc(100vw - 50px)" display="flex" flexDirection="column" alignItems="end">
        <IconButtonApp icon={listaDeIcones.close} onClick={props.close} />
        {props.menuFiltro}
      </BoxApp>
    </Drawer>
  );
}

interface MenuFiltroProps {
  width?: string; height?: string;
  categorias: ICategoria[]; pesos: IPeso[]; tamanhos: ITamanhos[];
  categoriasIds: string[]; pesosIds: string[]; tamanhosIds: string[];
  filtrar: (id: string, value: boolean, tipoFiltro: TipoFiltro) => Promise<unknown>;
}

function MenuFiltro(props: MenuFiltroProps) {
  return (
    <BoxApp width={props.width ?? "400px"} height={props.height} overflowy="auto">
      {props.categorias.length > 0 && (
        <>
          <TextApp titulo="Categorias" color="primary" />
          {props.categorias.map((categoria) => (
            <CheckBoxApp key={categoria.id} id={categoria.id} label={categoria.descricao}
              value={props.categoriasIds.some((x) => x === categoria.id)}
              onChange={async (value) => await props.filtrar(categoria.id, value, 'categoriasIds')} />
          ))}
        </>
      )}
      {props.tamanhos.length > 0 && (
        <>
          {props.categorias.length > 0 && <DividerApp />}
          <BoxApp marginTop="0.5rem"><TextApp titulo="Tamanhos" color="primary" /></BoxApp>
          {props.tamanhos.map((tamanho) => (
            <CheckBoxApp key={tamanho.id} id={tamanho.id} label={tamanho.descricao}
              value={props.tamanhosIds.some((x) => x === tamanho.id)}
              onChange={async (value) => await props.filtrar(tamanho.id, value, 'tamanhosIds')} />
          ))}
        </>
      )}
      {props.pesos.length > 0 && (
        <>
          {(props.categorias.length > 0 || props.tamanhos.length > 0) && <DividerApp />}
          <BoxApp marginTop="0.5rem"><TextApp titulo="Pesos" color="primary" /></BoxApp>
          {props.pesos.map((peso) => (
            <CheckBoxApp key={peso.id} id={peso.id} label={peso.descricao}
              value={props.pesosIds.some((x) => x === peso.id)}
              onChange={async (value) => await props.filtrar(peso.id, value, 'pesosIds')} />
          ))}
        </>
      )}
    </BoxApp>
  );
}
