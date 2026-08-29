import { useApi } from "@/hooks/UseApi";

export function useEsqueceuSenhaApi() {
  const apiEsqueceuSenha = useApi({
    method: "PUT",
    url: "usuarios/esqueceu-senha",
  });

  async function esqueceSenha(email: string): Promise<any> {
    return await apiEsqueceuSenha.action({
      body: { email },
      message: "Senha resetada com sucesso, verifique seu e-mail.",
    });
  }

  return {
    esqueceSenha: {
      fetch: esqueceSenha,
      status: apiEsqueceuSenha.status,
    },
  };
}
