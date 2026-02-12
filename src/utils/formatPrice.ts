export const formatPrice = (amount: string, currencyCode: string) => {
  const value = Number(amount);
  if (Number.isNaN(value)) {
    return amount;
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currencyCode || "USD",
    maximumFractionDigits: 2,
  }).format(value);
};
