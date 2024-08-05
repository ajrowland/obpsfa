import { promoProjection } from "./promo";

export const programsProjection = `{
  _type,
  title,
  subtitle,
  items[] ${promoProjection}
}`;
