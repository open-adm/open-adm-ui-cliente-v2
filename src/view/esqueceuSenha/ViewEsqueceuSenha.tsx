"use client";

import { useFormikAdapter } from "@/adapters/FormikAdapter";
import { BoxApp } from "@/components/Box/BoxApp";
import { InputApp } from "@/components/Input/InputApp";
import { TextApp } from "@/components/Text/TextApp";
import { rotas } from "@/config/ConfigRotas";
import { useNavigateApp } from "@/hooks/UseNavigateApp";
import { useThemeApp } from "@/hooks/UseThemeApp";
import { useEsqueceuSenhaApi } from "@/api/UseEsqueceuSenhaApi";
import { YupAdapter } from "@/adapters/YupAdapter";
import { Button } from "@/components/Button/ButtonApp";

export function ViewEsqueceuSenha() {
  const { shadow, borderRadius, backgroundColor } = useThemeApp();
  const { navigate } = useNavigateApp();
  const { esqueceSenha } = useEsqueceuSenhaApi();
  const form = useFormikAdapter({
    initialValues: {
      email: "",
    },
    validationSchema: new YupAdapter().email("email").build(),
    onSubmit: submit,
  });

  async function submit() {
    const response = await esqueceSenha.fetch(form.values.email);
    if (response) {
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
          titulo="Esqueceu sua senha? 🔒"
          fontSize="18px"
          fontWeight={600}
        />
        <TextApp titulo="Informe seu e-mail, e receba sua nova senha em seu e-mail!" />
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
            title="Resetar senha"
            loading={esqueceSenha.status === "loading"}
            type="submit"
            variant="contained"
            onClick={form.onSubmit}
          />
          <Button
            onClick={() => navigate(rotas.home)}
            fullWidth
            title="Voltar a tela inicial"
            variant="text"
          />
          <Button
            onClick={() => navigate(rotas.login)}
            fullWidth
            title="Voltar a tela de login"
            variant="text"
          />
        </BoxApp>
        </BoxApp>
      </form>
    </BoxApp>
  );
}
