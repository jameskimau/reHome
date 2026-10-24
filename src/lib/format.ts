const priceFormatter = new Intl.NumberFormat("en-AU", {
  style: "currency",
  currency: "AUD",
  maximumFractionDigits: 0,
});

export function formatPrice(amount: number): string {
  return priceFormatter.format(amount);
}

/** "+61412345678" → "0412 345 678", "+61298765432" → "(02) 9876 5432" */
export function formatPhone(e164: string): string {
  const national = e164.replace(/^\+61/, "0");

  if (national.startsWith("04")) {
    return national.replace(/^(\d{4})(\d{3})(\d{3})$/, "$1 $2 $3");
  }
  return national.replace(/^(\d{2})(\d{4})(\d{4})$/, "($1) $2 $3");
}

export function toTelHref(e164: string): string {
  return `tel:${e164}`;
}
