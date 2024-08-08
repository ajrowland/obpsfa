export const linkProjection = `{
  "title": path->title,
  href,
  "asset": asset->file.asset->url,
  isNewWindow,
  "id": deepLinkId
}`;
