export const generateSlug = (s) => {
  return s
    .replace(/\s+/g, "-")
    .replace(/[^a-zA-Z0-9-]/g, "")
    .toLowerCase();
};

export const fmtSize = (b) => {
  if (!b) return "0 B";
  const k = 1024,
    s = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(b) / Math.log(k));
  return Math.round((b / Math.pow(k, i)) * 100) / 100 + " " + s[i];
};

export const flattenSuggest = (suggestConvert) => {
  if (!suggestConvert?.convertTo) return [];
  return Object.values(suggestConvert.convertTo).flat();
};
