import { promoProjection } from "./promo";

export const heroProjection = `{
  ...promo ${promoProjection},
  subtitle,
  _type
}`;
