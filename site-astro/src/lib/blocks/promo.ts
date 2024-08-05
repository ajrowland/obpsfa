import { assetImageProjection } from "./assetImage";
import { linkProjection } from "./link";

export const promoProjection = `{
  _type,
  title,
  intro,
  ${assetImageProjection("image")},
  link[0] ${linkProjection}
}`;
