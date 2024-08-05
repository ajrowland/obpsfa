import { promoProjection } from "./promo";

export const servicesProjection = `{
  _type,
  title,
  subtitle,
  items[] ${promoProjection}
}`;
