"use client";

import axios, { GenericAbortSignal } from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { keysLocalStorage } from "@/config/keysLocalStorage";
import { useLocalStorage } from "./UseLocalStorage";
import { useSnackbar } from "@/components/SnackBar/UseSnackBar";
import { useNavigateApp } from "./UseNavigateApp";
import { rotas } from "@/config/ConfigRotas";
import { AppAuthContext } from "@/context/AppAuthContext";
import { StatusRequisicao } from "@/types/StatusRequisicao";

export type TypeMethod = "GET" | "POST" | "PUT" | "DELETE";
interface propsUseApi {
  method: TypeMethod;
  url: string;
  naoRenderizarErro?: boolean;
  naoRenderizarResposta?: boolean;
  header?: any;
  statusInicial?: StatusRequisicao;
}

interface propsFecth {
  body?: any;
  urlParams?: string;
  message?: string;
  signal?: GenericAbortSignal;
}

function getMessage(method: TypeMethod): string {
  switch (method) {
    case "DELETE":
      return "Registro excluido com sucesso!";
    case "PUT":
      return "Registro editado com sucesso!";
    default:
      return "Registro criado com sucesso!";
  }
}

export function useApi(props: propsUseApi) {
  const [status, setStatus] = useState<StatusRequisicao | undefined>(
    props.statusInicial
  );
  const [error, setError] = useState<any>();
  const { sair } = useContext(AppAuthContext);
  const { navigate } = useNavigateApp();
  const URL_API = import.meta.env.VITE_API_URL;
  const snack = useSnackbar();
  const { getItem, setItem } = useLocalStorage();
  const abortControllerRef = useRef<any>(null);

  const api = axios.create({
    baseURL: URL_API,
  });

  useEffect(() => {
    return () => {
      setError(undefined);
      setStatus(undefined);
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  function erro(error: any) {
    const mensagem = error.response?.data?.mensagem;
    if (error.response?.status === 401) {
      if (mensagem) {
        snack.show(mensagem, "error");
      } else {
        snack.show(
          "Ocorreu um erro interno, tente novamente mais tarde!",
          "error"
        );
      }
      sair();
      navigate(rotas.home);
      return;
    }
    if (mensagem) {
      snack.show(mensagem, "error");
      return;
    }
    snack.show("Ocorreu um erro interno, tente novamente mais tarde!", "error");
  }

  async function action<T = unknown>(
    propsFecth?: propsFecth
  ): Promise<T | undefined> {
    try {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      if (!status || status !== "loading") {
        setStatus("loading");
      }
      abortControllerRef.current = new AbortController();
      const { signal } = abortControllerRef.current;
      const jwt = getItem(keysLocalStorage.jwt);
      const refreshJwt = getItem(keysLocalStorage.refreshJwt);
      const meManterLogado = getItem(keysLocalStorage.lembrarCheckBox);
      const headers = {
        Authorization: `Bearer ${jwt ?? ""}`,
        RefreshToken: `${refreshJwt ?? ""}`,
        MeManterLogado: `${meManterLogado ?? ""}`,
        ...(props.header ?? {}),
      };
      const response = await api.request({
        url: propsFecth?.urlParams
          ? `${props.url}${propsFecth?.urlParams}`
          : props.url,
        data: propsFecth?.body,
        method: props.method,
        headers,
        signal,
      });
      const message = propsFecth?.message ?? getMessage(props.method);
      if (message && !props.naoRenderizarResposta && props.method !== "GET") {
        snack.show(message, "success");
      }
      const responseHeader = response.headers as any;
      if (responseHeader["novotoken"]) {
        setItem(keysLocalStorage.jwt, responseHeader["novotoken"]?.toString());
      }
      setStatus("success");
      return response?.data as T;
    } catch (err: any) {
      setError(err);
      setStatus("error");
      if (err?.code === "ERR_CANCELED") {
        return undefined;
      }
      if (!props.naoRenderizarErro) {
        erro(err);
      }
      return undefined;
    }
  }

  return {
    action,
    status,
    error,
    loading: status === "loading",
  };
}
