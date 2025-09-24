export const money = (n: number) =>
    new Intl.NumberFormat(undefined, { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);

export const bedsBaths = (b: number, ba: number) => `${b} bed • ${ba} bath`;
