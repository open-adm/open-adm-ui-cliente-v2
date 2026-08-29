import { BoxApp } from "../Box/BoxApp";
import { TextApp } from "./TextApp";

interface propsTextoDuplo {
  titulo: string;
  texto: string;
}

export function TextoDuplo(props: propsTextoDuplo) {
  return (
    <BoxApp display="flex" gap="1rem" alignItems="center">
      <TextApp fontWeight={600} titulo={props.titulo} />
      <TextApp titulo={props.texto} />
    </BoxApp>
  );
}
