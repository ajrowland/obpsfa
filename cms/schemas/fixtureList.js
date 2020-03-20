export default {
  name: 'fixtureList',
  title: 'Fixture list',
  type: 'document',
  fields: [
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
      name: 'fixtures',
      title: 'Fixtures',
      type: 'array',
      of: [{type: 'fixture'}]
    }
  ],
  preview: {
    select: {
      team: 'team.name',
      date: 'season.date',
      badge: 'team.badge'
    },
    prepare(selection) {
      const {team, date, badge} = selection
      const year = parseInt(date.split('-')[0])
      return {
        title: `${team} (${year} - ${year + 1})`,
        media: badge
      }
    }
  }
}
