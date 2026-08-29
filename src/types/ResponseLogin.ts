import { IUsuario } from "./Usuario";

export interface IResponseLogin {
  usuario: IUsuario;
  token: string;
  refreshToken: string;
}
