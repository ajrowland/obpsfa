import S from "@sanity/desk-tool/structure-builder";

export default () =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Home')
        .child(
          S.document()
            .schemaType('home')
            .documentId('site-home')
        ),
      // Add a visual divider (optional)
      S.divider(),
      // List out the rest of the document types, but filter out the home type
      ...S.documentTypeListItems()
        .filter(listItem => !['home'].includes(listItem.getId()))
    ])