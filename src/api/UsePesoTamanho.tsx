import { useApi } from "@/hooks/UseApi";
import { IPeso } from "@/types/Peso";

export function usePesoApi() {
  const apiListar = useApi({
    method: "GET",
    url: "pesos/list",
  });

  async function listarPesos(): Promise<IPeso[] | undefined> {
    return await apiListar.action();
  }

  return {
    listarPesos: {
      fetch: listarPesos,
      status: apiListar.status,
    },
  };
}
