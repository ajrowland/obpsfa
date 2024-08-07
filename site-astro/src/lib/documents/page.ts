import {
  assetImageProjection,
  blockProjection,
  formEmbedProjection,
  heroProjection,
  logosProjection,
  programsProjection,
  promoProjection,
  servicesProjection,
  fixtureListProjection,
} from "../blocks";
import { bodyBlockProjection } from "../util";

export const pageProjection = `{
    title,
    date,
    "slug": slug.current,
    mainImage,
    body[] {
      ...,
      ${bodyBlockProjection("fixtureList", fixtureListProjection)}
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
