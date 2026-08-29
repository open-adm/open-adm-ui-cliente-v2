import Drawer from "@mui/material/Drawer";
import { BoxApp } from "../Box/BoxApp";
import { listaDeIcones } from "@/config/ListaDeIcones";
import { IconButtonApp } from "../Icon/IconButtonApp";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { IconApp } from "../Icon/IconApp";
import { useNavigateApp } from "@/hooks/UseNavigateApp";
import { rotas } from "@/config/ConfigRotas";

interface propsMenuApp {
  open: boolean;
  close: () => void;
}

export function MenuApp(props: propsMenuApp) {
  const { navigate } = useNavigateApp();

  function navegarMenu(url: string) {
    navigate(url);
    props.close();
  }

  return (
    <Drawer open={props.open} onClose={props.close}>
      <BoxApp width="250px">
        <BoxApp
          display="flex"
          alignItems="center"
          justifyContent="end"
          padding=".5rem"
        >
          <IconButtonApp icon={listaDeIcones.close} onClick={props.close} />
        </BoxApp>
        <BoxApp>
          <List>
            <ListItem disablePadding>
              <ListItemButton onClick={() => navegarMenu(rotas.home)}>
                <ListItemIcon>
                  <IconApp icon={listaDeIcones.home} />
                </ListItemIcon>
                <ListItemText primary="Home" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={() => navegarMenu(rotas.categoria)}>
                <ListItemIcon>
                  <IconApp icon={listaDeIcones.categoria} />
                </ListItemIcon>
                <ListItemText primary="Categorias" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={() => navegarMenu(rotas.produto)}>
                <ListItemIcon>
                  <IconApp icon={listaDeIcones.produto} />
                </ListItemIcon>
                <ListItemText primary="Produtos" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={() => navegarMenu(rotas.lojaParceira)}>
                <ListItemIcon>
                  <IconApp icon={listaDeIcones.lojaParceia} />
                </ListItemIcon>
                <ListItemText primary="Lojas parceiras" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={() => navegarMenu(rotas.minhaConta)}>
                <ListItemIcon>
                  <IconApp icon={listaDeIcones.avatar} />
                </ListItemIcon>
                <ListItemText primary="Minha conta" />
              </ListItemButton>
            </ListItem>
          </List>
        </BoxApp>
      </BoxApp>
    </Drawer>
  );
}