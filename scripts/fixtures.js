require("dotenv").config();

const sanityClient = require("@sanity/client");

const client = sanityClient({
  projectId: process.env.PROJECT_ID,
  dataset: process.env.DATASET,
  token: process.env.TOKEN,
  useCdn: false,
});

const generateKey = function () {
  return Math.random().toString(36).substring(10);
};

let doc = {
  _id: "fixture-list-2020-2021",
  _type: "fixtureList",
  season: {
    _ref: "c3087460-6eab-4c93-ba48-fddac913d2d7",
    _type: "reference",
  },
  teamFilter: [
    {
      _key: generateKey(),
      _ref: "aa82cc20-a887-4042-b603-e849f1068dfe",
      _type: "reference",
    },
    {
      _key: generateKey(),
      _ref: "881f900c-e7be-4afb-a7fe-aa4b45fa5607",
      _type: "reference",
    },
    {
      _key: generateKey(),
      _ref: "b64fd2c3-e001-4346-ac98-f3d0405340c2",
      _type: "reference",
    },
  ],
  fixtures: [],
};

const siteUrl =
  "https://ksfa.org.uk/inter-district/associations/primary/orpington-district-psfa/";
const axios = require("axios");
const cheerio = require("cheerio");

const competitionLookup = {
  "KSFA Primary Premiership (Bill Carney Trophy)": {
    competition: "league",
    localTeam: "OBPSFA Boys Blue",
  },
  "KSFA Primary Championship": {
    competition: "league",
    localTeam: "OBPSFA Boys Red",
  },
  "Kent Primary Cup & Daniels Trophy": {
    competition: "cup",
    localTeam: "OBPSFA Boys Blue",
  },
  "Kent Championship Cup": { competition: "cup", localTeam: "OBPSFA Boys Red" },
  "Girls Super League": { competition: "league", localTeam: "OBPSFA Girls" },
  "Kent Girls Super Cup": { competition: "cup", localTeam: "OBPSFA Girls" },
  "Under 11 Gills Shield": {
    competition: "cup",
    localTeam: "OBPSFA Boys Blue",
  },
  "Under 11 Girls Cup": { competition: "cup", localTeam: "OBPSFA Girls" },
};

const getTeamLookup = async () => {
  const result = await client.fetch('*[_type == "team"]');

  let teamLookup = {};

  result.forEach((item) => {
    teamLookup[item.name] = item._id;
  });

  return teamLookup;
};

const fetchData = async () => {
  const result = await axios.get(siteUrl);

  return cheerio.load(result.data);
};

const addResults = async () => {
  const $ = await fetchData();

  const teamLookup = await getTeamLookup();

  $(".fixture-table tbody tr").each((index, row) => {
    const cell = $(row).find("td");

    const competitionInfo = competitionLookup[$(cell[3]).text().trim()];

    let teamHomeId = teamLookup[$(cell[0]).text().trim().replace(" PSFA", "")];
    let teamAwayId = teamLookup[$(cell[2]).text().trim().replace(" PSFA", "")];

    if (teamHomeId === undefined) {
      teamHomeId = teamLookup[competitionInfo.localTeam];
    }

    if (teamAwayId === undefined) {
      teamAwayId = teamLookup[competitionInfo.localTeam];
    }

    const dateObj = new Date($(cell[4]).text().substr(11).trim());

    const date =
      dateObj != "Invalid Date"
        ? new Date(dateObj.getTime() - dateObj.getTimezoneOffset() * 60000)
            .toISOString()
            .split("T")[0]
        : undefined;

    const scores = $(cell[1]).text().trim().split("-");

    const scoreHome = scores.length === 2 ? parseInt(scores[0]) : undefined;
    const scoreAway = scores.length === 2 ? parseInt(scores[1]) : undefined;

    doc.fixtures.push({
      _key: generateKey(),
      _type: "fixture",
      competition: competitionInfo.competition,
      date: date,
      scoreHome: scoreHome,
      scoreAway: scoreAway,
      teamHome: {
        _ref: teamHomeId,
        _type: "reference",
      },
      teamAway: {
        _ref: teamAwayId,
        _type: "reference",
      },
    });
  });

  doc.fixtures.sort(
    (a, b) => (!b.date && -1) || new Date(a.date) - new Date(b.date)
  );

  console.log(doc.fixtures.map((f) => f.date));

  client.createOrReplace(doc).then((res) => {
    console.log(`fixtureList was created, document ID is ${res._id}`);
  });
};

addResults();

