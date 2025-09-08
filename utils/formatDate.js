export function formatDate(dateString) {
  if (!dateString) return "";

  const date = new Date(dateString);

  return date.toLocaleString("en-US", {
    weekday: "short",   // e.g. Mon
    year: "numeric",    // e.g. 2025
    month: "short",     // e.g. Aug
    day: "numeric",     // e.g. 20
    hour: "2-digit",    // e.g. 09
    minute: "2-digit",  // e.g. 35
  });
}