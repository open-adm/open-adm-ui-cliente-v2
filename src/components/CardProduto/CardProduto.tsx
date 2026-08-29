import { IProduto } from '@/types/Produto';
import { BoxApp } from '../Box/BoxApp';
import { TextApp } from '../Text/TextApp';
import { listaDeIcones } from '@/config/ListaDeIcones';
import { Button } from '../Button/ButtonApp';
import { CardFoto } from './CardFoto';
import { useThemeApp } from '@/hooks/UseThemeApp';
import { CardPesoTamanho } from './CardPesoTamanho';
import { useContext, useState } from 'react';
import { AppCarrinhoContext } from '@/context/AppCarrinhoContext';
import { cleanFormatMoney } from '@/utils/FormatMoney';
import { useSnackbar } from '../SnackBar/UseSnackBar';

interface propsCardProduto {
  produto: IProduto;
  desabilitarBtnAddCarrinho?: boolean;
  onBlur?: (produto: IProduto) => void;
  habilitarExclusaoProduto?: boolean;
  index?: number;
  mostrarValorUnitario: boolean;
}

export function CardProduto(props: propsCardProduto) {
  const [produto, setProduto] = useState(props.produto);
  const { show } = useSnackbar();
  const { adicionarItens, statusAdicionar, excluirProdutoCarrinho, statusExcluirItem } =
    useContext(AppCarrinhoContext);
  const { backgroundColor, borderRadius, isMobile } = useThemeApp();
  const width = isMobile ? '100%' : '50%';

  function onChangePeso(index: number, qtd?: number) {
    if (
      produto.pesos[index] &&
      produto.pesos[index].quantidade &&
      Number(qtd) > produto.pesos[index].quantidade
    ) {
      show(`Quantidade disponível: ${produto.pesos[index].quantidade}.`, 'info');
      return;
    }

    if (produto.pesos[index].precoProduto) {
      const novosPesos = [...produto.pesos];
      novosPesos[index].precoProduto!.quantidade = qtd;
      setProduto({
        ...produto,
        pesos: novosPesos,
      });
    }
  }

  function onChangeTamanho(index: number, qtd?: number) {
    if (
      produto.tamanhos[index] &&
      produto.tamanhos[index].quantidade &&
      Number(qtd) > produto.tamanhos[index].quantidade
    ) {
      show(`Quantidade disponível: ${produto.tamanhos[index].quantidade}.`, 'info');
      return;
    }

    if (produto.tamanhos[index].precoProduto) {
      const novosTamanhos = [...produto.tamanhos];
      novosTamanhos[index].precoProduto!.quantidade = qtd;
      setProduto({
        ...produto,
        tamanhos: novosTamanhos,
      });
    }
  }

  async function adicionar() {
    const tamanhos = produto.tamanhos
      .filter((x) => x.precoProduto?.quantidade)
      .map((x) => {
        return {
          tamanhoId: x.id,
          produtoId: produto.id,
          quantidade: cleanFormatMoney(x.precoProduto?.quantidade) ?? 0,
        };
      });
    const pesos = produto.pesos
      .filter((x) => x.precoProduto?.quantidade)
      .map((x) => {
        return {
          pesoId: x.id,
          produtoId: produto.id,
          quantidade: cleanFormatMoney(x.precoProduto?.quantidade) ?? 0,
        };
      });

    if (tamanhos.length === 0 && pesos.length === 0) {
      return;
    }

    await adicionarItens([...pesos, ...tamanhos]);

    setProduto({
      ...produto,
      pesos: produto.pesos.map((peso) => {
        return {
          ...peso,
          precoProduto: {
            ...peso.precoProduto,
            quantidade: undefined,
          } as any,
        };
      }),
      tamanhos: produto.tamanhos.map((tamanho) => {
        return {
          ...tamanho,
          precoProduto: {
            ...tamanho.precoProduto,
            quantidade: undefined,
          } as any,
        };
      }),
    });
  }

  async function excluir() {
    if (props.index === undefined || props.index === null) {
      return;
    }

    await excluirProdutoCarrinho(props.index);
  }

  function onBlur() {
    if (props.onBlur) {
      props.onBlur(produto);
    }
  }

  return (
    <BoxApp
      display="flex"
      boxShadow="rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;"
      hover={{
        boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px;',
      }}
      borderRadius={borderRadius}
      padding="1rem"
      gap="1rem"
      flexDirection={isMobile ? 'column' : undefined}
    >
      <CardFoto
        width={width}
        borderRadius={borderRadius}
        backgroundColor={backgroundColor.default}
        descricao={produto.descricao}
        foto={produto.foto}
      />
      <BoxApp
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        flexDirection="column"
        width={width}
        height="100%"
      >
        <BoxApp display="flex" alignItems="center" justifyContent="space-between" width="100%">
          <TextApp titulo={produto.descricao} fontSize="18px" fontWeight={600} />
          <TextApp fontSize="12px" fontWeight={600} titulo={`#${produto.referencia ?? ''}`} />
        </BoxApp>
        <form
          style={{ width: '100%' }}
          onSubmit={async (e) => {
            e.preventDefault();
            await adicionar();
          }}
        >
          {produto.pesos?.length > 0 && (
            <BoxApp width="100%" display="flex" flexDirection="column" gap=".5rem">
              <TextApp titulo="Pesos disponíveis" marginBotton="1rem" />
              {produto.pesos.map((peso, index) => (
                <CardPesoTamanho
                  id={peso.id}
                  mostrarValorUnitario={props.mostrarValorUnitario}
                  onChange={(value) => onChangePeso(index, value)}
                  descricao={peso.descricao}
                  key={peso.id}
                  precoProduto={peso.precoProduto}
                  onBlur={onBlur}
                  quantidadeEstoqueDisponivel={peso.quantidade}
                  temEstoqueDisponivel={peso.temEstoqueDisponivel}
                />
              ))}
            </BoxApp>
          )}
          {produto.tamanhos?.length > 0 && (
            <BoxApp width="100%" display="flex" flexDirection="column" gap=".5rem">
              <TextApp fontSize="12px" titulo="Tamanhos disponíveis" marginBotton="1rem" />
              {produto.tamanhos.map((tamanho, index) => (
                <CardPesoTamanho
                  id={tamanho.id}
                  onChange={(value) => onChangeTamanho(index, value)}
                  key={tamanho.id}
                  quantidadeEstoqueDisponivel={tamanho.quantidade}
                  descricao={tamanho.descricao}
                  mostrarValorUnitario={props.mostrarValorUnitario}
                  precoProduto={tamanho.precoProduto}
                  onBlur={onBlur}
                  temEstoqueDisponivel={tamanho.temEstoqueDisponivel}
                />
              ))}
            </BoxApp>
          )}
          <BoxApp width="100%" marginTop="1rem">
            {!props.desabilitarBtnAddCarrinho && (
              <Button
                onClick={adicionar}
                endIcon={listaDeIcones.carrinho}
                title={isMobile ? 'Adicionar' : 'Adicionar ao carrinho'}
                variant="contained"
                width="100%"
                loading={statusAdicionar === 'loading'}
                type="submit"
              />
            )}
            {props.habilitarExclusaoProduto && (
              <Button
                onClick={excluir}
                endIcon={listaDeIcones.lixeira}
                title={'Excluir'}
                variant="outlined"
                width="100%"
                coricon="red"
                loading={statusExcluirItem === 'loading'}
              />
            )}
          </BoxApp>
        </form>
      </BoxApp>
    </BoxApp>
  );
}
