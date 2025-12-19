export const dateFormatter = (
  originalDate: Date,
  yearStyle?: "numeric" | "2-digit",
) => {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "numeric",
    month: "short",
    year: yearStyle,
  }).format(originalDate);
};
