import {
  blockProjection,
  fixtureListProjection,
  tableProjection,
  galleryProjection,
  extendedImageProjection,
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
      ${bodyBlockProjection("extendedImage", extendedImageProjection)},
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
