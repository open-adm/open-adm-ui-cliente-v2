"use client";

import { useFormikAdapter } from "@/adapters/FormikAdapter";
import { BoxApp } from "@/components/Box/BoxApp";
import { Button } from "@/components/Button/ButtonApp";
import { GridApp } from "@/components/Grid/GridApp";
import { InputApp } from "@/components/Input/InputApp";
import { ITrocarSenha } from "@/types/TrocarSenha";
import { initialValues, schema } from "./ConfiguracaoTrocarSenha";
import { useClienteApi } from "@/api/UseClienteApi";
import { TextApp } from "@/components/Text/TextApp";
import { useSnackbar } from "@/components/SnackBar/UseSnackBar";
import { useNavigateApp } from "@/hooks/UseNavigateApp";
import { rotas } from "@/config/ConfigRotas";

export function ViewTrocarSenha() {
  const { trocarSenha } = useClienteApi();
  const { show } = useSnackbar();
  const { navigate } = useNavigateApp();
  const form = useFormikAdapter<ITrocarSenha>({
    initialValues: initialValues,
    validationSchema: schema,
    onSubmit: submit,
  });

  async function submit() {
    if (form.values.senha !== form.values.reSenha) {
      show("As senha não conferem", "error");
      return;
    }
    const response = await trocarSenha.fetch(form.values);
    if (response) {
      navigate(rotas.home);
    }
  }

  return (
    <form
      onSubmit={form.onSubmit}
      style={{ width: "100%", maxWidth: "750px", margin: "0 auto" }}
    >
      <BoxApp
        padding="1rem"
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        gap="1rem"
        marginTop="1rem"
        height="calc(100vh - 225px)"
        width="100%"
        boxSizing="border-box"
      >
        <BoxApp>
          <TextApp titulo="Trocar senha 🔒" fontSize="18px" fontWeight={600} />
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
            loading={trocarSenha.status === "loading"}
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
