import { pageProjection } from "./page";
import {
  assetImageProjection,
  blockProjection,
  formEmbedProjection,
  heroProjection,
  logosProjection,
  pathProjection,
  programsProjection,
  promoProjection,
  servicesProjection,
} from "../blocks";
import { bodyBlockProjection } from "../util";

export const homeProjection = `{
    title,
    date,
    "slug": slug.current,
    mainImage,
    body[],
    seo {
      description,
      image,
      "author": author->name,
      authorDisplay
    },
    isArchived,
    isHidden,
    "news": *[_type == "page" && !defined(sortOrder) && isArchived != true && isHidden != true] | order(date desc) ${pageProjection}
  }`;
