import { YupAdapter } from "@/adapters/YupAdapter";
import { IUsuarioCreate } from "@/types/Usuario";

export const initialValues: IUsuarioCreate = {
  nome: "",
  email: "",
  telefone: "",
  cpf: "",
  senha: "",
  reSenha: "",
  validouCnpj: false,
};

export const schema = new YupAdapter()
  .email("email")
  .string("telefone")
  .string("nome")
  .string("cpf")
  .string("senha")
  .string("reSenha")
  .build();

export const schemaEdit = new YupAdapter()
  .email("email")
  .string("telefone")
  .string("nome")
  .string("cpf")
  .build();

export const tiposPessoa = [
  {
    id: 1,
    descricao: "Pessoa Jurídica",
  },
  {
    id: 2,
    descricao: "Pessoa Física",
  },
];
