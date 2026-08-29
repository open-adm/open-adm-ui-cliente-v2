export function clearMaskCnpj(cnpj?: string): string | undefined {
  if (!cnpj) return "";

  return cnpj
    .replaceAll(".", "")
    .replaceAll("-", "")
    .replaceAll("/", "")
    .replaceAll(" ", "");
}

export function clearMaskCpf(cpf?: string): string | undefined {
  if (!cpf) return "";

  return cpf.replaceAll(".", "").replaceAll("-", "").replaceAll(" ", "");
}

export function clearMaskCpfCnpj(value?: string): string | undefined {
  if (!value) return "";

  return clearMaskCpf(clearMaskCnpj(value));
}

export function clearMaskPhone(telefone?: string): string | undefined {
  if (!telefone) return undefined;

  return telefone
    .replaceAll("(", "")
    .replaceAll(")", "")
    .replaceAll("-", "")
    .replaceAll(" ", "");
}

export function limparTodasMascaras(value?: any) {
  return clearMaskPhone(clearMaskCep(clearMaskCpfCnpj(value)));
}

export function maskCep(cep?: string): string {
  if (!cep) return "";
  if (cep.length > 8) return cep.slice(0, 9);
  return cep.replace(/\D+/g, "").replace(/(\d{5})(\d)/, "$1-$2");
}

export function clearMaskCep(cep?: string): string | undefined {
  if (!cep) return undefined;
  return cep.replaceAll("-", "");
}

export function maskCNPJ(cnpj?: string): string {
  if (!cnpj) return "";

  return cnpj
    .replace(/\D+/g, "")
    .replace(/(\d{2})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1/$2")
    .replace(/(\d{4})(\d)/, "$1-$2")
    .replace(/(-\d{2})\d+?$/, "$1");
}

export function maskCpfCnpj(cpfCnpj?: string): string {
  if (!cpfCnpj) return "";

  if (clearMaskCpfCnpj(cpfCnpj ?? "")!.length > 11) return maskCNPJ(cpfCnpj);

  return maskCPF(cpfCnpj);
}

export function maskCPF(cpf?: string): string {
  if (!cpf) return "";

  return cpf
    .replace(/\D/g, "")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})/, "$1-$2")
    .replace(/(-\d{2})\d+?$/, "$1");
}

export function somenteNumero(value?: string | number): string | undefined {
  if (!value) return undefined;
  if (typeof value != "string") {
    return value?.toString().replace(/\D/g, "");
  }
  return value.replace(/\D/g, "");
}
