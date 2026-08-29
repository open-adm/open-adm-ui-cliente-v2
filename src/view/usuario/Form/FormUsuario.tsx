"use client";

import { useFormikAdapter } from "@/adapters/FormikAdapter";
import { BoxApp } from "@/components/Box/BoxApp";
import { Button } from "@/components/Button/ButtonApp";
import { rotas } from "@/config/ConfigRotas";
import { useNavigateApp } from "@/hooks/UseNavigateApp";
import { IUsuarioCreate } from "@/types/Usuario";
import { useState } from "react";
import { initialValues, schema, tiposPessoa } from "./Configuracao";
import { InputApp, MaskType } from "@/components/Input/InputApp";
import { TextApp } from "@/components/Text/TextApp";
import SelectApp from "@/components/Select/SelectApp";
import { GridApp } from "@/components/Grid/GridApp";
import { clearMaskCpfCnpj, clearMaskPhone } from "@/utils/MaskCpfCnpj";
import { useClienteApi } from "@/api/UseClienteApi";
import { useSnackbar } from "@/components/SnackBar/UseSnackBar";
import { useCnpjApi } from "@/api/UseCnpjApi";

export function FormUsuario() {
  const [tipoPessoa, setTipoPessoa] = useState(1);
  const { criarUsuario } = useClienteApi();
  const { navigate } = useNavigateApp();
  const { consultarCnpj } = useCnpjApi();
  const { show } = useSnackbar();
  const isJuridico = tipoPessoa === 1;
  const form = useFormikAdapter<IUsuarioCreate>({
    initialValues: initialValues,
    validationSchema: schema,
    onSubmit: submit,
  });

  async function submit() {
    if (!form.values.validouCnpj && tipoPessoa === 1) {
      show("É necessário validar seu CNPJ", "error");
      return;
    }

    const body = {
      ...form.values,
      telefone: clearMaskPhone(form.values.telefone),
      cpf: clearMaskCpfCnpj(form.values.cpf),
      cnpj: clearMaskCpfCnpj(form.values.cpf),
      tipoPessoa,
    };
    const response = await criarUsuario.fetch(body as any);

    if (response) {
      navigate(rotas.cadastroRealizado);
      return;
    }
  }

  async function validarCnpj() {
    if (!form.values.cpf) {
      show("Informe se CNPJ", "error");
      return;
    }

    const cnpj = clearMaskCpfCnpj(form.values.cpf) ?? "";

    if (!cnpj) {
      return;
    }

    const response = await consultarCnpj.fetch(cnpj);
    if (!response) {
      return;
    }

    if (response.descricao_situacao_cadastral !== "ATIVA") {
      show("CNPJ inativo!", "error");
      return;
    }

    if (!response.cnae_fiscal_descricao?.toLowerCase().includes("pesca")) {
      const cnaesSecundarios = response.cnaes_secundarios.find((x) =>
        x.descricao.toLowerCase().includes("pesca")
      );
      if (!cnaesSecundarios) {
        show("CNPJ inválido!", "error");
        return;
      }
    }

    show("CNPJ validado com sucesso!", "success");
    form.setValue({
      validouCnpj: true,
      nome: response.nome_fantasia,
    });
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
        height="calc(100vh - 30px)"
        width="calc(100vw - 2rem)"
        overflowy="auto"
      >
        <TextApp
          titulo="Cadastre-se agora 🚀"
          fontSize="18px"
          fontWeight={600}
        />
        <TextApp titulo="Faça suas compras fácil e rápido!" />
        <BoxApp
          display="flex"
          alignItems="center"
          justifyContent="center"
          gap="1rem"
        >
          <SelectApp
            keyDescricao="descricao"
            keyValue="id"
            value={tipoPessoa}
            onChange={(value) => setTipoPessoa(value)}
            label="Tipo pessoa"
            id="tipoPessoa"
            opcoes={tiposPessoa}
          />
          {isJuridico && (
            <Button
              variant="contained"
              title="validar CNPJ"
              onClick={validarCnpj}
              loading={consultarCnpj.status === "loading"}
            />
          )}
        </BoxApp>
        <GridApp container spacing={3}>
          <GridApp xs={12} sm={6}>
            <InputApp
              fullWidth
              id="cpf"
              label={isJuridico ? "CNPJ" : "CPF"}
              maxLength={255}
              mask={isJuridico ? MaskType.CNPJ : MaskType.CPF}
              onChange={form.onChange}
              onBlur={form.onBlur}
              value={form.values.cpf}
              error={form.error("cpf")}
              helperText={form.helperText("cpf")}
              required
            />
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
          <GridApp xs={12} sm={6}>
            <InputApp
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
          maxWidth="170px"
        >
          <Button
            loading={criarUsuario.status === "loading"}
            type="submit"
            width="100%"
            variant="contained"
            onClick={form.onSubmit}
          />
          <Button
            onClick={() => navigate(rotas.home)}
            title="Voltar a tela inicial"
            variant="text"
          />
          <Button
            onClick={() => navigate(rotas.login)}
            title="Voltar a tela de login"
            variant="text"
          />
        </BoxApp>
      </BoxApp>
    </form>
  );
}
