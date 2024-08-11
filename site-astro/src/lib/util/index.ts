import path from "node:path";
import { sanityClient } from "sanity:client";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityAsset } from "@sanity/image-url/lib/types/types";

export function bodyBlockProjection(
  typeName: string,
  projection: string,
): string {
  return `_type == '${typeName}' => ${projection}`;
}

export function blocksToText(blocks: Array<any>, paragraphOnly = false) {
  if (!blocks) {
    return "";
  }
  return blocks
    .map((block) => {
      if (
        block._type !== "block" ||
        (paragraphOnly && block.listItem) ||
        !block.children
      ) {
        return "";
      }
      return block.children.map((child: any) => child.text).join("");
    })
    .join("\n\n");
}

export const imageBuilder = imageUrlBuilder(sanityClient);

export function urlForImage(source: SanityAsset) {
  return imageBuilder.image(source);
}

export function formatDate(dateStr: string) {
  return dateStr ? new Date(dateStr).toDateString() : "No date";
}

export function slugify(str: string) {
  if (!str) return "";

  // make lower case and trim
  var slug = str.toLowerCase().trim();

  // remove accents from charaters
  slug = slug.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  // replace invalid chars with spaces
  slug = slug.replace(/[^a-z0-9\s-]/g, " ").trim();

  // replace multiple spaces or hyphens with a single hyphen
  slug = slug.replace(/[\s-]+/g, "-");

  return slug;
}

export function createPath(...args: string[]) {
  const slugs = args.filter((slug) => slug);
  return path.join("/", ...slugs);
}
