export function formatMoney(
  value: string | number | undefined,
  currency?: string
): string {
  if (!value) {
    return `${currency ?? "R$"} 0,00`;
  }
  const [newValue, isNegative] = typeof value === "number"
    ? [value.toFixed(2), value < 0]
    : [value.trim(), value.includes("-")];
  const cleanValue = String(newValue).replace(/[^0-9]/g, "");
  const paddedValue = cleanValue.padStart(3, "0");
  const reais = paddedValue.slice(0, -2);
  const centavos = paddedValue.slice(-2);
  const formattedReais = Number(reais).toLocaleString("pt-BR");
  if (isNegative) return `${currency ?? "R$"} -${formattedReais},${centavos}`;
  return `${currency ?? "R$"} ${formattedReais},${centavos}`;
}

export function cleanFormatMoney(value?: string | number): number | undefined {
  if (!value) return undefined;
  if (value === "") return 0;
  if (typeof value === "number") return value;
  value = value.replace(/[^0-9.,]/g, "");
  if (!value.includes(",")) return parseFloat(value);
  const splited = value.trim().split(",");
  return parseFloat(`${splited[0].replaceAll(".", "")}.${splited[1]}`);
}

export function formatDuasCasasDecimais(valor: number): string {
  const novoValor = valor.toString().replace(".", ",").split(",");
  if (novoValor.length > 1) {
    return `${novoValor[0]},${novoValor[1].substring(0, 2)}`;
  }
  return `${novoValor[0]}`;
}
