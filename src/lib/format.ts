export const money = (n: number, currency = "USD") =>
    new Intl.NumberFormat(undefined, { style: "currency", currency }).format(n);

export const bedsBaths = (beds?: number, baths?: number) =>
    `${beds ?? 0} bed${beds === 1 ? "" : "s"} • ${baths ?? 0} bath${baths === 1 ? "" : "s"}`;
