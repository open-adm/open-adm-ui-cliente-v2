"use client";

import { IResponseLogin } from "@/types/ResponseLogin";
import { IUsuario } from "@/types/Usuario";
import { ReactNode, createContext, useEffect, useState } from "react";
import { useLocalStorage } from "@/hooks/UseLocalStorage";
import { keysLocalStorage } from "@/config/keysLocalStorage";

interface IAppAuthContext {
  usuario?: IUsuario;
  logar: (responseLogin: IResponseLogin) => void;
  sair: () => void;
}

interface IAppAuthProvider {
  children: ReactNode;
}

export const AppAuthContext = createContext({} as IAppAuthContext);

export function AppAuthProvider(props: IAppAuthProvider) {
  const { getItem, removeItem, setItem } = useLocalStorage();
  const [usuario, setUsuario] = useState<IUsuario | undefined>();

  function logar(responseLogin: IResponseLogin) {
    setItem(keysLocalStorage.jwt, responseLogin.token);
    setItem(keysLocalStorage.refreshJwt, responseLogin.refreshToken);
    setItem(keysLocalStorage.usuario, responseLogin.usuario, true);
    setUsuario(responseLogin.usuario);
  }

  function sair() {
    removeItem(keysLocalStorage.jwt);
    removeItem(keysLocalStorage.refreshJwt);
    removeItem(keysLocalStorage.usuario);
    setUsuario(undefined);
  }

  function init() {
    const usuarioLocalStorage = getItem<IUsuario>(
      keysLocalStorage.usuario,
      true
    );
    if (usuarioLocalStorage) {
      setUsuario(usuarioLocalStorage);
    }
  }

  useEffect(() => {
    init();
  }, []);

  return (
    <AppAuthContext.Provider
      value={{
        logar,
        usuario,
        sair,
      }}
    >
      {props.children}
    </AppAuthContext.Provider>
  );
}
