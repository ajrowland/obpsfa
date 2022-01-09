export default {
  name: 'report',
  title: 'Report',
  type: 'object',
  fields: [
    {
      name: 'date',
      title: 'Date',
      type: 'date'
    },
    {
      name: "mainImage",
      title: "Main image",
      type: "extendedImage",
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 5,
    },
    {
      name: 'body',
      title: 'Body',
      type: 'blockContent',
    },
    {
      name: 'author',
      title: 'Author',
      type: 'string',
    },
  ],
}
