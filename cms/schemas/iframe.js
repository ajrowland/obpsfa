import IframePreview from "./previews/iframe";

export default {
  name: 'iframe',
  title: 'Iframe',
  type: 'object',
  fields: [
    {
      name: 'url',
      title: 'URL',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'width',
      title: 'Width',
      type: 'number'
    },
    {
      name: 'height',
      title: 'Height',
      type: 'number'
    }
  ],
  preview: {
    select: { url: 'url'},
    component: IframePreview
  }
}
