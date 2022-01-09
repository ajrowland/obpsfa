export default {
  name: "fixture",
  title: "Fixture",
  type: "object",
  fields: [
    {
      name: "date",
      title: "Date",
      type: "date",
    },
    {
      name: "teamHome",
      title: "Home team",
      type: "reference",
      to: { type: "team" },
    },
    {
      name: "teamAway",
      title: "Away team",
      type: "reference",
      to: { type: "team" },
    },
    {
      name: "scoreHome",
      title: "Home score",
      type: "number",
    },
    {
      name: "scoreAway",
      title: "Away score",
      type: "number",
    },
    {
      name: "competition",
      title: "Competition",
      type: "string",
      options: {
        sortable: false,
        layout: "radio",
        list: [
          {
            value: "league",
            title: "League",
          },
          {
            value: "cup",
            title: "Cup",
          },
          {
            value: "friendly",
            title: "Friendly",
          },
        ],
      },
    },
  ],
  preview: {
    select: {
      teamHome: "teamHome.name",
      teamAway: "teamAway.name",
      date: "date",
      badge: "teamHome.badge",
      scoreHome: "scoreHome",
      scoreAway: "scoreAway",
    },
    prepare(selection) {
      const { teamHome, teamAway, date, badge, scoreHome, scoreAway } =
        selection;
      return {
        title: `${teamHome} ${scoreHome || ""} v ${teamAway} ${
          scoreAway || ""
        }`,
        subtitle: date,
        media: badge,
      };
    },
  },
};
