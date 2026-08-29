import { YupAdapter } from "@/adapters/YupAdapter";

export const initialValues = {
  senha: "",
  reSenha: "",
};

export const schema = new YupAdapter()
  .string("senha")
  .string("reSenha")
  .build();
