import { pageProjection } from "./page";
import { blockProjection, tableProjection } from "../blocks";
import { bodyBlockProjection } from "../util";

export const homeProjection = `{
    title,
    date,
    "slug": slug.current,
    mainImage,
    body[] {
      ${bodyBlockProjection("block", blockProjection())},
      ${bodyBlockProjection("table", tableProjection)},
    },
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
