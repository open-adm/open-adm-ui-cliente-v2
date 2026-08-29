"use client";

import { useContext, useState } from "react";
import { BoxApp } from "../Box/BoxApp";
import { MenuApp } from "../Menu/MenuApp";
import styles from "./Header.module.css";
import { useThemeApp } from "@/hooks/UseThemeApp";
import { useNavigateApp } from "@/hooks/UseNavigateApp";
import { MenuUsuarioApp } from "../MenuUsuario/MenuUsuarioApp";
import { rotas } from "@/config/ConfigRotas";
import { Badge, BadgeProps, IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import { IconApp } from "../Icon/IconApp";
import { listaDeIcones } from "@/config/ListaDeIcones";
import { AppCarrinhoContext } from "@/context/AppCarrinhoContext";
import { Button } from "../Button/ButtonApp";
import { AppParceiroContext } from "@/context/AppParceiroContext";

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

export function Header() {
  const { backgroundColor } = useThemeApp();
  const { navigate } = useNavigateApp();
  const { parceiro } = useContext(AppParceiroContext);
  const { quantidadeItensCarrinho } = useContext(AppCarrinhoContext);
  const [open, setOpen] = useState(false);

  function toogleOpen() {
    setOpen((state) => !state);
  }

  return (
    <>
      <MenuApp close={toogleOpen} open={open} />
      <header
        className={styles.headerMain}
        style={{ backgroundColor: backgroundColor.card }}
      >
        <Button title="Menu" onClick={toogleOpen} />
        {parceiro && (
          <Button
            fontSize="1.2rem"
            title={parceiro.nomeFantasia}
            variant="text"
            onClick={() => navigate(rotas.home)}
          />
        )}
        <BoxApp display="flex" alignItems="center">
          <IconButton
            aria-label="cart"
            onClick={() => navigate(rotas.carrinho)}
          >
            <StyledBadge badgeContent={quantidadeItensCarrinho} color="primary">
              <IconApp icon={listaDeIcones.carrinho} />
            </StyledBadge>
          </IconButton>
          <MenuUsuarioApp />
        </BoxApp>
      </header>
    </>
  );
}
