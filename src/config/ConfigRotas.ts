export const rotas = {
  home: "/",
  cadastroRealizado: "/cadastro-realizado",
  produto: "/produto",
  lojaParceira: "/loja-parceira",
  categoria: "/categoria",
  carrinho: "/carrinho",
  login: "/login",
  minhaConta: "/minha-conta",
  editarMinhaConta: "/minha-conta/editar",
  trocarSenha: "/trocar-senha",
  pedido: "/pedido",
  esqueceuSenha: "/esqueceu-senha",
  criarUsuario: "/usuario/criar",
  pedidoFinalizado: "/pedido/finalizado",
};

export function rotaProdutosPorCategoria(categoria: string) {
  return `${rotas.produto}/${encodeURIComponent(categoria)}`;
}
