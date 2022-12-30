export const formatDate = (date) => {
  if (!date) return "";

  let timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  timeZone = timeZone.includes("Unknown") ? "UTC" : timeZone;

  const dateStr = new Intl.DateTimeFormat(window.navigator.language, {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    timeZone,
  }).format(new Date(date));

  return `${dateStr} ${timeZone.includes("UTC") ? "UTC" : ""}`;
};
