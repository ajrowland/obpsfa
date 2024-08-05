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
    slug,
    ${pathProjection()},
    introduction,
    header[] {
      ${bodyBlockProjection("hero", heroProjection)},
      ${bodyBlockProjection("promo", promoProjection)}
    },
    body[] {
      ${bodyBlockProjection("bodyBlock", blockProjection(['"children": blocks'], false))},
      ${bodyBlockProjection("logos", logosProjection)},
      ${bodyBlockProjection("programs", programsProjection)},    
      ${bodyBlockProjection("promo", promoProjection)},
      ${bodyBlockProjection("services", servicesProjection)},
      ${bodyBlockProjection("formEmbed", formEmbedProjection)}
    },
    images {
      ${assetImageProjection("main")},
      ${assetImageProjection("social")}
    },
    meta {
      title,
      description
    }
  }`;
