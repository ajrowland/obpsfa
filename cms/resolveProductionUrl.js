export default function resolveProductionUrl(document) {
  const slug = document.slug ? document.slug.current : "";
  return `https://www.obpsfa.com/${slug}`;
}
