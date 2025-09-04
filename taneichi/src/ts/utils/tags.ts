
export const toTagArray = (src: ({ 'works-tag': string } | string)[] | undefined): string[] => {
  if (!Array.isArray(src)) return [];
  return src
    .map((t) => (typeof t === 'string' ? t : t['works-tag']))
    .filter((v): v is string => Boolean(v && v.trim()))
    .map((v) => v.trim());
};
