"use client";

import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { IParceiro } from "@/types/Parceiro";
import { useApiParceiro } from "@/api/UseParceiroApi";

interface IAppParceiroContext {
  parceiro?: IParceiro;
}

interface IAppParceiroProvider {
  children: ReactNode;
}

export const AppParceiroContext = createContext({} as IAppParceiroContext);

export function AppParceiroProvider(props: IAppParceiroProvider) {
  const { obter } = useApiParceiro();
  const [parceiro, setParceiro] = useState<IParceiro | undefined>();

  async function init() {
    const response = await obter.fetch();
    if (response) {
      if(document){
        document.title = response.nomeFantasia;

        if (response.logo) {
          let favicon = document.querySelector<HTMLLinkElement>("link[rel='icon']");
          if (!favicon) {
            favicon = document.createElement("link");
            favicon.rel = "icon";
            document.head.appendChild(favicon);
          }
          favicon.href = `data:image/png;base64,${response.logo}`;
        }
      }
      setParceiro(response);
    }
  }

  useEffect(() => {
    init();
  }, []);

  return (
    <AppParceiroContext.Provider
      value={{
        parceiro,
      }}
    >
      {props.children}
    </AppParceiroContext.Provider>
  );
}

export function useAppParceiroContext() {
  const context = useContext(AppParceiroContext);
  return context;
}
