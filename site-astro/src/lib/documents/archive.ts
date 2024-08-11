import { pageProjection } from "./page";
import { bodyBlockProjection } from "@lib/util";
import { blockProjection } from "@lib/blocks";

export const archiveProjection = `{
    title,
    date,
    "slug": slug.current,
    mainImage,
    body[] {
      ${bodyBlockProjection("block", blockProjection())},
    },
    seo {
      description,
      image,
      "author": author->name,
      authorDisplay
    },
    isArchived,
    isHidden,
    "news": *[_type == "page" && !defined(sortOrder) && isArchived == true && isHidden != true] | order(date desc) ${pageProjection}
  }`;
