import { BoxApp } from "@/components/Box/BoxApp";
import { TextApp } from "@/components/Text/TextApp";

interface propsViewTotalizadorCarrinho {
  texto: string;
  titulo: string;
}

export function ViewTotalizadorCarrinho(props: propsViewTotalizadorCarrinho) {
  return (
    <BoxApp
      width="100%"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
    >
      <TextApp fontSize="12px" titulo={props.titulo} />
      <TextApp fontSize="12px" titulo={props.texto} />
    </BoxApp>
  );
}
