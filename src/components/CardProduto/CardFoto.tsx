import { BoxApp } from "../Box/BoxApp";
import { ImageApp } from "../Image/ImageApp";

interface propsFotoCard {
  backgroundColor: string;
  foto: string;
  descricao: string;
  borderRadius: string;
  width: string;
}

export function CardFoto(props: propsFotoCard) {
  return (
    <BoxApp
      display="flex"
      alignItems="center"
      justifyContent="center"
      width="100%"
      height="220px"
      overflowx="hidden"
      overflowy="hidden"
      position="relative"
      borderRadius={`${props.borderRadius} ${props.borderRadius} 0 0`}
    >
      <ImageApp
        src={props.foto}
        alt={props.descricao}
        height="100%"
        width="100%"
        borderRadius={`${props.borderRadius} ${props.borderRadius} 0 0`}
        objectFit="cover"
        objectPosition="center"
      />
    </BoxApp>
  );
}
