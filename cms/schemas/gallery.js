//import IframePreview from "./previews/iframe";

export default {
  name: 'gallery',
  title: 'Gallery',
  type: 'object',
  fields: [
    {
      name: 'imgurId',
      title: 'Imgur ID',
      type: 'string',
      validation: Rule => Rule.required()
    }
  ],
  preview: {
    select: { id: 'id'},
    //component: IframePreview
  }
}
