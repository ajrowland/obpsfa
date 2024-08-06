import { homeProjection, pageProjection } from "./documents";
import { sanityClient } from "sanity:client";
import type { SanityAsset } from "@sanity/image-url/lib/types/types";

interface NavItem {
  title: string;
  slug: string;
}

interface SiteData {
  navigation: Array<NavItem>;
}

interface Page {
  title: string;
  date: string;
  slug: string;
  mainImage: SanityAsset;
  isArchived: boolean;
  body: any;
  seo: {
    description: string;
    authorDisplay: string;
  };
}

interface HomePage extends Page {
  news: Page[];
}

let isCached = import.meta.env.PROD;
let siteData: SiteData | null = null;
let pages: Page[] | null = null;

function limit(items: any, n: number) {
  return n ? items.slice(0, n) : items;
}

export const getSiteData = async (): Promise<SiteData | null> => {
  if (!siteData) {
    const query = `{
    "navigation": *[_type == "page" && sortOrder > 0 && isArchived != true] | order(order) {
      title,
      "slug": slug.current,
    }
  }`;

    siteData = await sanityClient.fetch(query);
  }

  return siteData;
};

export const getHome = async (id: string): Promise<HomePage> => {
  const query = `*[_type == "home" && _id == "${id}"][0] ${homeProjection}`;

  const page: HomePage = await sanityClient.fetch(query);

  return page;
};

export const getPages = async (n = 0): Promise<Page[]> => {
  if (pages && isCached) return limit(pages, n);

  const query = `*[_type == "page" && defined(slug)] | order(order) ${pageProjection}`;

  pages = await sanityClient.fetch(query);

  return limit(pages, n);
};

export const getPage = async (path: string): Promise<Page> => {
  const pathQuery = path
    .split("/")
    .filter((p) => p)
    .reverse()
    .map((segment, i) => `${"parent->".repeat(i)}slug.current == "${segment}"`)
    .join(" && ");

  const query = `*[_type == "page" && ${pathQuery}][0] ${pageProjection}`;

  const page: Page = await sanityClient.fetch(query);

  return page;
};
