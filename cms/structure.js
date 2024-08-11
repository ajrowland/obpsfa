import { MdHome, MdInsertDriveFile } from "react-icons/md";
import { EyeOpenIcon, EditIcon } from "@sanity/icons";

// Web preview
import IframePreview from "./previews/iframe";

// SEO preview
import SeoPreview from "./previews/seo";

// JSON preview
import JsonPreview from "./previews/json";

// Web preview configuration
const remoteURL = "https://www.obpsfa.com";
const localURL = "http://localhost:4321";
const previewURL =
  window.location.hostname === "localhost" ? localURL : remoteURL;

const previewOptions = (S) => [
  S.view.form().icon(EditIcon),
  S.view
    .component(IframePreview)
    .options({ previewURL })
    .title("Web")
    .icon(EyeOpenIcon),
  S.view
    .component(SeoPreview)
    .options({ previewURL })
    .icon(EyeOpenIcon)
    .title("SEO Preview"),
  S.view.component(JsonPreview).icon(EyeOpenIcon).title("JSON"),
];

export const defaultDocumentNode = (S, { schemaType }) => {
  // Conditionally return a different configuration based on the schema type
  if (
    schemaType === "page" ||
    schemaType === "home" ||
    schemaType == "archive"
  ) {
    return S.document().views(previewOptions(S));
  }
  return S.document().views([
    S.view.form(),
    S.view.component(JsonPreview).icon(EyeOpenIcon).title("JSON"),
  ]);
};

export const structure = (S, context) =>
  S.list()
    .title("Content")
    .items([
      S.listItem().title("Index page").icon(MdHome).child(
        /*
          S.document()
            .schemaType('home')
            .documentId('site-home')
            .views(previewOptions)
          */
        S.documentList()
          //.schemaType('page')
          .title("Page")
          .filter('_type == "home" || _type == "archive"')
      ),

      // Page list that are not archived
      S.listItem()
        .title("Page")
        .icon(MdInsertDriveFile)
        .child(
          S.documentList()
            .schemaType("page")
            .title("Page")
            .filter('_type == "page" && (!isArchived || !defined(isArchived))')
        ),

      // Page list that are archived by category
      S.listItem()
        .title("Page (archived)")
        .icon(MdInsertDriveFile)
        .child(
          S.documentTypeList("category")
            .title("Category")
            .child((catId) =>
              S.documentList()
                .schemaType("page")
                .title("Page")
                .filter(
                  '_type == "page" && (isArchived == true && $catId in seo.categories[]._ref)'
                )
                .params({ catId })
            )
        ),

      // List out the rest of the document types, but filter out the home type
      ...S.documentTypeListItems().filter(
        (listItem) => !["home", "archive", "page"].includes(listItem.getId())
      ),
    ]);
