export function formatDate(inputDate: Date | null) {
  if (inputDate == null) {
    return "";
  }

  return inputDate?.toLocaleDateString("id", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}