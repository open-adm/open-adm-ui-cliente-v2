import { formatMoney } from "@/utils/FormatMoney";
import { BoxApp } from "../Box/BoxApp";
import { ChipApp } from "../Chip/ChipApp";
import { DividerApp } from "../Divider/DividerApp";
import { InputApp, MaskType } from "../Input/InputApp";
import { TextApp } from "../Text/TextApp";

interface propsCardPesoTamanho {
    descricao: string;
    id: string;
    valorUnitario?: number;
    quantidade?: number;
    onChange: (qtd?: number) => void;
    onBlur?: () => void;
    temEstoqueDisponivel?: boolean;
    quantidadeEstoqueDisponivel?: number;
    mostrarValorUnitario: boolean;
}

export function CardPesoTamanhoV2(props: propsCardPesoTamanho) {
    const mostrarValorUnitario = props.mostrarValorUnitario && props.valorUnitario;

    const quantidadeEstoqueDisponivel = props.quantidadeEstoqueDisponivel ?? 0;

    return (
        <>

            <BoxApp
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                height="100%"
            >
                <BoxApp display="flex" alignItems="center" gap="1rem" justifyContent="space-between">
                    <TextApp titulo={props.descricao} width="100%" maxWidth="50px" fontWeight={600} />
                    {props.temEstoqueDisponivel ? (
                        <>
                            <InputApp
                                label="QTD"
                                width="100px"
                                mask={MaskType.SOMENTE_NUMERO}
                                id={`${props.id}`}
                                value={props.quantidade}
                                onChange={(_, value) => props.onChange(value)}
                                onBlur={props.onBlur}
                                maxLength={10}
                            />
                        </>
                    ) : <><ChipApp color="error" label="Sem estoque" /></>}
                </BoxApp>
                {mostrarValorUnitario && (
                    <TextApp fontWeight={600} fontSize="16px" color="success" titulo={`${formatMoney(props.valorUnitario)}`} />
                )}
            </BoxApp>
            {quantidadeEstoqueDisponivel > 0 && (
                <BoxApp>
                    <TextApp
                        fontWeight={300}
                        fontSize="12px"
                        titulo={`Qtd disponível: ${quantidadeEstoqueDisponivel}`}
                    />
                </BoxApp>
            )}
            <DividerApp />
        </>
    );
}
