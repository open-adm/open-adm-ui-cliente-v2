import { YupAdapter } from "@/adapters/YupAdapter";
import { IRequestLogin } from "@/types/RequestLogin";

export const schemaValidacao = new YupAdapter()
  .string("cpfCnpj")
  .string("senha")
  .build();

export const initialValues: IRequestLogin = {
  cpfCnpj: "",
  senha: "",
};
