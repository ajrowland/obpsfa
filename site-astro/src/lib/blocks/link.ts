import { pathProjection } from "./path";

export const linkProjection = `{
  "title": path->title,
  ${pathProjection("path->")},
  href,
  "asset": asset->file.asset->url,
  isNewWindow,
  "id": deepLinkId
}`;
