export default {
  name: 'fixtureList',
  title: 'Fixture list',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string'
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
      name: 'team',
      title: 'Team',
      type: 'reference',
      to: {type: 'team'}
    },
    {
      name: 'season',
      title: 'Season',
      type: 'reference',
      to: {type: 'season'}
    },
    {
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: {
        hotspot: true
      }
    },
    {
      name: 'fixtures',
      title: 'Fixtures',
      type: 'array',
      of: [{type: 'fixture'}]
    },
    {
      name: 'body',
      title: 'Body',
      type: 'blockContent'
    }
  ],

  preview: {
    select: {
      title: 'title',
      media: 'mainImage'
    }
  }
}
