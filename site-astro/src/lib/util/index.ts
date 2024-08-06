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
