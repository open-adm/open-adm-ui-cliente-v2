"use client";

import { useFormikAdapter } from "@/adapters/FormikAdapter";
import { useLoginApi } from "@/api/UseLoginApi";
import { BoxApp } from "@/components/Box/BoxApp";
import { Button } from "@/components/Button/ButtonApp";
import { InputApp, MaskType } from "@/components/Input/InputApp";
import { TextApp } from "@/components/Text/TextApp";
import { rotas } from "@/config/ConfigRotas";
import { AppAuthContext } from "@/context/AppAuthContext";
import { useAppParceiroContext } from "@/context/AppParceiroContext";
import { useNavigateApp } from "@/hooks/UseNavigateApp";
import { useThemeApp } from "@/hooks/UseThemeApp";
import { clearMaskCpfCnpj } from "@/utils/MaskCpfCnpj";
import { useContext } from "react";
import { initialValues, schemaValidacao } from "./Configuracao";

export function ViewLogin() {
  const { shadow, borderRadius, backgroundColor } = useThemeApp();
  const { navigate } = useNavigateApp();
  const { parceiro } = useAppParceiroContext();
  const { login } = useLoginApi();
  const { logar } = useContext(AppAuthContext);
  const form = useFormikAdapter({
    initialValues: initialValues,
    validationSchema: schemaValidacao,
    onSubmit: submit,
  });

  async function submit() {
    const response = await login.fetch({
      ...form.values,
      cpfCnpj: clearMaskCpfCnpj(form.values.cpfCnpj),
    });
    if (response) {
      logar(response);
      navigate(rotas.home);
      return;
    }
  }

  return (
    <BoxApp
      width="100%"
      minHeight="calc(100vh - 8rem)"
      display="flex"
      alignItems="center"
      justifyContent="center"
      padding="1.5rem"
    >
      <form
        onSubmit={form.onSubmit}
        style={{ width: "100%", maxWidth: "460px" }}
      >
        <BoxApp
          boxShadow={shadow}
          borderRadius={borderRadius}
          backgroundColor={backgroundColor.card}
          padding="clamp(1.5rem, 5vw, 2.5rem)"
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
          gap="1.25rem"
          width="100%"
          textAlign="center"
        >
          <TextApp
            titulo={`Bem vindo a ${parceiro?.nomeFantasia ?? ""}! 👋🏻`}
            fontSize="18px"
            fontWeight={600}
          />
          <TextApp titulo="Por favor, efetue o login com suas credencias e começe as compras !" />
          <BoxApp
            display="flex"
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
            width="100%"
            gap="1rem"
          >
            <InputApp
              fullWidth
              autoFocus
              id="cpfCnpj"
              label="CPF/CNPJ"
              mask={MaskType.CPFCNPJ}
              onChange={form.onChange}
              onBlur={form.onBlur}
              error={form.error("cpfCnpj")}
              helperText={form.helperText("cpfCnpj")}
              value={form.values.cpfCnpj}
              required
            />
            <InputApp
              required
              onChange={form.onChange}
              onBlur={form.onBlur}
              maxLength={20}
              error={form.error("senha")}
              helperText={form.helperText("senha")}
              value={form.values.senha}
              fullWidth
              id="senha"
              label="Senha"
              isPassword
            />
          </BoxApp>
          <BoxApp
            display="flex"
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
            width="100%"
            gap="1rem"
          >
            <Button
              fullWidth
              title="Login"
              loading={login.status === "loading"}
              type="submit"
              variant="contained"
              onClick={form.onSubmit}
            />
            <Button
              title="Esqueceu sua senha?"
              variant="outlined"
              fullWidth
              onClick={() => navigate(rotas.esqueceuSenha)}
            />
            <Button
              onClick={() => navigate(rotas.home)}
              fullWidth
              title="Voltar a tela inicial"
              variant="text"
            />
          </BoxApp>
          <BoxApp
            display="flex"
            alignItems="center"
            justifyContent="center"
            width="100%"
            gap="1rem"
          >
            <TextApp titulo="Ainda não tem conta?" />
            <Button
              title="Clique aqui!"
              onClick={() => navigate(rotas.criarUsuario)}
            />
          </BoxApp>
        </BoxApp>
      </form>
    </BoxApp>
  );
}
