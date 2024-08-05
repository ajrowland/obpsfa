import { linkProjection } from "./link";

export const logosProjection = `{
  _type,
  title,
  subtitle,
  items[]->{
    alt,
    "asset": file.asset,
  },
  link[0] ${linkProjection}
}`;