/*
{
  _createdAt: '2020-03-19T23:19:31Z',
  _id: 'd8102338-5b35-4553-b521-5ec3e5d74aa5',
  _rev: 'hwcGpsHTKziWie5QetxQBx',
  _type: 'fixtureList',
  _updatedAt: '2020-04-22T22:04:01Z',
  fixtures: [
    {
      _key: 'ed43b10353a8',
      _type: 'fixture',
      competition: 'league',
      date: '2019-10-05',
      scoreAway: 3,
      scoreHome: 3,
      teamAway: [Object],
      teamHome: [Object]
    },
    {
      _key: '821d6aafc05f',
      _type: 'fixture',
      competition: 'league',
      date: '2019-11-05',
      scoreAway: 2,
      scoreHome: 1,
      teamAway: [Object],
      teamHome: [Object]
    },
    {
      _key: '4f870d3138f3',
      _type: 'fixture',
      competition: 'league',
      date: '2019-10-12',
      scoreAway: 2,
      scoreHome: 0,
      teamAway: [Object],
      teamHome: [Object]
    },
    {
      _key: 'c30467488798',
      _type: 'fixture',
      competition: 'league',
      date: '2019-10-12',
      scoreAway: 8,
      scoreHome: 1,
      teamAway: [Object],
      teamHome: [Object]
    },
    {
      _key: 'd70f2d073ff1',
      _type: 'fixture',
      competition: 'league',
      date: '2019-10-12',
      scoreAway: 2,
      scoreHome: 2,
      teamAway: [Object],
      teamHome: [Object]
    },
    {
      _key: 'a1301e8ee8f4',
      _type: 'fixture',
      competition: 'league',
      date: '2019-10-19',
      scoreAway: 3,
      scoreHome: 3,
      teamAway: [Object],
      teamHome: [Object]
    },
    {
      _key: 'bc17c1d78eee',
      _type: 'fixture',
      competition: 'league',
      date: '2019-11-02',
      scoreAway: 3,
      scoreHome: 3,
      teamAway: [Object],
      teamHome: [Object]
    },
    {
      _key: '423802b253b2',
      _type: 'fixture',
      competition: 'league',
      date: '2019-11-16',
      scoreAway: 3,
      scoreHome: 0,
      teamAway: [Object],
      teamHome: [Object]
    },
    {
      _key: 'de13323f783a',
      _type: 'fixture',
      competition: 'league',
      date: '2019-11-30',
      scoreAway: 2,
      scoreHome: 7,
      teamAway: [Object],
      teamHome: [Object]
    },
    {
      _key: 'f04fe7598752',
      _type: 'fixture',
      competition: 'league',
      date: '2019-12-14',
      teamAway: [Object],
      teamHome: [Object]
    },
    {
      _key: '5e7c4d26d5d5',
      _type: 'fixture',
      competition: 'league',
      date: '2020-01-04',
      scoreAway: 2,
      scoreHome: 7,
      teamAway: [Object],
      teamHome: [Object]
    },
    {
      _key: '5c156bdec739',
      _type: 'fixture',
      competition: 'league',
      date: '2020-01-25',
      scoreAway: 2,
      scoreHome: 1,
      teamAway: [Object],
      teamHome: [Object]
    },
    {
      _key: '8f84434a77e0',
      _type: 'fixture',
      competition: 'league',
      date: '2020-02-01',
      scoreAway: 2,
      scoreHome: 0,
      teamAway: [Object],
      teamHome: [Object]
    },
    {
      _key: '5544b8dc98ea',
      _type: 'fixture',
      competition: 'league',
      date: '2020-02-08',
      scoreAway: 2,
      scoreHome: 9,
      teamAway: [Object],
      teamHome: [Object]
    },
    {
      _key: 'cc6fdd522ab0',
      _type: 'fixture',
      competition: 'league',
      date: '2020-02-15',
      scoreAway: 1,
      scoreHome: 3,
      teamAway: [Object],
      teamHome: [Object]
    },
    {
      _key: '073ea6b56169',
      _type: 'fixture',
      competition: 'league',
      date: '2020-03-14',
      scoreAway: 4,
      scoreHome: 3,
      teamAway: [Object],
      teamHome: [Object]
    }
  ],
  season: { _ref: '9caeda3b-f3f0-4067-869e-42147782c455', _type: 'reference' },
  teamFilter: [
    {
      _key: '1478fd93e50c',
      _ref: 'aa82cc20-a887-4042-b603-e849f1068dfe',
      _type: 'reference'
    },
    {
      _key: '449abc6c8839',
      _ref: '881f900c-e7be-4afb-a7fe-aa4b45fa5607',
      _type: 'reference'
    },
    {
      _key: '39e2772ae080',
      _ref: 'b64fd2c3-e001-4346-ac98-f3d0405340c2',
      _type: 'reference'
    }
  ]
}
*/
