import { useApi } from "@/hooks/UseApi";
import { parceiroRotasApi } from "./rotas/ParceiroRotasApi";
import { IParceiro } from "@/types/Parceiro";

export function useApiParceiro() {
  const apiObter = useApi({
    method: "GET",
    url: parceiroRotasApi.obter,
    naoRenderizarErro: true,
  });

  async function obter(): Promise<IParceiro | undefined> {
    return await apiObter.action();
  }

  return {
    obter: {
      fetch: obter,
    },
  };
}
