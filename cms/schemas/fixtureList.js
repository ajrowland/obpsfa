export default {
  name: 'fixtureList',
  title: 'Fixture list',
  type: 'document',
  fields: [
    {
      name: 'teamFilter',
      title: 'Team filter',
      description: 'Requires more than one team to enable filtering',
      type: 'array',
      of: [{type: 'reference', to: { type: 'team'} } ]
    },
    {
      name: 'season',
      title: 'Season',
      type: 'reference',
      to: {type: 'season'},
      validation: Rule => Rule.required()
    },
    {
      name: 'fixtures',
      title: 'Fixtures',
      type: 'array',
      of: [{type: 'fixture'}],
      validation: Rule => Rule.required()
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
        title: `${team || 'Various'} (${year} - ${year + 1})`,
        media: badge
      }
    }
  }
}
