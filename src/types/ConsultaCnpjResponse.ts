export interface IConsultaCnpjResponse {
  cnpj: string;
  identificador_matriz_filial: 0;
  descricao_identificador_matriz_filial: string;
  nome_fantasia: string;
  situacao_cadastral: 0;
  descricao_situacao_cadastral: string;
  data_situacao_cadastral: string;
  motivo_situacao_cadastral: 0;
  descricao_motivo_situacao_cadastral: string;
  nome_cidade_no_exterior: string;
  codigo_pais: 0;
  pais: string;
  data_inicio_atividade: string;
  cnae_fiscal: 0;
  cnae_fiscal_descricao: string;
  descricao_tipo_de_logradouro: string;
  logradouro: string;
  numero: string;
  complemento: string;
  bairro: string;
  cep: string;
  uf: string;
  codigo_municipio: 0;
  codigo_municipio_ibge: 0;
  municipio: string;
  ddd_telefone_1: string;
  ddd_telefone_2: string;
  ddd_fax: string;
  situacao_especial: string;
  data_situacao_especial: string;
  opcao_pelo_simples: true;
  data_opcao_pelo_simples: string;
  data_exclusao_do_simples: string;
  opcao_pelo_mei: true;
  data_opcao_pelo_mei: string;
  data_exclusao_do_mei: string;
  razao_social: string;
  codigo_natureza_juridica: 0;
  natureza_juridica: string;
  qualificacao_do_responsavel: 0;
  capital_social: 0;
  codigo_porte: 0;
  porte: string;
  ente_federativo_responsavel: string;
  descricao_porte: string;
  qsa: [
    {
      identificador_de_socio: 0;
      nome_socio: string;
      cnpj_cpf_do_socio: string;
      codigo_qualificacao_socio: 0;
      qualificacao_socio: string;
      data_entrada_sociedade: string;
      codigo_pais: 0;
      pais: string;
      cpf_representante_legal: string;
      nome_representante_legal: string;
      codigo_qualificacao_representante_legal: 0;
      qualificacao_representante_legal: string;
      codigo_faixa_etaria: 0;
      faixa_etaria: string;
    }
  ];
  cnaes_secundarios: [
    {
      codigo: 0;
      descricao: string;
    }
  ];
}
