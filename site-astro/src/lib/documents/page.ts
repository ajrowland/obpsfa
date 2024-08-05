import {
  assetImageProjection,
  blockProjection,
  formEmbedProjection,
  heroProjection,
  logosProjection,
  programsProjection,
  promoProjection,
  servicesProjection,
} from "../blocks";
import { bodyBlockProjection } from "../util";

export const pageProjection = `{
    title,
    date,
    "slug": slug.current,
    mainImage,
    body[] {
      ${bodyBlockProjection("bodyBlock", blockProjection(['"children": blocks'], false))},
    },
    seo {
      description,
      image,
      "author": author->name,
      authorDisplay
    },
    isArchived,
    isHidden,
  }`;
