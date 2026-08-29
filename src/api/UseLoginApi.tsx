import { useApi } from "@/hooks/UseApi";
import { IRequestLogin } from "@/types/RequestLogin";
import { IResponseLogin } from "@/types/ResponseLogin";

export function useLoginApi() {
  const apiLogin = useApi({
    method: "POST",
    url: "login/usuario-v2",
    naoRenderizarResposta: true,
  });

  async function login(
    body: IRequestLogin
  ): Promise<IResponseLogin | undefined> {
    return await apiLogin.action({ body });
  }

  return {
    login: {
      fetch: login,
      status: apiLogin.status,
    },
  };
}
