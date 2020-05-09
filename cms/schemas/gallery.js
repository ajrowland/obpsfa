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
    },
    {
      name: 'minHeight',
      title: 'Minimum height',
      description: 'Images below this height will be filtered out.',
      type: 'number'
    },
    {
      name: 'aspectRatio',
      title: 'Aspect ratio',
      description: 'Dafault is 66.66%. Images that are not within a 1% tolerance of this will be filtered out.',
      type: 'number',
      validation: Rule => Rule.precision(2).min(1).max(100)
    }
  ],
  preview: {
    select: { id: 'id'},
    //component: IframePreview
  }
}
