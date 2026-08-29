export function maskPhone(value?: string): string | undefined {
    if (!value) return undefined;
    if (value.length > 15) return value;
    if (typeof value != 'string') return '';
    const digits = value.replace(/\D/g, '');
    const match = digits.match(/^(\d{0,2})(\d{0,5})(\d{0,4})$/);
    if (!match) return '';
    return match[1]
      ? `(${match[1]}` +
          (match[2]
            ? `) ${match[2]}` + (match[3] ? `-${match[3]}` : '')
            : '')
      : '';
  }