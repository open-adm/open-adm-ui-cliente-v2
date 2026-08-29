import { listaDeIcones } from "@/config/ListaDeIcones";
import { AppCarrinhoContext } from "@/context/AppCarrinhoContext";
import { useThemeApp } from "@/hooks/UseThemeApp";
import { IProdutoEcommerce } from "@/types/Produto";
import { cleanFormatMoney } from "@/utils/FormatMoney";
import { useContext, useEffect, useState } from "react";
import { BoxApp } from "../Box/BoxApp";
import { Button } from "../Button/ButtonApp";
import { useSnackbar } from "../SnackBar/UseSnackBar";
import { TextApp } from "../Text/TextApp";
import { CardFoto } from "./CardFoto";
import { CardPesoTamanhoV2 } from "./CardPesoTamanhoV2";

interface propsCardProduto {
    produto: IProdutoEcommerce;
    desabilitarBtnAddCarrinho?: boolean;
    onBlur?: (produto: IProdutoEcommerce) => void;
    habilitarExclusaoProduto?: boolean;
    index?: number;
}

export function CardProdutoV2(props: propsCardProduto) {
    const { show } = useSnackbar();
    const [produto, setProduto] = useState(props.produto);
    const {
        adicionarItens,
        statusAdicionar,
        excluirProdutoCarrinho,
        statusExcluirItem,
    } = useContext(AppCarrinhoContext);

    const { backgroundColor, borderRadius, isMobile } = useThemeApp();
    const width = "100%";

    function onChangePeso(index: number, qtd?: number) {
        if (
            produto.pesos[index] &&
            produto.pesos[index].quantidadeEstoqueDisponivel &&
            Number(qtd) > produto.pesos[index].quantidadeEstoqueDisponivel
        ) {
            show(
                `Quantidade disponível: ${produto.pesos[index].quantidadeEstoqueDisponivel}.`,
                "info"
            );
            return;
        }

        if (produto.pesos[index].valorUnitario) {
            const novosPesos = [...produto.pesos];
            novosPesos[index].quantidade = qtd;
            setProduto({
                ...produto,
                pesos: novosPesos,
            });
        }
    }

    function onChangeTamanho(index: number, qtd?: number) {
        if (
            produto.tamanhos[index] &&
            produto.tamanhos[index].quantidadeEstoqueDisponivel &&
            Number(qtd) > produto.tamanhos[index].quantidadeEstoqueDisponivel
        ) {
            show(
                `Quantidade disponível: ${produto.tamanhos[index].quantidadeEstoqueDisponivel}.`,
                "info"
            );
            return;
        }
        if (produto.tamanhos[index].valorUnitario) {
            const novosTamanhos = [...produto.tamanhos];
            novosTamanhos[index].quantidade = qtd;
            setProduto({
                ...produto,
                tamanhos: novosTamanhos,
            });
        }
    }

    async function adicionar() {
        const tamanhos = produto.tamanhos
            .filter((x) => x.quantidade)
            .map((x) => {
                return {
                    tamanhoId: x.id,
                    produtoId: produto.id,
                    quantidade: cleanFormatMoney(x.quantidade) ?? 0,
                };
            });
        const pesos = produto.pesos
            .filter((x) => x.quantidade)
            .map((x) => {
                return {
                    pesoId: x.id,
                    produtoId: produto.id,
                    quantidade: cleanFormatMoney(x.quantidade) ?? 0,
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
                    quantidade: undefined,
                };
            }),
            tamanhos: produto.tamanhos.map((tamanho) => {
                return {
                    ...tamanho,
                    quantidade: undefined,
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

    useEffect(() => {
        const atualizarProduto = () => {
            setProduto(props.produto)
        }

        atualizarProduto();
    }, [props.produto])

    return (
        <BoxApp
            display="flex"
            boxShadow="rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;"
            hover={{
                boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px;",
            }}
            borderRadius={borderRadius}
            //padding="1rem"
            gap="1rem"
            backgroundColor={backgroundColor.card}
            flexDirection={"column"}
        >
            <CardFoto
                width={width}
                borderRadius={borderRadius}
                descricao={produto.descricao}
                foto={produto.foto} backgroundColor={""} />
            <BoxApp
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                flexDirection="column"
                width={width}
                height="100%"
            >
                <BoxApp
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    width="100%"
                    padding="0rem 1rem 0rem 1rem"
                >
                    <TextApp
                        titulo={produto.descricao}
                        fontSize="18px"
                        fontWeight={600}
                    />
                    <TextApp
                        fontSize="12px"
                        fontWeight={600}
                        titulo={`#${produto.referencia ?? ""}`}
                    />
                </BoxApp>
                <form
                    style={{ width: "100%", padding: '1rem' }}
                    onSubmit={async (e) => {
                        e.preventDefault();
                        await adicionar();
                    }}
                >
                    {produto.pesos?.length > 0 && (
                        <BoxApp
                            width="100%"
                            display="flex"
                            flexDirection="column"
                            gap=".5rem"
                        >
                            <TextApp titulo="Pesos disponíveis" marginBotton="1rem" />
                            {produto.pesos.map((peso, index) => (
                                <CardPesoTamanhoV2
                                    id={peso.id}
                                    quantidadeEstoqueDisponivel={peso.quantidadeEstoqueDisponivel}
                                    temEstoqueDisponivel={peso.temEstoqueDisponivel}
                                    onChange={(value) => onChangePeso(index, value)}
                                    descricao={peso.descricao}
                                    key={peso.id}
                                    quantidade={peso.quantidade}
                                    valorUnitario={peso.valorUnitario}
                                    onBlur={onBlur}
                                />
                            ))}
                        </BoxApp>
                    )}
                    {produto.tamanhos?.length > 0 && (
                        <BoxApp
                            width="100%"
                            display="flex"
                            flexDirection="column"
                            gap=".5rem"
                        >
                            <TextApp
                                fontSize="12px"
                                titulo="Tamanhos disponíveis"
                                marginBotton="1rem"
                            />
                            {produto.tamanhos.map((tamanho, index) => (
                                <CardPesoTamanhoV2
                                    id={tamanho.id}
                                    quantidadeEstoqueDisponivel={tamanho.quantidadeEstoqueDisponivel}
                                    temEstoqueDisponivel={tamanho.temEstoqueDisponivel}
                                    onChange={(value) => onChangeTamanho(index, value)}
                                    key={tamanho.id}
                                    descricao={tamanho.descricao}
                                    onBlur={onBlur}
                                    valorUnitario={tamanho.valorUnitario}
                                    quantidade={tamanho.quantidade}
                                />
                            ))}
                        </BoxApp>
                    )}
                    <BoxApp width="100%" marginTop="1rem">
                        {!props.desabilitarBtnAddCarrinho && (
                            <Button
                                onClick={adicionar}
                                endIcon={listaDeIcones.carrinho}
                                title={isMobile ? "Adicionar" : "Adicionar ao carrinho"}
                                variant="contained"
                                width="100%"
                                loading={statusAdicionar === "loading"}
                                type="submit"
                            />
                        )}
                        {props.habilitarExclusaoProduto && (
                            <Button
                                onClick={excluir}
                                endIcon={listaDeIcones.lixeira}
                                title={"Excluir"}
                                variant="outlined"
                                width="100%"
                                coricon="red"
                                loading={statusExcluirItem === "loading"}
                            />
                        )}
                    </BoxApp>
                </form>
            </BoxApp>
        </BoxApp>
    );
}