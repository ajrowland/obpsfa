export const assetImageProjection = (key = "image") => {
  return `${key}->{
    _type,
    title,
    "asset": file.asset,
    alt
  }`;
};
