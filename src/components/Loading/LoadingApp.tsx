import { FadeLoader } from "react-spinners";
import { BoxApp } from "../Box/BoxApp";
import { TextApp } from "../Text/TextApp";
import { flexDirection } from "../Box/types";

interface propsLoadingApp {
  marginTop?: string;
  height?: string;
  width?: string;
  texto?: string;
  flexDirection?: flexDirection;
}

export function LoadingApp(props: propsLoadingApp) {
  return (
    <BoxApp
      width={props.width ?? "100%"}
      height={props.height ?? "100%"}
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection={props.flexDirection ?? "column"}
      gap="1rem"
      marginTop={props.marginTop}
    >
      <FadeLoader />
      <TextApp titulo={props.texto ?? "Carregando..."} />
    </BoxApp>
  );
}
