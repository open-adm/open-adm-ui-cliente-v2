import { useApi } from "@/hooks/UseApi";
import { ITamanhos } from "@/types/Tamanho";

export function useTamanhoApi() {
  const apiListar = useApi({
    method: "GET",
    url: "tamanhos/list",
  });

  async function listarTamanhos(): Promise<ITamanhos[] | undefined> {
    return await apiListar.action();
  }

  return {
    listarTamanhos: {
      fetch: listarTamanhos,
      status: apiListar.status,
    },
  };
}
