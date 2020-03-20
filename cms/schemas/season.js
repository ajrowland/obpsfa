export default {
  name: 'season',
  title: 'Season',
  type: 'document',
  fields: [
    {
      name: 'date',
      title: 'Date',
      type: 'date'
    }
  ],
  preview: {
    select: {
      date: 'date'
    },
    prepare(selection) {
      const {date} = selection
      const year = parseInt(date.split('-')[0])
      return {
        title: `${year} - ${year + 1}`
      }
    }
  }
}
