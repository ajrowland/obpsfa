import MdImage from 'react-icons/lib/md/image'

export default {
  name: 'extendedImage',
  title: 'Extended image',
  type: 'image',
  icon: MdImage,
  options: {
    hotspot: true
  },
  fields: [
    {
      name: 'alt',
      type: 'string',
      title: 'Alternative text',
      validation: Rule => Rule.required()
    },
    {
      name: 'caption',
      type: 'string',
      title: 'Caption'
    },
    {
      name: 'attribution',
      type: 'string',
      title: 'Attribution',
    }
  ]
}
