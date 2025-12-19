export const dateFormatter = (originalDate: Date) => {
  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(originalDate);
};
