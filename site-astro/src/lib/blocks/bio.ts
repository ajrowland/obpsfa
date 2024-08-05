import { assetImageProjection } from "./assetImage";
import { blockProjection } from "./blockProjection";

export const bioProjection = `{
  _type,
  title,
  body[] ${blockProjection()},
  ${assetImageProjection("image")}
}`;
