import { listaDeIcones } from "@/config/ListaDeIcones";
import { IPrecoProduto } from "@/types/PrecoProduto";
import { formatMoney } from "@/utils/FormatMoney";
import { Chip } from "@mui/material";
import { BoxApp } from "../Box/BoxApp";
import { ChipApp } from "../Chip/ChipApp";
import { DividerApp } from "../Divider/DividerApp";
import { IconApp } from "../Icon/IconApp";
import { InputApp, MaskType } from "../Input/InputApp";
import { TextApp } from "../Text/TextApp";

interface propsCardPesoTamanho {
  descricao: string;
  id: string;
  precoProduto?: IPrecoProduto;
  onChange: (qtd?: number) => void;
  onBlur?: () => void;
  temEstoqueDisponivel?: boolean;
  mostrarValorUnitario: boolean;
  quantidadeEstoqueDisponivel?: number;
}

export function CardPesoTamanho(props: propsCardPesoTamanho) {
  const mostrarValorUnitario = props.mostrarValorUnitario && props.precoProduto;
  const quantidadeEstoqueDisponivel = props.quantidadeEstoqueDisponivel ?? 0;

  return (
    <>

      <BoxApp
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        height="100%"
      >
        <TextApp titulo={props.descricao} width="100%" maxWidth="50px" />
        {props.temEstoqueDisponivel ? (
          <>
            <InputApp
              label="QTD"
              width="100px"
              mask={MaskType.SOMENTE_NUMERO}
              id={`${props.id}`}
              value={props.precoProduto?.quantidade}
              onChange={(_, value) => props.onChange(value)}
              onBlur={props.onBlur}
              maxLength={10}
            />
          </>
        ) : <><ChipApp color="error" label="Sem estoque" /></>}
        {mostrarValorUnitario && (
          <Chip
            sx={{
              marginTop: ".3rem",
              width: "100px",
            }}
            size="small"
            icon={<IconApp icon={listaDeIcones.etiqueta} />}
            label={formatMoney(props.precoProduto?.valorUnitario) ?? ""}
          />
        )}
      </BoxApp>
      {quantidadeEstoqueDisponivel > 0 && (
        <BoxApp>
          <TextApp fontWeight={300} fontSize="12px" titulo={`Qtd disponível: ${quantidadeEstoqueDisponivel}`} />
        </BoxApp>
      )}
      <DividerApp />
    </>
  );
}
