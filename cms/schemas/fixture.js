export default {
  name: 'fixture',
  title: 'Fixture',
  type: 'object',
  fields: [
    {
      name: 'date',
      title: 'Date',
      type: 'date'
    },
    {
      name: 'teamHome',
      title: 'Home team',
      type: 'reference',
      to: {type: 'team'}
    },
    {
      name: 'teamAway',
      title: 'Away team',
      type: 'reference',
      to: {type: 'team'}
    },
    {
      name: 'scoreHome',
      title: 'Home score',
      type: 'number'
    },
    {
      name: 'scoreAway',
      title: 'Away score',
      type: 'number'
    }
  ],
  preview: {
    select: {
      teamHome: 'teamHome.name',
      teamAway: 'teamAway.name',
      date: 'date',
      badge: 'teamHome.badge'
    },
    prepare(selection) {
      const {teamHome, teamAway, date, badge} = selection
      return {
        title: `${teamHome} v ${teamAway}`,
        subtitle: date,
        media: badge
      }
    }
  }
}
