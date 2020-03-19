export default {
  name: 'season',
  title: 'Season',
  type: 'document',
  fields: [
    {
      name: 'date',
      title: 'Date',
      type: 'date'
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'date',
        maxLength: 96
      }
    }
  ],
  preview: {
    select: {
      title: 'date'
    }
  }
}
