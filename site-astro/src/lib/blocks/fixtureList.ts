export const fixtureListProjection = `@-> {
  fixtures[] {
    date,
    competition,
    teamHome->{
      _id,
      name,
      badge,
      "accentColor": accentColor.hex
    },
    teamAway->{
      _id,
      name,
      badge,
      "accentColor": accentColor.hex 
    },
    scoreHome,
    scoreAway
  },
  teamFilter[]->{
    _id,
    name,
  }
}`;
