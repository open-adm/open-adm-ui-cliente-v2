import {
  Avatar,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import { IconApp } from "../Icon/IconApp";
import { listaDeIcones } from "@/config/ListaDeIcones";
import { useContext, useState } from "react";
import { BoxApp } from "../Box/BoxApp";
import { useNavigateApp } from "@/hooks/UseNavigateApp";
import { rotas } from "@/config/ConfigRotas";
import { AppAuthContext } from "@/context/AppAuthContext";
import { DividerApp } from "../Divider/DividerApp";

export function MenuUsuarioApp() {
  const { sair, usuario } = useContext(AppAuthContext);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { navigate } = useNavigateApp();
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  function sairClick() {
    sair();
    navigate(rotas.home);
    handleClose();
  }

  return (
    <>
      <BoxApp>
        <Tooltip title="Minha conta">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }}>
              {usuario?.nome ? usuario?.nome[0] : ""}
            </Avatar>
          </IconButton>
        </Tooltip>
      </BoxApp>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&::before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {usuario ? (
          [
            <MenuItem
              key="menu-avatar"
              onClick={() => navigate(rotas.minhaConta)}
            >
              <ListItemIcon>
                <IconApp icon={listaDeIcones.avatar} />
              </ListItemIcon>
              Minha conta
            </MenuItem>,
            <MenuItem
              key="menu-editar-conta"
              onClick={() => navigate(rotas.editarMinhaConta)}
            >
              <ListItemIcon>
                <IconApp icon={listaDeIcones.avatar} />
              </ListItemIcon>
              Editar minha conta
            </MenuItem>,
            <DividerApp width="100%" key="primeiro-diviser" />,
            <MenuItem
              key="trocar-senha"
              onClick={() => navigate(rotas.trocarSenha)}
            >
              <ListItemIcon>
                <IconApp icon={listaDeIcones.senha} />
              </ListItemIcon>
              Trocar minha senha
            </MenuItem>,
            <MenuItem key="menu-pedidos" onClick={() => navigate(rotas.pedido)}>
              <ListItemIcon>
                <IconApp icon={listaDeIcones.pedido} />
              </ListItemIcon>
              Meus pedidos
            </MenuItem>,
            <DividerApp width="100%" key="segundo-diviser" />,
            <MenuItem onClick={sairClick} key="menu-sair">
              <ListItemIcon>
                <IconApp icon={listaDeIcones.sair} />
              </ListItemIcon>
              Sair
            </MenuItem>,
          ]
        ) : (
          <MenuItem onClick={() => navigate(rotas.login)}>
            <ListItemIcon>
              <IconApp icon={listaDeIcones.sair} />
            </ListItemIcon>
            Login
          </MenuItem>
        )}
      </Menu>
    </>
  );
}
