import { useFormikAdapter } from "@/adapters/FormikAdapter";
import { YupAdapter } from "@/adapters/YupAdapter";
import { useClienteApi } from "@/api/UseClienteApi";
import { AlertApp } from "@/components/Alert/AlertApp";
import { BoxApp } from "@/components/Box/BoxApp";
import { Button } from "@/components/Button/ButtonApp";
import { FormApp } from "@/components/Form/FormApp";
import { FormItemRow } from "@/components/Form/FormItemRow";
import { FormRow } from "@/components/Form/FormRow";
import { IconConsultaCep } from "@/components/Icon/IconConsultaCep";
import { InputApp } from "@/components/Input/InputApp";
import ModalApp from "@/components/Modal/ModalApp";
import { TextApp } from "@/components/Text/TextApp";
import { AppCarrinhoContext } from "@/context/AppCarrinhoContext";
import { useThemeApp } from "@/hooks/UseThemeApp";
import { IEnderecoBase } from "@/types/Base";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { useContext, useState } from "react";

const fontSize = "12px";

export function ViewEnderecoCarrinho() {
  const [open, setOpen] = useState(false);
  const { enderecoUsuario, setEnderecoUsuario } =
    useContext(AppCarrinhoContext);
  const { criarOuAtualizarEndereco } = useClienteApi();
  const { cores, borderRadius } = useThemeApp();

  const form = useFormikAdapter<IEnderecoBase>({
    initialValues: {
      cep: "",
      logradouro: "",
      localidade: "",
      bairro: "",
      numero: "",
      complemento: "",
      uf: "",
    },
    validationSchema: new YupAdapter()
      .string("cep")
      .string("logradouro")
      .string("localidade")
      .string("bairro")
      .string("numero")
      .string("uf")
      .build(),
    onSubmit: submit,
  });

  async function submit() {
    if (!enderecoUsuario) {
      const response = await criarOuAtualizarEndereco.fetch(form.values);
      if (response) {
        setEnderecoUsuario(response);
        fecharModal();
      }
      return;
    }

    setEnderecoUsuario(form.values);
    fecharModal();
  }

  function fecharModal() {
    setOpen(false);
    form.limpar();
  }

  return (
    <>
      <ModalApp fullWidth maxWidth="lg" close={fecharModal} open={open}>
        <FormApp
          loading={criarOuAtualizarEndereco.status === "loading"}
          heigth="100%"
          submit={form.onSubmit}
        >
          <FormRow spacing={3}>
            <FormItemRow sm={3} xs={12}>
              <BoxApp display="flex" alignItems="center">
                <InputApp
                  label="CEP"
                  id="cep"
                  onChange={form.onChange}
                  value={form.values.cep}
                  maxLength={8}
                  fullWidth
                  onBlur={form.onBlur}
                  error={form.error("cep")}
                  helperText={form.helperText("cep")}
                  required
                />
                <IconConsultaCep
                  setEndereco={(endereco) =>
                    form.setValue({
                      ...(endereco ?? {}),
                    })
                  }
                  cep={form.values.cep}
                />
              </BoxApp>
            </FormItemRow>
            <FormItemRow sm={6} xs={12}>
              <InputApp
                label="Rua"
                id="logradouro"
                onChange={form.onChange}
                value={form.values.logradouro}
                maxLength={255}
                fullWidth
                onBlur={form.onBlur}
                error={form.error("logradouro")}
                helperText={form.helperText("logradouro")}
                required
              />
            </FormItemRow>
            <FormItemRow sm={3} xs={12}>
              <InputApp
                label="N°"
                id="numero"
                onChange={form.onChange}
                value={form.values.numero}
                maxLength={10}
                fullWidth
                onBlur={form.onBlur}
                error={form.error("numero")}
                helperText={form.helperText("numero")}
                required
              />
            </FormItemRow>
          </FormRow>
          <FormRow spacing={3}>
            <FormItemRow sm={6} xs={12}>
              <InputApp
                label="Cidade"
                id="localidade"
                onChange={form.onChange}
                value={form.values.localidade}
                maxLength={255}
                fullWidth
                onBlur={form.onBlur}
                error={form.error("localidade")}
                helperText={form.helperText("localidade")}
                required
              />
            </FormItemRow>
            <FormItemRow sm={3} xs={12}>
              <InputApp
                label="Bairro"
                id="bairro"
                onChange={form.onChange}
                value={form.values.bairro}
                maxLength={255}
                fullWidth
                onBlur={form.onBlur}
                error={form.error("bairro")}
                helperText={form.helperText("bairro")}
                required
              />
            </FormItemRow>
            <FormItemRow sm={3} xs={12}>
              <InputApp
                label="UF"
                id="uf"
                onChange={form.onChange}
                value={form.values.uf}
                maxLength={2}
                fullWidth
                onBlur={form.onBlur}
                error={form.error("uf")}
                helperText={form.helperText("uf")}
                required
              />
            </FormItemRow>
          </FormRow>
          <FormRow spacing={3}>
            <FormItemRow sm={12} xs={12}>
              <InputApp
                label="Complemento"
                id="complemento"
                onChange={form.onChange}
                value={form.values.complemento}
                maxLength={255}
                fullWidth
              />
            </FormItemRow>
          </FormRow>
        </FormApp>
      </ModalApp>
      {!enderecoUsuario ? (
        <AlertApp
          tipo="info"
          texto="É necessário cadastrar seu endereço"
          action={() => setOpen(true)}
          textoAction="Aqui"
          sx={{
            marginTop: "1rem",
          }}
        />
      ) : (
        <BoxApp
          border={`1px solid ${cores.divider}`}
          marginTop="1rem"
          padding="1rem"
          borderRadius={borderRadius}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <BoxApp>
            <FormControl>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="female"
                name="radio-buttons-group"
              >
                <FormControlLabel value="female" control={<Radio />} label="" />
              </RadioGroup>
            </FormControl>
          </BoxApp>
          <BoxApp>
            <TextApp
              fontSize={fontSize}
              titulo={`${enderecoUsuario.logradouro} - n° ${enderecoUsuario.numero} - ${enderecoUsuario.cep}`}
            />
            <TextApp
              fontSize={fontSize}
              titulo={`${enderecoUsuario.localidade} - ${enderecoUsuario.bairro} - ${enderecoUsuario.uf}`}
            />
            <TextApp
              fontSize={fontSize}
              titulo={`${enderecoUsuario.complemento ?? ""}`}
            />
          </BoxApp>
          <BoxApp>
            <Button
              title="Trocar"
              variant="outlined"
              onClick={() => setOpen(true)}
            />
          </BoxApp>
        </BoxApp>
      )}
    </>
  );
}
