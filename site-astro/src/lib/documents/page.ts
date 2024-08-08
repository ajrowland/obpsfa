import {
  blockProjection,
  fixtureListProjection,
  tableProjection,
  galleryProjection,
} from "../blocks";
import { bodyBlockProjection } from "../util";

export const pageProjection = `{
    title,
    date,
    "slug": slug.current,
    mainImage,
    body[] {
      ${bodyBlockProjection("block", blockProjection())},
      ${bodyBlockProjection("fixtureList", fixtureListProjection)},
      ${bodyBlockProjection("table", tableProjection)},
      ${bodyBlockProjection("gallery", galleryProjection)},
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
