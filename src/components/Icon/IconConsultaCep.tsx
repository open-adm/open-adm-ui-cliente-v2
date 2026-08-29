import { useApiCep } from "@/api/UseApiCep";
import { IEnderecoBase } from "@/types/Base";
import { IconButtonTooltipApp } from "./IconButtonTooltipApp";
import { listaDeIcones } from "@/config/ListaDeIcones";

interface IconConsultaCepProps {
  cep?: string;
  setEndereco: (endereco?: IEnderecoBase) => void;
}

export function IconConsultaCep(props: IconConsultaCepProps) {
  const { consulta } = useApiCep();

  async function consultarCep() {
    if (!props.cep) {
      return;
    }
    const response = await consulta.fetch(props.cep);
    props.setEndereco(response);
  }

  return (
    <IconButtonTooltipApp
      icon={
        consulta.status === "loading"
          ? listaDeIcones.loading
          : listaDeIcones.searchGlobal
      }
      titulo="Consultar cep"
      onClick={consultarCep}
    />
  );
}
