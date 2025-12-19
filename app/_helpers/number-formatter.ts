export const numberFormatter = (unformattedNumber: number) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "decimal",
  }).format(unformattedNumber);
};
