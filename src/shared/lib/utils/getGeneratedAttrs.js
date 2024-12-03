export const getGeneratedAttrs = (attributes = []) => {
  const res = attributes
    .map((attr) => {
      const value =
        typeof attr.value === "object"
          ? JSON.stringify(attr.value)
          : attr.value;
      return `${attr.name}='${value}'`;
    })
    .join(" ");
  return res;
};
