export default {
  name: 'page',
  title: 'Page',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'sortOrder',
      title: 'Sort order',
      type: 'number',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96
      }
    },
    {
      name: 'mainImage',
      title: 'Main image',
      type: 'extendedImage'
    },
    {
      name: 'body',
      title: 'Body',
      type: 'blockContent',
    },
    {
      name: 'parent',
      title: 'Parent',
      type: 'reference',
      to: [{type: 'home'}, {type: 'page'}]
    },
    {
      name: 'seo',
      title: 'SEO information',
      type: 'seo'
    }
  ],

  orderings: [
    {
      title: 'Navigation order',
      name: 'sortOrder',
      by: [
        {field: 'sortOrder', direction: 'asc'}
      ]
    }
  ],

  preview: {
    select: {
      title: 'title',
      author: 'seo.author.name',
      media: 'mainImage'
    },
    prepare(selection) {
      const {author} = selection
      return Object.assign({}, selection, {
        subtitle: author && `by ${author}`
      })
    }
  }
}
