"use client";

import { useFormikAdapter } from "@/adapters/FormikAdapter";
import { YupAdapter } from "@/adapters/YupAdapter";
import { useClienteApi } from "@/api/UseClienteApi";
import { BoxApp } from "@/components/Box/BoxApp";
import { Button } from "@/components/Button/ButtonApp";
import { GridApp } from "@/components/Grid/GridApp";
import { InputApp } from "@/components/Input/InputApp";
import { useSnackbar } from "@/components/SnackBar/UseSnackBar";
import { TextApp } from "@/components/Text/TextApp";
import { rotas } from "@/config/ConfigRotas";
import { AppAuthContext } from "@/context/AppAuthContext";
import { useNavigateApp } from "@/hooks/UseNavigateApp";
import { IRecuperarSenha } from "@/types/RecuperarSenha";
import { useContext } from "react";

export function RecuperarSenhaView() {
  const { navigate, params } = useNavigateApp();
  const { recuperarSenha } = useClienteApi();
  const { logar } = useContext(AppAuthContext);
  const { show } = useSnackbar();

  const form = useFormikAdapter<IRecuperarSenha>({
    initialValues: {
      senha: "",
      reSenha: "",
      tokenEsqueceuSenha: params.id,
    },
    validationSchema: new YupAdapter()
      .string("senha")
      .string("reSenha")
      .build(),
    onSubmit: submit,
  });

  async function submit() {
    if (form.values.senha !== form.values.reSenha) {
      show("As senha não conferem", "error");
      return;
    }
    const response = await recuperarSenha.fetch(form.values);
    if (response) {
      logar(response);
      navigate(rotas.home);
    }
  }
  return (
    <form onSubmit={form.onSubmit}>
      <BoxApp
        padding="1rem"
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        gap="1rem"
        marginTop="1rem"
        height="calc(100vh - 225px)"
        width="calc(100vw - 2rem)"
      >
        <BoxApp>
          <TextApp
            titulo="Recuperar senha 🔒"
            fontSize="18px"
            fontWeight={600}
          />
          <TextApp titulo="Informe uma senha segura!" />
        </BoxApp>
        <GridApp container spacing={3}>
          <GridApp xs={12} sm={6}>
            <InputApp
              autoFocus
              fullWidth
              id="senha"
              label="Senha"
              isPassword
              onChange={form.onChange}
              onBlur={form.onBlur}
              error={form.error("senha")}
              helperText={form.helperText("senha")}
              value={form.values.senha}
              required
            />
          </GridApp>
          <GridApp xs={12} sm={6}>
            <InputApp
              fullWidth
              id="reSenha"
              label="Confirme a senha"
              isPassword
              onChange={form.onChange}
              onBlur={form.onBlur}
              error={form.error("reSenha")}
              helperText={form.helperText("reSenha")}
              value={form.values.reSenha}
              required
            />
          </GridApp>
        </GridApp>
        <BoxApp
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
          width="100%"
          gap="1rem"
        >
          <Button
            loading={recuperarSenha.status === "loading"}
            type="submit"
            width="100%"
            maxWidth="170px"
            variant="contained"
            onClick={form.onSubmit}
          />
        </BoxApp>
      </BoxApp>
    </form>
  );
}
