export interface ICotarFrete {
    cep: string;
    produtos: IProdutoCotarFrete[]
}

export interface IProdutoCotarFrete {
    produtoId: string,
    pesoId?: string,
    tamanhoId?: string,
    quantidade: number
}

export interface ICotacaoFreteResponse {
    itens: IItemCotacaoFreteResponse[]
}

export interface IItemCotacaoFreteResponse {
    id: number,
    nome: string,
    preco: number,
    faixaDeEntregaMin: number,
    faixaDeEntregaMaxima: number,
    empresa: {
        id: number,
        nome: string,
        logo: string
    }
}