"use client";

import { useFormikAdapter } from "@/adapters/FormikAdapter";
import { useClienteApi } from "@/api/UseClienteApi";
import { BoxApp } from "@/components/Box/BoxApp";
import { Button } from "@/components/Button/ButtonApp";
import { GridApp } from "@/components/Grid/GridApp";
import { InputApp, MaskType } from "@/components/Input/InputApp";
import { LoadingApp } from "@/components/Loading/LoadingApp";
import { rotas } from "@/config/ConfigRotas";
import { useNavigateApp } from "@/hooks/UseNavigateApp";
import { IUsuario } from "@/types/Usuario";
import {
  clearMaskCnpj,
  clearMaskCpf,
  clearMaskPhone,
} from "@/utils/MaskCpfCnpj";
import { useEffect } from "react";
import { initialValues, schemaEdit } from "../Form/Configuracao";

export function EditarViewMinhaConta() {
  const { obterUsuarioLogado, editarUsuario } = useClienteApi();
  const { navigate } = useNavigateApp();
  const form = useFormikAdapter<IUsuario>({
    initialValues: initialValues,
    validationSchema: schemaEdit,
    onSubmit: submit,
  });

  async function init() {
    const response = await obterUsuarioLogado.fecth();
    if (response) {
      form.setValue(response);
    }
  }

  async function submit() {
    const response = await editarUsuario.fetch({
      ...form.values,
      cpf: clearMaskCpf(form.values.cpf),
      cnpj: clearMaskCnpj(form.values.cnpj),
      telefone: clearMaskPhone(form.values.telefone),
    });
    if (response) {
      navigate(rotas.home);
    }
  }

  useEffect(() => {
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (obterUsuarioLogado.status === "loading") {
    return <LoadingApp height="350px" />;
  }

  return (
    <form
      onSubmit={form.onSubmit}
      style={{ padding: "1rem", width: "100%", maxWidth: "750px", margin: "0 auto" }}
    >
      <GridApp container spacing={3}>
        <GridApp xs={12} sm={6}>
          {form.values.cnpj ? (
            <InputApp
              fullWidth
              id="cnpj"
              label={"CNPJ"}
              maxLength={255}
              mask={MaskType.CNPJ}
              onChange={form.onChange}
              onBlur={form.onBlur}
              value={form.values.cnpj}
              error={form.error("cnpj")}
              helperText={form.helperText("cnpj")}
              required
              readonly
            />
          ) : (
            <InputApp
              fullWidth
              id="cpf"
              label={"CPF"}
              maxLength={255}
              mask={MaskType.CPF}
              onChange={form.onChange}
              onBlur={form.onBlur}
              value={form.values.cpf}
              error={form.error("cpf")}
              helperText={form.helperText("cpf")}
              required
              readonly
            />
          )}
        </GridApp>
        <GridApp xs={12} sm={6}>
          <InputApp
            fullWidth
            id="email"
            label="E-mail"
            maxLength={255}
            type="email"
            onChange={form.onChange}
            onBlur={form.onBlur}
            error={form.error("email")}
            helperText={form.helperText("email")}
            value={form.values.email}
            required
          />
        </GridApp>
        <GridApp xs={12} sm={6}>
          <InputApp
            fullWidth
            id="nome"
            label="Nome"
            maxLength={255}
            onChange={form.onChange}
            onBlur={form.onBlur}
            error={form.error("nome")}
            helperText={form.helperText("nome")}
            value={form.values.nome}
            required
          />
        </GridApp>
        <GridApp xs={12} sm={6}>
          <InputApp
            fullWidth
            id="telefone"
            label="Telefone"
            mask={MaskType.TELEFONE}
            onChange={form.onChange}
            onBlur={form.onBlur}
            error={form.error("telefone")}
            helperText={form.helperText("telefone")}
            value={form.values.telefone}
            required
          />
        </GridApp>
      </GridApp>
      <BoxApp display="flex" justifyContent="end" padding="1rem" width="100%">
        <Button
          loading={editarUsuario.status === "loading"}
          type="submit"
          onClick={form.onSubmit}
          variant="contained"
        />
      </BoxApp>
    </form>
  );
}
