import MdBurstMode from 'react-icons/lib/md/burst-mode'
//import IframePreview from "./previews/iframe";

export default {
  name: 'gallery',
  title: 'Gallery',
  type: 'object',
  icon: MdBurstMode,
  fields: [
    {
      name: 'imgurId',
      title: 'Imgur ID',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'displayTitle',
      title: 'Display title',
      type: 'boolean'
    }
  ],
  preview: {
    select: { id: 'id'},
    //component: IframePreview
  }
}
