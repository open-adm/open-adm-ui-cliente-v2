import { useApi } from "@/hooks/UseApi";
import { IConsultaCnpjResponse } from "@/types/ConsultaCnpjResponse";

export function useCnpjApi() {
  const apiConsultaCnpj = useApi({
    method: "GET",
    url: "cnpj/consulta?cnpj=",
  });

  async function consultarCnpj(
    cnpj: string
  ): Promise<IConsultaCnpjResponse | undefined> {
    return await apiConsultaCnpj.action({ urlParams: cnpj });
  }

  return {
    consultarCnpj: {
      fetch: consultarCnpj,
      status: apiConsultaCnpj.status,
    },
  };
}
