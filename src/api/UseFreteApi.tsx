import { useApi } from "@/hooks/UseApi";
import { ICotacaoFreteResponse, ICotarFrete } from "@/types/Frete";

export function useFreteApi() {
    const apiCotarFrete = useApi({
        method: 'POST',
        url: '/frete/cotar-frete',
        naoRenderizarResposta: true,
    })

    async function cotarFrete(body: ICotarFrete): Promise<ICotacaoFreteResponse | undefined> {
        return await apiCotarFrete.action({ body });
    }

    return {
        cotarFrete: {
            fetch: cotarFrete,
            loading: apiCotarFrete.loading,
        },
    }
}