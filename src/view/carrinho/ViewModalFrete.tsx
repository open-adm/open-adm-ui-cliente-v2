import { useState } from "react";
import { LoadingApp } from "@/components/Loading/LoadingApp";
import { RadioApp } from "@/components/Radio/RadioApp";
import { ModalChildren } from "@/components/Modal/ModalChildren";
import { BoxApp } from "@/components/Box/BoxApp";
import { TextApp } from "@/components/Text/TextApp";
import { Button } from "@/components/Button/ButtonApp";
import { ImageApp } from "@/components/Image/ImageApp";
import { useThemeApp } from "@/hooks/UseThemeApp";
import { ICotacaoFreteResponse, IItemCotacaoFreteResponse } from "@/types/Frete";
import { formatMoney } from "@/utils/FormatMoney";

interface ViewModalFreteProps {
    open: boolean;
    close: () => void;
    loading: boolean;
    cotacao?: ICotacaoFreteResponse;
    onSelectFrete?: (frete: IItemCotacaoFreteResponse) => void;
    submit: (freteId: number) => Promise<any>;
}

export function ViewModalFrete(props: ViewModalFreteProps) {
    const itens = props.cotacao?.itens || [];

    const [selectedId, setSelectedId] = useState<number | null>(null);
    const { cores, backgroundColor, borderRadius } = useThemeApp();

    const handleSelectFrete = (frete: IItemCotacaoFreteResponse) => {
        setSelectedId(frete.id);
        if (props.onSelectFrete) {
            props.onSelectFrete(frete);
        }
    };

    const semFretes = !props.loading && itens.length === 0;
    const comFretes = !props.loading && itens.length > 0;

    return (
        <ModalChildren retirarFooter fullWidth maxWidth="sm" open={props.open} close={props.close}>
            <BoxApp display="flex" flexDirection="column" gap="1.5rem" padding="1.5rem">
                <BoxApp display="flex" flexDirection="column" gap="0.5rem">
                    <TextApp
                        titulo="Selecione a opção de frete"
                        fontSize="1.25rem"
                        fontWeight={600}
                    />
                    <TextApp
                        titulo="Escolha a transportadora e o prazo que melhor se adequa"
                        fontSize="0.875rem"
                        color={cores.text.secondary}
                    />
                </BoxApp>

                {props.loading && (
                    <BoxApp display="flex" justifyContent="center" alignItems="center" height="200px">
                        <LoadingApp />
                    </BoxApp>
                )}

                {comFretes && (
                    <BoxApp display="flex" flexDirection="column" gap="1rem">
                        {itens.map((frete) => (
                            <BoxApp
                                key={frete.id}
                                padding="1rem"
                                borderRadius={borderRadius}
                                border={selectedId === frete.id ? `2px solid ${cores.primary.main}` : `1px solid ${cores.divider}`}
                                backgroundColor={selectedId === frete.id ? `${cores.primary.main}15` : backgroundColor.card}
                                display="flex"
                                gap="1rem"
                                alignItems="start"
                                cursor="pointer"
                                onClick={() => handleSelectFrete(frete)}
                                transition="all 0.3s ease"
                                hover={{
                                    borderColor: cores.primary.main,
                                    backgroundColor: `${cores.primary.main}10`,
                                    boxShadow: `0 2px 8px ${cores.primary.main}20`,
                                }}
                            >
                                <BoxApp
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="center"
                                    width="4rem"
                                    height="4rem"
                                    borderRadius={borderRadius}
                                    backgroundColor="#f5f5f5"
                                >
                                    <ImageApp
                                        src={frete.empresa.logo}
                                        alt={frete.empresa.nome}
                                        width="100%"
                                        height="100%"
                                        borderRadius={borderRadius}
                                        objectFit="contain"
                                    />
                                </BoxApp>
                                <BoxApp
                                    display="flex"
                                    flexDirection="column"
                                    gap="0.5rem"
                                    width="100%"
                                >
                                    <TextApp
                                        titulo={frete.empresa.nome}
                                        fontSize="0.875rem"
                                        fontWeight={500}
                                        color={cores.text.secondary}
                                    />
                                    <TextApp
                                        titulo={frete.nome}
                                        fontSize="1rem"
                                        fontWeight={600}
                                        color={cores.text.primary}
                                    />

                                    {/* Prazo de Entrega */}
                                    <BoxApp display="flex" gap="0.25rem" alignItems="center">
                                        <TextApp
                                            titulo={`📦 ${frete.faixaDeEntregaMin} a ${frete.faixaDeEntregaMaxima} dias úteis`}
                                            fontSize="0.875rem"
                                            color={cores.text.secondary}
                                        />
                                    </BoxApp>
                                </BoxApp>

                                {/* Preço */}
                                <BoxApp
                                    display="flex"
                                    flexDirection="column"
                                    alignItems="end"
                                    gap="0.5rem"
                                    justifyContent="center"
                                >
                                    <TextApp
                                        titulo={formatMoney(frete.preco)}
                                        fontSize="1.25rem"
                                        fontWeight={700}
                                        color={cores.primary.main}
                                    />
                                    <RadioApp
                                        checked={selectedId === frete.id}
                                        size="small"
                                        sx={{ padding: 0 }}
                                    />
                                </BoxApp>
                            </BoxApp>
                        ))}
                    </BoxApp>
                )}

                {semFretes && (
                    <BoxApp
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        justifyContent="center"
                        gap="1rem"
                        padding="2rem"
                        textAlign="center"
                    >
                        <TextApp
                            titulo="Nenhuma opção de frete disponível"
                            fontSize="1rem"
                            fontWeight={500}
                        />
                        <TextApp
                            titulo="Verifique o CEP informado ou tente novamente"
                            fontSize="0.875rem"
                            color={cores.text.secondary}
                        />
                    </BoxApp>
                )}

                <BoxApp display="flex" gap="1rem" justifyContent="end">
                    <Button
                        title="Cancelar"
                        variant="outlined"
                        onClick={props.close}
                    />
                    <Button
                        title="Confirmar"
                        variant="contained"
                        disabled={selectedId === null}
                        onClick={async () => {
                            if (selectedId === null) {
                                return;
                            }
                            await props.submit(selectedId)
                        }}
                    />
                </BoxApp>
            </BoxApp>
        </ModalChildren>
    );
}