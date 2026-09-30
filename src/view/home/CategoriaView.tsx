import { BoxApp } from "@/components/Box/BoxApp";
import { GridApp } from "@/components/Grid/GridApp";
import { ImageApp } from "@/components/Image/ImageApp";
import { TextApp } from "@/components/Text/TextApp";
import { listaDeIcones } from "@/config/ListaDeIcones";
import { useThemeApp } from "@/hooks/UseThemeApp";
import { ICategoria } from "@/types/Categoria";
import styles from "./CategoriaView.module.css";
import { useNavigateApp } from "@/hooks/UseNavigateApp";
import { rotaProdutosPorCategoria } from "@/config/ConfigRotas";
import { Button } from "@/components/Button/ButtonApp";

interface propsCategoriaView {
  categorias: ICategoria[];
}

export function CategoriaView(props: propsCategoriaView) {
  const { backgroundColor, borderRadius } = useThemeApp();
  const { navigate } = useNavigateApp();
  if (props.categorias.length === 0) {
    return <></>;
  }

  return (
    <BoxApp padding="1rem" backgroundColor={backgroundColor.card}>
      {props.categorias.map((categoria) => (
        <BoxApp key={categoria.id}>
          <BoxApp
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            marginBottom="1rem"
            marginTop="1rem"
          >
            <TextApp fontSize="18px" titulo={categoria.descricao} />
            <Button
              title="visualizar"
              endIcon={listaDeIcones.flechaDireita}
              onClick={() => navigate(rotaProdutosPorCategoria(categoria.descricao))}
            />
          </BoxApp>
          <GridApp container spacing={3}>
            {categoria.produtos?.map((produto) => (
              <GridApp key={produto.id} xs={12} sm={4}>
                <BoxApp>
                  <BoxApp
                    borderRadius={borderRadius}
                    padding=".5rem"
                    alignItems="center"
                    justifyContent="center"
                    backgroundColor={backgroundColor.default}
                    width="100%"
                    cursor="pointer"
                    boxShadow="rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;"
                    hover={{
                      boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px;",
                    }}
                    height="auto"
                    overflowx="hidden"
                    overflowy="hidden"
                    position="relative"
                  >
                    <ImageApp
                      className={styles.cardproduto}
                      src={produto.foto}
                      alt={produto.descricao}
                      height={"auto"}
                      width={"100%"}
                      borderRadius="5px"
                      objectFit="cover"
                    />
                  </BoxApp>
                  <BoxApp
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    marginTop="1rem"
                  >
                    <TextApp fontSize="12px" titulo={produto.descricao} />
                    <TextApp
                      fontSize="12px"
                      titulo={`#${produto.referencia ?? ""}`}
                    />
                  </BoxApp>
                </BoxApp>
              </GridApp>
            ))}
          </GridApp>
        </BoxApp>
      ))}
    </BoxApp>
  );
}
