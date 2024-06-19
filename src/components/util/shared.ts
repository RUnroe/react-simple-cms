export const toTitleCase = (text: string) => {
  if(!text || typeof text !== "string") return text;
  const result = text.replace(/([A-Z])/g, " $1");
  return result.charAt(0).toUpperCase() + result.slice(1);
}