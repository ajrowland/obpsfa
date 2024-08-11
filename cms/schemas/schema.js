// We import object and document schemas
import blockContent from "./blockContent";
import category from "./category";
import home from "./home";
import archive from "./archive";
import page from "./page";
import author from "./author";
import fixtureList from "./fixtureList";
import team from "./team";
import season from "./season";
import fixture from "./fixture";
import seo from "./seo";
import extendedImage from "./extendedImage";
import iframe from "./iframe";
import gallery from "./gallery";

export const schemaTypes = [
  // documents
  home,
  archive,
  page,
  author,
  category,
  fixtureList,
  team,
  season,
  fixture,
  // blocks
  blockContent,
  seo,
  extendedImage,
  iframe,
  gallery,
];
