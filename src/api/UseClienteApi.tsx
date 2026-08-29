import { useApi } from "@/hooks/UseApi";
import { IEnderecoBase } from "@/types/Base";
import { IRecuperarSenha } from "@/types/RecuperarSenha";
import { IResponseLogin } from "@/types/ResponseLogin";
import { ITrocarSenha } from "@/types/TrocarSenha";
import { IUsuario, IUsuarioCreate } from "@/types/Usuario";

export function useClienteApi() {
  const apiCreate = useApi({
    method: "POST",
    url: "usuarios/create-inativo",
  });

  const apiRecuperarSenha = useApi({
    method: "PUT",
    url: "usuarios/recuperar-senha",
  });

  const apiEndereco = useApi({
    method: "POST",
    url: "usuario/endereco/criar-ou-atualizar",
  });

  const apiTrocarSenha = useApi({
    method: "PUT",
    url: "usuarios/update-senha",
  });

  const apiEdit = useApi({
    method: "PUT",
    url: "usuarios/update",
  });

  const apiConta = useApi({
    method: "GET",
    url: "usuarios/get-conta",
    statusInicial: "loading",
  });

  async function criarUsuario(
    body: IUsuarioCreate
  ): Promise<IResponseLogin | undefined> {
    return await apiCreate.action({ body });
  }

  async function obterUsuarioLogado(): Promise<IUsuario | undefined> {
    return await apiConta.action();
  }

  async function editarUsuario(body: Partial<IUsuario>): Promise<any> {
    return await apiEdit.action({
      body,
      message: "Conta editada com sucesso!",
    });
  }

  async function trocarSenha(body: ITrocarSenha): Promise<any> {
    return await apiTrocarSenha.action({
      body,
      message: "Senha editada com sucesso!",
    });
  }

  async function criarOuAtualizarEndereco(
    body: IEnderecoBase
  ): Promise<IEnderecoBase | undefined> {
    return await apiEndereco.action({
      body,
      message: "Endereço atualizado com sucesso",
    });
  }

  async function recuperarSenha(
    body: IRecuperarSenha
  ): Promise<IResponseLogin | undefined> {
    return await apiRecuperarSenha.action({
      body,
      message: "Senha recuperada com sucesso!",
    });
  }

  return {
    criarUsuario: {
      fetch: criarUsuario,
      status: apiCreate.status,
    },
    obterUsuarioLogado: {
      fecth: obterUsuarioLogado,
      status: apiConta.status,
    },
    editarUsuario: {
      fetch: editarUsuario,
      status: apiEdit.status,
    },
    trocarSenha: {
      fetch: trocarSenha,
      status: apiTrocarSenha.status,
    },
    criarOuAtualizarEndereco: {
      fetch: criarOuAtualizarEndereco,
      status: apiEndereco.status,
    },
    recuperarSenha: {
      fetch: recuperarSenha,
      status: apiRecuperarSenha.status,
    },
  };
}
