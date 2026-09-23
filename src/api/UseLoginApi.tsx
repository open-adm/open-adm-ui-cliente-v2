import { useApi } from "@/hooks/UseApi";
import { IRequestLogin } from "@/types/RequestLogin";
import { IResponseLogin } from "@/types/ResponseLogin";

export function useLoginApi() {
  const apiLogin = useApi({
    method: "POST",
    url: "login/usuario-v2",
    naoRenderizarResposta: true,
  });

  const apiLogout = useApi({
    method: "POST",
    url: "login/logout",
    naoRenderizarResposta: true,
  });

  async function login(
    body: IRequestLogin
  ): Promise<IResponseLogin | undefined> {
    return await apiLogin.action({ body });
  }

  async function logout(
  ): Promise<any | undefined> {
    return await apiLogout.action();
  }

  return {
    login: {
      fetch: login,
      status: apiLogin.status,
    },
    logout: {
      fetch: logout
    }
  };
}
