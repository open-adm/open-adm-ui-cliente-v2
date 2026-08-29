import { IBanner } from "./Banner";
import { ICategoria } from "./Categoria";

export interface IHome {
  categorias: ICategoria[];
  banners: IBanner[];
}
