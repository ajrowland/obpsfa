export default function resolveProductionUrl(document) {
  const slug = document.slug ? document.slug.current : ''
  return `https://obpsfa.andrewrowland.com/${slug}`
}
