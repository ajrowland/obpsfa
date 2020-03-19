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
      name: 'venue',
      title: 'Venue',
      type: 'string'
    },
    {
      name: 'teamHome',
      title: 'Home team',
      type: 'string'
    },
    {
      name: 'teamAway',
      title: 'Away team',
      type: 'string'
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
      teamHome: 'teamHome',
      teamAway: 'teamAway',
      date: 'date'
    },
    prepare(selection) {
      const {teamHome, teamAway, date} = selection
      return {
        title: `${teamHome} v ${teamAway}`,
        subtitle: date
      }
    }
  }
}
