const { addonBuilder, serveHTTP } = require("stremio-addon-sdk");
const axios = require("axios");

const manifest = {
  id: "com.falcon.addon",
  version: "1.1.0",
  name: "Falcon",
  description: "Free public domain movies and classics from the Internet Archive",
  logo: "https://raw.githubusercontent.com/sexytrevor78-art/https-falcon.xyz-8080/main/logo.png",
  background: "https://raw.githubusercontent.com/sexytrevor78-art/https-falcon.xyz-8080/main/background.png",
  resources: ["catalog", "meta", "stream"],
  types: ["movie", "series"],
  catalogs: [
    {
      type: "movie",
      id: "falcon-public-domain",
      name: "Falcon – Free Movies",
      extra: [
        { name: "search", isRequired: false },
        { name: "skip", isRequired: false }
      ]
    },
    {
      type: "movie",
      id: "falcon-classics-80s90s",
      name: "Falcon – 80s & 90s Classics",
      extra: [{ name: "skip", isRequired: false }]
    },
    {
      type: "movie",
      id: "falcon-classics-2000s",
      name: "Falcon – 2000s Classics",
      extra: [{ name: "skip", isRequired: false }]
    },
    {
      type: "movie",
      id: "falcon-horror",
      name: "Falcon – Horror",
      extra: [{ name: "skip", isRequired: false }]
    },
    {
      type: "series",
      id: "falcon-series-80s90s",
      name: "Falcon – Classic TV Shows",
      extra: [{ name: "skip", isRequired: false }]
    },
    {
      type: "series",
      id: "falcon-drama",
      name: "Falcon – Drama",
      extra: [{ name: "skip", isRequired: false }]
    },
    {
      type: "series",
      id: "falcon-comedy",
      name: "Falcon – Comedy",
      extra: [{ name: "skip", isRequired: false }]
    },
    {
      type: "series",
      id: "falcon-soap-opera",
      name: "Falcon – Soap Operas",
      extra: [{ name: "skip", isRequired: false }]
    },
    {
      type: "series",
      id: "falcon-cartoons",
      name: "Falcon – Cartoons",
      extra: [{ name: "skip", isRequired: false }]
    }
  ],
  idPrefixes: ["falcon:", "tt"]
};

// ── CLASSIC CONTENT LISTS ─────────────────────────────────────────────

const classics80s90s = [
  { id: "tt0088763", name: "Back to the Future", year: 1985, poster: "https://images.metahub.space/poster/medium/tt0088763/img" },
  { id: "tt0088247", name: "The Terminator", year: 1984, poster: "https://images.metahub.space/poster/medium/tt0088247/img" },
  { id: "tt0087332", name: "Ghostbusters", year: 1984, poster: "https://images.metahub.space/poster/medium/tt0087332/img" },
  { id: "tt0086960", name: "Beverly Hills Cop", year: 1984, poster: "https://images.metahub.space/poster/medium/tt0086960/img" },
  { id: "tt0091042", name: "Ferris Bueller's Day Off", year: 1986, poster: "https://images.metahub.space/poster/medium/tt0091042/img" },
  { id: "tt0095016", name: "Die Hard", year: 1988, poster: "https://images.metahub.space/poster/medium/tt0095016/img" },
  { id: "tt0094721", name: "Beetlejuice", year: 1988, poster: "https://images.metahub.space/poster/medium/tt0094721/img" },
  { id: "tt0088847", name: "The Breakfast Club", year: 1985, poster: "https://images.metahub.space/poster/medium/tt0088847/img" },
  { id: "tt0093773", name: "Predator", year: 1987, poster: "https://images.metahub.space/poster/medium/tt0093773/img" },
  { id: "tt0093870", name: "RoboCop", year: 1987, poster: "https://images.metahub.space/poster/medium/tt0093870/img" },
  { id: "tt0094898", name: "Coming to America", year: 1988, poster: "https://images.metahub.space/poster/medium/tt0094898/img" },
  { id: "tt0092099", name: "Top Gun", year: 1986, poster: "https://images.metahub.space/poster/medium/tt0092099/img" },
  { id: "tt0091763", name: "Platoon", year: 1986, poster: "https://images.metahub.space/poster/medium/tt0091763/img" },
  { id: "tt0093058", name: "Full Metal Jacket", year: 1987, poster: "https://images.metahub.space/poster/medium/tt0093058/img" },
  { id: "tt0093779", name: "The Princess Bride", year: 1987, poster: "https://images.metahub.space/poster/medium/tt0093779/img" },
  { id: "tt0089218", name: "The Goonies", year: 1985, poster: "https://images.metahub.space/poster/medium/tt0089218/img" },
  { id: "tt0087538", name: "Gremlins", year: 1984, poster: "https://images.metahub.space/poster/medium/tt0087538/img" },
  { id: "tt0082971", name: "Raiders of the Lost Ark", year: 1981, poster: "https://images.metahub.space/poster/medium/tt0082971/img" },
  { id: "tt0099685", name: "Goodfellas", year: 1990, poster: "https://images.metahub.space/poster/medium/tt0099685/img" },
  { id: "tt0096895", name: "Home Alone", year: 1990, poster: "https://images.metahub.space/poster/medium/tt0096895/img" },
  { id: "tt0107290", name: "Jurassic Park", year: 1993, poster: "https://images.metahub.space/poster/medium/tt0107290/img" },
  { id: "tt0110912", name: "Pulp Fiction", year: 1994, poster: "https://images.metahub.space/poster/medium/tt0110912/img" },
  { id: "tt0111161", name: "The Shawshank Redemption", year: 1994, poster: "https://images.metahub.space/poster/medium/tt0111161/img" },
  { id: "tt0109830", name: "Forrest Gump", year: 1994, poster: "https://images.metahub.space/poster/medium/tt0109830/img" },
  { id: "tt0101414", name: "The Silence of the Lambs", year: 1991, poster: "https://images.metahub.space/poster/medium/tt0101414/img" },
  { id: "tt0111257", name: "Speed", year: 1994, poster: "https://images.metahub.space/poster/medium/tt0111257/img" },
  { id: "tt0102685", name: "Point Break", year: 1991, poster: "https://images.metahub.space/poster/medium/tt0102685/img" },
  { id: "tt0112573", name: "Braveheart", year: 1995, poster: "https://images.metahub.space/poster/medium/tt0112573/img" },
  { id: "tt0114369", name: "Se7en", year: 1995, poster: "https://images.metahub.space/poster/medium/tt0114369/img" },
  { id: "tt0133093", name: "The Matrix", year: 1999, poster: "https://images.metahub.space/poster/medium/tt0133093/img" },
  { id: "tt0169547", name: "American Beauty", year: 1999, poster: "https://images.metahub.space/poster/medium/tt0169547/img" },
  { id: "tt0137523", name: "Fight Club", year: 1999, poster: "https://images.metahub.space/poster/medium/tt0137523/img" },
  { id: "tt0116282", name: "Fargo", year: 1996, poster: "https://images.metahub.space/poster/medium/tt0116282/img" },
  { id: "tt0114814", name: "The Usual Suspects", year: 1995, poster: "https://images.metahub.space/poster/medium/tt0114814/img" },
  { id: "tt0120338", name: "Titanic", year: 1997, poster: "https://images.metahub.space/poster/medium/tt0120338/img" },
  { id: "tt0120815", name: "Saving Private Ryan", year: 1998, poster: "https://images.metahub.space/poster/medium/tt0120815/img" },
  { id: "tt0107048", name: "Groundhog Day", year: 1993, poster: "https://images.metahub.space/poster/medium/tt0107048/img" },
  { id: "tt0108052", name: "Schindler's List", year: 1993, poster: "https://images.metahub.space/poster/medium/tt0108052/img" },
  { id: "tt0110357", name: "The Lion King", year: 1994, poster: "https://images.metahub.space/poster/medium/tt0110357/img" },
  { id: "tt0103064", name: "Terminator 2: Judgment Day", year: 1991, poster: "https://images.metahub.space/poster/medium/tt0103064/img" },
  { id: "tt0112641", name: "Casino", year: 1995, poster: "https://images.metahub.space/poster/medium/tt0112641/img" },
  { id: "tt0119217", name: "Good Will Hunting", year: 1997, poster: "https://images.metahub.space/poster/medium/tt0119217/img" },
  { id: "tt0104257", name: "A Few Good Men", year: 1992, poster: "https://images.metahub.space/poster/medium/tt0104257/img" },
  { id: "tt0100802", name: "Total Recall", year: 1990, poster: "https://images.metahub.space/poster/medium/tt0100802/img" }
];

const classics2000s = [
  { id: "tt0268978", name: "A Beautiful Mind", year: 2001, poster: "https://images.metahub.space/poster/medium/tt0268978/img" },
  { id: "tt0317248", name: "City of God", year: 2002, poster: "https://images.metahub.space/poster/medium/tt0317248/img" },
  { id: "tt0167261", name: "The Lord of the Rings: The Two Towers", year: 2002, poster: "https://images.metahub.space/poster/medium/tt0167261/img" },
  { id: "tt0167260", name: "The Lord of the Rings: The Return of the King", year: 2003, poster: "https://images.metahub.space/poster/medium/tt0167260/img" },
  { id: "tt0120737", name: "The Lord of the Rings: The Fellowship of the Ring", year: 2001, poster: "https://images.metahub.space/poster/medium/tt0120737/img" },
  { id: "tt0209144", name: "Memento", year: 2000, poster: "https://images.metahub.space/poster/medium/tt0209144/img" },
  { id: "tt0372784", name: "Batman Begins", year: 2005, poster: "https://images.metahub.space/poster/medium/tt0372784/img" },
  { id: "tt0468569", name: "The Dark Knight", year: 2008, poster: "https://images.metahub.space/poster/medium/tt0468569/img" },
  { id: "tt0361748", name: "Inglourious Basterds", year: 2009, poster: "https://images.metahub.space/poster/medium/tt0361748/img" },
  { id: "tt0434409", name: "V for Vendetta", year: 2005, poster: "https://images.metahub.space/poster/medium/tt0434409/img" },
  { id: "tt0338013", name: "Eternal Sunshine of the Spotless Mind", year: 2004, poster: "https://images.metahub.space/poster/medium/tt0338013/img" },
  { id: "tt0266697", name: "Kill Bill: Volume 1", year: 2003, poster: "https://images.metahub.space/poster/medium/tt0266697/img" },
  { id: "tt0378194", name: "Kill Bill: Volume 2", year: 2004, poster: "https://images.metahub.space/poster/medium/tt0378194/img" },
  { id: "tt0245429", name: "Spirited Away", year: 2001, poster: "https://images.metahub.space/poster/medium/tt0245429/img" },
  { id: "tt0325980", name: "Pirates of the Caribbean", year: 2003, poster: "https://images.metahub.space/poster/medium/tt0325980/img" },
  { id: "tt0172495", name: "Gladiator", year: 2000, poster: "https://images.metahub.space/poster/medium/tt0172495/img" },
  { id: "tt0264464", name: "Catch Me If You Can", year: 2002, poster: "https://images.metahub.space/poster/medium/tt0264464/img" },
  { id: "tt0240772", name: "Ocean's Eleven", year: 2001, poster: "https://images.metahub.space/poster/medium/tt0240772/img" },
  { id: "tt0477348", name: "No Country for Old Men", year: 2007, poster: "https://images.metahub.space/poster/medium/tt0477348/img" },
  { id: "tt0407887", name: "The Departed", year: 2006, poster: "https://images.metahub.space/poster/medium/tt0407887/img" },
  { id: "tt1375666", name: "Inception", year: 2010, poster: "https://images.metahub.space/poster/medium/tt1375666/img" }
];

const horror = [
  { id: "tt0081505", name: "The Shining", year: 1980, poster: "https://images.metahub.space/poster/medium/tt0081505/img" },
  { id: "tt0078748", name: "Alien", year: 1979, poster: "https://images.metahub.space/poster/medium/tt0078748/img" },
  { id: "tt0090605", name: "Aliens", year: 1986, poster: "https://images.metahub.space/poster/medium/tt0090605/img" },
  { id: "tt0077651", name: "Halloween", year: 1978, poster: "https://images.metahub.space/poster/medium/tt0077651/img" },
  { id: "tt0087800", name: "A Nightmare on Elm Street", year: 1984, poster: "https://images.metahub.space/poster/medium/tt0087800/img" },
  { id: "tt0082418", name: "Friday the 13th", year: 1980, poster: "https://images.metahub.space/poster/medium/tt0082418/img" },
  { id: "tt0103919", name: "Candyman", year: 1992, poster: "https://images.metahub.space/poster/medium/tt0103919/img" },
  { id: "tt0116996", name: "Scream", year: 1996, poster: "https://images.metahub.space/poster/medium/tt0116996/img" },
  { id: "tt0144084", name: "American Psycho", year: 2000, poster: "https://images.metahub.space/poster/medium/tt0144084/img" },
  { id: "tt0289043", name: "28 Days Later", year: 2002, poster: "https://images.metahub.space/poster/medium/tt0289043/img" },
  { id: "tt0357109", name: "Saw", year: 2004, poster: "https://images.metahub.space/poster/medium/tt0357109/img" },
  { id: "tt0435625", name: "The Descent", year: 2005, poster: "https://images.metahub.space/poster/medium/tt0435625/img" },
  { id: "tt0167404", name: "The Sixth Sense", year: 1999, poster: "https://images.metahub.space/poster/medium/tt0167404/img" },
  { id: "tt0185937", name: "The Blair Witch Project", year: 1999, poster: "https://images.metahub.space/poster/medium/tt0185937/img" },
  { id: "tt0298148", name: "The Ring", year: 2002, poster: "https://images.metahub.space/poster/medium/tt0298148/img" },
  { id: "tt1179891", name: "Paranormal Activity", year: 2007, poster: "https://images.metahub.space/poster/medium/tt1179891/img" },
  { id: "tt0450385", name: "1408", year: 2007, poster: "https://images.metahub.space/poster/medium/tt0450385/img" }
];

const classicSeries = [
  { id: "tt0086661", name: "The A-Team", year: 1983, poster: "https://images.metahub.space/poster/medium/tt0086661/img" },
  { id: "tt0083437", name: "Knight Rider", year: 1982, poster: "https://images.metahub.space/poster/medium/tt0083437/img" },
  { id: "tt0088559", name: "MacGyver", year: 1985, poster: "https://images.metahub.space/poster/medium/tt0088559/img" },
  { id: "tt0086759", name: "Miami Vice", year: 1984, poster: "https://images.metahub.space/poster/medium/tt0086759/img" },
  { id: "tt0083399", name: "Cheers", year: 1982, poster: "https://images.metahub.space/poster/medium/tt0083399/img" },
  { id: "tt0090290", name: "ALF", year: 1986, poster: "https://images.metahub.space/poster/medium/tt0090290/img" },
  { id: "tt0086687", name: "The Cosby Show", year: 1984, poster: "https://images.metahub.space/poster/medium/tt0086687/img" },
  { id: "tt0083373", name: "Family Ties", year: 1982, poster: "https://images.metahub.space/poster/medium/tt0083373/img" },
  { id: "tt0080240", name: "Magnum P.I.", year: 1980, poster: "https://images.metahub.space/poster/medium/tt0080240/img" },
  { id: "tt0096697", name: "The Simpsons", year: 1989, poster: "https://images.metahub.space/poster/medium/tt0096697/img" },
  { id: "tt0098904", name: "Seinfeld", year: 1989, poster: "https://images.metahub.space/poster/medium/tt0098904/img" },
  { id: "tt0098800", name: "The Fresh Prince of Bel-Air", year: 1990, poster: "https://images.metahub.space/poster/medium/tt0098800/img" },
  { id: "tt0101009", name: "Home Improvement", year: 1991, poster: "https://images.metahub.space/poster/medium/tt0101009/img" },
  { id: "tt0108757", name: "ER", year: 1994, poster: "https://images.metahub.space/poster/medium/tt0108757/img" },
  { id: "tt0106179", name: "The X-Files", year: 1993, poster: "https://images.metahub.space/poster/medium/tt0106179/img" },
  { id: "tt0118276", name: "Buffy the Vampire Slayer", year: 1997, poster: "https://images.metahub.space/poster/medium/tt0118276/img" },
  { id: "tt0094517", name: "Married with Children", year: 1987, poster: "https://images.metahub.space/poster/medium/tt0094517/img" },
  { id: "tt0098258", name: "Saved by the Bell", year: 1989, poster: "https://images.metahub.space/poster/medium/tt0098258/img" },
  { id: "tt0111958", name: "Boy Meets World", year: 1993, poster: "https://images.metahub.space/poster/medium/tt0111958/img" },
  { id: "tt0108778", name: "Friends", year: 1994, poster: "https://images.metahub.space/poster/medium/tt0108778/img" },
  { id: "tt0092337", name: "Full House", year: 1987, poster: "https://images.metahub.space/poster/medium/tt0092337/img" },
  { id: "tt0096548", name: "Quantum Leap", year: 1989, poster: "https://images.metahub.space/poster/medium/tt0096548/img" },
  { id: "tt0096622", name: "Baywatch", year: 1989, poster: "https://images.metahub.space/poster/medium/tt0096622/img" },
  { id: "tt0115147", name: "3rd Rock from the Sun", year: 1996, poster: "https://images.metahub.space/poster/medium/tt0115147/img" },
  { id: "tt0098936", name: "Twin Peaks", year: 1990, poster: "https://images.metahub.space/poster/medium/tt0098936/img" },
  { id: "tt0306414", name: "The Wire", year: 2002, poster: "https://images.metahub.space/poster/medium/tt0306414/img" },
  { id: "tt0386676", name: "The Office", year: 2005, poster: "https://images.metahub.space/poster/medium/tt0386676/img" },
  { id: "tt0460649", name: "How I Met Your Mother", year: 2005, poster: "https://images.metahub.space/poster/medium/tt0460649/img" },
  { id: "tt0411008", name: "Lost", year: 2004, poster: "https://images.metahub.space/poster/medium/tt0411008/img" },
  { id: "tt0303461", name: "Firefly", year: 2002, poster: "https://images.metahub.space/poster/medium/tt0303461/img" },
  { id: "tt0367279", name: "Arrested Development", year: 2003, poster: "https://images.metahub.space/poster/medium/tt0367279/img" },
  { id: "tt0285403", name: "Scrubs", year: 2001, poster: "https://images.metahub.space/poster/medium/tt0285403/img" },
  { id: "tt0773262", name: "Dexter", year: 2006, poster: "https://images.metahub.space/poster/medium/tt0773262/img" },
  { id: "tt0903747", name: "Breaking Bad", year: 2008, poster: "https://images.metahub.space/poster/medium/tt0903747/img" },
  { id: "tt0141842", name: "The Sopranos", year: 1999, poster: "https://images.metahub.space/poster/medium/tt0141842/img" },
  { id: "tt0412142", name: "House M.D.", year: 2004, poster: "https://images.metahub.space/poster/medium/tt0412142/img" },
  { id: "tt0290978", name: "24", year: 2001, poster: "https://images.metahub.space/poster/medium/tt0290978/img" },
  { id: "tt0472954", name: "It's Always Sunny in Philadelphia", year: 2005, poster: "https://images.metahub.space/poster/medium/tt0472954/img" }
];

const dramaSeries = [
  { id: "tt0112130", name: "NYPD Blue", year: 1993, poster: "https://images.metahub.space/poster/medium/tt0112130/img" },
  { id: "tt0108757", name: "ER", year: 1994, poster: "https://images.metahub.space/poster/medium/tt0108757/img" },
  { id: "tt0106179", name: "The X-Files", year: 1993, poster: "https://images.metahub.space/poster/medium/tt0106179/img" },
  { id: "tt0141842", name: "The Sopranos", year: 1999, poster: "https://images.metahub.space/poster/medium/tt0141842/img" },
  { id: "tt0306414", name: "The Wire", year: 2002, poster: "https://images.metahub.space/poster/medium/tt0306414/img" },
  { id: "tt0411008", name: "Lost", year: 2004, poster: "https://images.metahub.space/poster/medium/tt0411008/img" },
  { id: "tt0773262", name: "Dexter", year: 2006, poster: "https://images.metahub.space/poster/medium/tt0773262/img" },
  { id: "tt0903747", name: "Breaking Bad", year: 2008, poster: "https://images.metahub.space/poster/medium/tt0903747/img" },
  { id: "tt0098936", name: "Twin Peaks", year: 1990, poster: "https://images.metahub.space/poster/medium/tt0098936/img" },
  { id: "tt0290978", name: "24", year: 2001, poster: "https://images.metahub.space/poster/medium/tt0290978/img" },
  { id: "tt0412142", name: "House M.D.", year: 2004, poster: "https://images.metahub.space/poster/medium/tt0412142/img" },
  { id: "tt0413573", name: "Grey's Anatomy", year: 2005, poster: "https://images.metahub.space/poster/medium/tt0413573/img" },
  { id: "tt0080240", name: "Magnum P.I.", year: 1980, poster: "https://images.metahub.space/poster/medium/tt0080240/img" },
  { id: "tt0086759", name: "Miami Vice", year: 1984, poster: "https://images.metahub.space/poster/medium/tt0086759/img" },
  { id: "tt0086661", name: "The A-Team", year: 1983, poster: "https://images.metahub.space/poster/medium/tt0086661/img" },
  { id: "tt0083437", name: "Knight Rider", year: 1982, poster: "https://images.metahub.space/poster/medium/tt0083437/img" },
  { id: "tt0088559", name: "MacGyver", year: 1985, poster: "https://images.metahub.space/poster/medium/tt0088559/img" },
  { id: "tt0118276", name: "Buffy the Vampire Slayer", year: 1997, poster: "https://images.metahub.space/poster/medium/tt0118276/img" },
  { id: "tt0303461", name: "Firefly", year: 2002, poster: "https://images.metahub.space/poster/medium/tt0303461/img" },
  { id: "tt0364845", name: "Prison Break", year: 2005, poster: "https://images.metahub.space/poster/medium/tt0364845/img" },
  { id: "tt0455275", name: "Heroes", year: 2006, poster: "https://images.metahub.space/poster/medium/tt0455275/img" },
  { id: "tt0247082", name: "CSI: Crime Scene Investigation", year: 2000, poster: "https://images.metahub.space/poster/medium/tt0247082/img" },
  { id: "tt0279600", name: "Criminal Minds", year: 2005, poster: "https://images.metahub.space/poster/medium/tt0279600/img" },
  { id: "tt0185906", name: "Band of Brothers", year: 2001, poster: "https://images.metahub.space/poster/medium/tt0185906/img" },
  { id: "tt0407362", name: "Battlestar Galactica", year: 2004, poster: "https://images.metahub.space/poster/medium/tt0407362/img" },
  { id: "tt0944947", name: "Game of Thrones", year: 2011, poster: "https://images.metahub.space/poster/medium/tt0944947/img" },
  { id: "tt1520211", name: "The Walking Dead", year: 2010, poster: "https://images.metahub.space/poster/medium/tt1520211/img" },
  { id: "tt1475582", name: "Sherlock", year: 2010, poster: "https://images.metahub.space/poster/medium/tt1475582/img" },
  { id: "tt1466074", name: "Justified", year: 2010, poster: "https://images.metahub.space/poster/medium/tt1466074/img" },
  { id: "tt1837888", name: "Homeland", year: 2011, poster: "https://images.metahub.space/poster/medium/tt1837888/img" },
  { id: "tt2364582", name: "Peaky Blinders", year: 2013, poster: "https://images.metahub.space/poster/medium/tt2364582/img" },
  { id: "tt0098844", name: "Beverly Hills, 90210", year: 1990, poster: "https://images.metahub.space/poster/medium/tt0098844/img" },
  { id: "tt0374091", name: "Desperate Housewives", year: 2004, poster: "https://images.metahub.space/poster/medium/tt0374091/img" },
  { id: "tt0460627", name: "Ugly Betty", year: 2006, poster: "https://images.metahub.space/poster/medium/tt0460627/img" },
  { id: "tt0285331", name: "The Shield", year: 2002, poster: "https://images.metahub.space/poster/medium/tt0285331/img" },
  { id: "tt0167190", name: "Six Feet Under", year: 2001, poster: "https://images.metahub.space/poster/medium/tt0167190/img" },
  { id: "tt0348914", name: "Nip/Tuck", year: 2003, poster: "https://images.metahub.space/poster/medium/tt0348914/img" },
  { id: "tt1442449", name: "True Blood", year: 2008, poster: "https://images.metahub.space/poster/medium/tt1442449/img" },
  { id: "tt1016216", name: "Mad Men", year: 2007, poster: "https://images.metahub.space/poster/medium/tt1016216/img" },
  { id: "tt1535751", name: "Suits", year: 2011, poster: "https://images.metahub.space/poster/medium/tt1535751/img" },
  { id: "tt1222853", name: "True Detective", year: 2014, poster: "https://images.metahub.space/poster/medium/tt1222853/img" },
  { id: "tt0068098", name: "Columbo", year: 1971, poster: "https://images.metahub.space/poster/medium/tt0068098/img" },
  { id: "tt0092455", name: "Star Trek: The Next Generation", year: 1987, poster: "https://images.metahub.space/poster/medium/tt0092455/img" },
  { id: "tt0106145", name: "Star Trek: Deep Space Nine", year: 1993, poster: "https://images.metahub.space/poster/medium/tt0106145/img" },
  { id: "tt0112178", name: "Star Trek: Voyager", year: 1995, poster: "https://images.metahub.space/poster/medium/tt0112178/img" },
  { id: "tt0108912", name: "Babylon 5", year: 1993, poster: "https://images.metahub.space/poster/medium/tt0108912/img" },
  { id: "tt0417299", name: "Avatar: The Last Airbender", year: 2005, poster: "https://images.metahub.space/poster/medium/tt0417299/img" },
  { id: "tt2575988", name: "Narcos", year: 2015, poster: "https://images.metahub.space/poster/medium/tt2575988/img" },
  { id: "tt3032476", name: "Better Call Saul", year: 2015, poster: "https://images.metahub.space/poster/medium/tt3032476/img" },
  { id: "tt4574334", name: "Stranger Things", year: 2016, poster: "https://images.metahub.space/poster/medium/tt4574334/img" },
  { id: "tt5753856", name: "Dark", year: 2017, poster: "https://images.metahub.space/poster/medium/tt5753856/img" },
  { id: "tt1520117", name: "Person of Interest", year: 2011, poster: "https://images.metahub.space/poster/medium/tt1520117/img" },
  { id: "tt2306299", name: "Vikings", year: 2013, poster: "https://images.metahub.space/poster/medium/tt2306299/img" },
  { id: "tt0103359", name: "Quantum Leap", year: 1989, poster: "https://images.metahub.space/poster/medium/tt0103359/img" },
  { id: "tt1796960", name: "Boardwalk Empire", year: 2010, poster: "https://images.metahub.space/poster/medium/tt1796960/img" },
  { id: "tt0758745", name: "Sons of Anarchy", year: 2008, poster: "https://images.metahub.space/poster/medium/tt0758745/img" },
  { id: "tt0285286", name: "The West Wing", year: 1999, poster: "https://images.metahub.space/poster/medium/tt0285286/img" },
  { id: "tt0443604", name: "Shark Tank", year: 2009, poster: "https://images.metahub.space/poster/medium/tt0443604/img" },
  { id: "tt0436992", name: "Doctor Who", year: 2005, poster: "https://images.metahub.space/poster/medium/tt0436992/img" },
  { id: "tt0367279", name: "Arrested Development", year: 2003, poster: "https://images.metahub.space/poster/medium/tt0367279/img" },
  { id: "tt0108778", name: "Law & Order: SVU", year: 1999, poster: "https://images.metahub.space/poster/medium/tt0203259/img" },
  { id: "tt0203259", name: "Law & Order: SVU", year: 1999, poster: "https://images.metahub.space/poster/medium/tt0203259/img" },
  { id: "tt1124373", name: "The Good Wife", year: 2009, poster: "https://images.metahub.space/poster/medium/tt1124373/img" },
  { id: "tt1266020", name: "Parenthood", year: 2010, poster: "https://images.metahub.space/poster/medium/tt1266020/img" },
  { id: "tt0053479", name: "The Twilight Zone", year: 1959, poster: "https://images.metahub.space/poster/medium/tt0053479/img" },
  { id: "tt0062572", name: "Mission: Impossible", year: 1966, poster: "https://images.metahub.space/poster/medium/tt0062572/img" },
  { id: "tt0072500", name: "The Rockford Files", year: 1974, poster: "https://images.metahub.space/poster/medium/tt0072500/img" },
  { id: "tt0072521", name: "Starsky & Hutch", year: 1975, poster: "https://images.metahub.space/poster/medium/tt0072521/img" },
  { id: "tt0077000", name: "The Incredible Hulk", year: 1977, poster: "https://images.metahub.space/poster/medium/tt0077000/img" },
  { id: "tt0078564", name: "Dallas", year: 1978, poster: "https://images.metahub.space/poster/medium/tt0078564/img" },
  { id: "tt0083399", name: "Cheers", year: 1982, poster: "https://images.metahub.space/poster/medium/tt0083399/img" },
  { id: "tt0092337", name: "Full House", year: 1987, poster: "https://images.metahub.space/poster/medium/tt0092337/img" },
  { id: "tt0096697", name: "The Simpsons", year: 1989, poster: "https://images.metahub.space/poster/medium/tt0096697/img" },
  { id: "tt0098800", name: "The Fresh Prince of Bel-Air", year: 1990, poster: "https://images.metahub.space/poster/medium/tt0098800/img" },
  { id: "tt0096548", name: "Quantum Leap", year: 1989, poster: "https://images.metahub.space/poster/medium/tt0096548/img" },
  { id: "tt1796960", name: "Boardwalk Empire", year: 2010, poster: "https://images.metahub.space/poster/medium/tt1796960/img" },
  { id: "tt2741602", name: "The Americans", year: 2013, poster: "https://images.metahub.space/poster/medium/tt2741602/img" },
  { id: "tt3398228", name: "Silicon Valley", year: 2014, poster: "https://images.metahub.space/poster/medium/tt3398228/img" },
  { id: "tt0460649", name: "How I Met Your Mother", year: 2005, poster: "https://images.metahub.space/poster/medium/tt0460649/img" }
];

const comedySeries = [
  { id: "tt0083399", name: "Cheers", year: 1982, poster: "https://images.metahub.space/poster/medium/tt0083399/img" },
  { id: "tt0098904", name: "Seinfeld", year: 1989, poster: "https://images.metahub.space/poster/medium/tt0098904/img" },
  { id: "tt0108778", name: "Friends", year: 1994, poster: "https://images.metahub.space/poster/medium/tt0108778/img" },
  { id: "tt0098800", name: "The Fresh Prince of Bel-Air", year: 1990, poster: "https://images.metahub.space/poster/medium/tt0098800/img" },
  { id: "tt0092337", name: "Full House", year: 1987, poster: "https://images.metahub.space/poster/medium/tt0092337/img" },
  { id: "tt0094517", name: "Married with Children", year: 1987, poster: "https://images.metahub.space/poster/medium/tt0094517/img" },
  { id: "tt0101009", name: "Home Improvement", year: 1991, poster: "https://images.metahub.space/poster/medium/tt0101009/img" },
  { id: "tt0111958", name: "Boy Meets World", year: 1993, poster: "https://images.metahub.space/poster/medium/tt0111958/img" },
  { id: "tt0098258", name: "Saved by the Bell", year: 1989, poster: "https://images.metahub.space/poster/medium/tt0098258/img" },
  { id: "tt0086687", name: "The Cosby Show", year: 1984, poster: "https://images.metahub.space/poster/medium/tt0086687/img" },
  { id: "tt0083373", name: "Family Ties", year: 1982, poster: "https://images.metahub.space/poster/medium/tt0083373/img" },
  { id: "tt0090290", name: "ALF", year: 1986, poster: "https://images.metahub.space/poster/medium/tt0090290/img" },
  { id: "tt0115147", name: "3rd Rock from the Sun", year: 1996, poster: "https://images.metahub.space/poster/medium/tt0115147/img" },
  { id: "tt0096622", name: "Baywatch", year: 1989, poster: "https://images.metahub.space/poster/medium/tt0096622/img" },
  { id: "tt0386676", name: "The Office", year: 2005, poster: "https://images.metahub.space/poster/medium/tt0386676/img" },
  { id: "tt0367279", name: "Arrested Development", year: 2003, poster: "https://images.metahub.space/poster/medium/tt0367279/img" },
  { id: "tt0285403", name: "Scrubs", year: 2001, poster: "https://images.metahub.space/poster/medium/tt0285403/img" },
  { id: "tt0460649", name: "How I Met Your Mother", year: 2005, poster: "https://images.metahub.space/poster/medium/tt0460649/img" },
  { id: "tt0472954", name: "It's Always Sunny in Philadelphia", year: 2005, poster: "https://images.metahub.space/poster/medium/tt0472954/img" },
  { id: "tt0098936", name: "Twin Peaks", year: 1990, poster: "https://images.metahub.space/poster/medium/tt0098936/img" },
  { id: "tt0096697", name: "The Simpsons", year: 1989, poster: "https://images.metahub.space/poster/medium/tt0096697/img" },
  { id: "tt1439629", name: "Community", year: 2009, poster: "https://images.metahub.space/poster/medium/tt1439629/img" },
  { id: "tt1442437", name: "Parks and Recreation", year: 2009, poster: "https://images.metahub.space/poster/medium/tt1442437/img" },
  { id: "tt0773262", name: "Dexter", year: 2006, poster: "https://images.metahub.space/poster/medium/tt0773262/img" },
  { id: "tt0285403", name: "Scrubs", year: 2001, poster: "https://images.metahub.space/poster/medium/tt0285403/img" },
  { id: "tt1327801", name: "Modern Family", year: 2009, poster: "https://images.metahub.space/poster/medium/tt1327801/img" },
  { id: "tt0903747", name: "Breaking Bad", year: 2008, poster: "https://images.metahub.space/poster/medium/tt0903747/img" },
  { id: "tt0052520", name: "The Andy Griffith Show", year: 1960, poster: "https://images.metahub.space/poster/medium/tt0052520/img" },
  { id: "tt0056751", name: "Bewitched", year: 1964, poster: "https://images.metahub.space/poster/medium/tt0056751/img" },
  { id: "tt0057740", name: "Gilligan's Island", year: 1964, poster: "https://images.metahub.space/poster/medium/tt0057740/img" },
  { id: "tt0053502", name: "The Flintstones", year: 1960, poster: "https://images.metahub.space/poster/medium/tt0053502/img" },
  { id: "tt0063929", name: "The Brady Bunch", year: 1969, poster: "https://images.metahub.space/poster/medium/tt0063929/img" },
  { id: "tt0072505", name: "Happy Days", year: 1974, poster: "https://images.metahub.space/poster/medium/tt0072505/img" },
  { id: "tt0075927", name: "Three's Company", year: 1977, poster: "https://images.metahub.space/poster/medium/tt0075927/img" },
  { id: "tt0078622", name: "Mork & Mindy", year: 1978, poster: "https://images.metahub.space/poster/medium/tt0078622/img" },
  { id: "tt0080306", name: "Diff'rent Strokes", year: 1978, poster: "https://images.metahub.space/poster/medium/tt0080306/img" },
  { id: "tt0096548", name: "Quantum Leap", year: 1989, poster: "https://images.metahub.space/poster/medium/tt0096548/img" },
  { id: "tt0098844", name: "Beverly Hills, 90210", year: 1990, poster: "https://images.metahub.space/poster/medium/tt0098844/img" },
  { id: "tt0103359", name: "Step by Step", year: 1991, poster: "https://images.metahub.space/poster/medium/tt0103359/img" },
  { id: "tt0106008", name: "Sister, Sister", year: 1994, poster: "https://images.metahub.space/poster/medium/tt0106008/img" },
  { id: "tt0114574", name: "Everybody Loves Raymond", year: 1996, poster: "https://images.metahub.space/poster/medium/tt0114574/img" },
  { id: "tt0115243", name: "3rd Rock from the Sun", year: 1996, poster: "https://images.metahub.space/poster/medium/tt0115147/img" },
  { id: "tt0120570", name: "Will & Grace", year: 1998, poster: "https://images.metahub.space/poster/medium/tt0120570/img" },
  { id: "tt0210921", name: "Malcolm in the Middle", year: 2000, poster: "https://images.metahub.space/poster/medium/tt0210921/img" },
  { id: "tt0299226", name: "The King of Queens", year: 1998, poster: "https://images.metahub.space/poster/medium/tt0299226/img" },
  { id: "tt0318283", name: "Two and a Half Men", year: 2003, poster: "https://images.metahub.space/poster/medium/tt0318283/img" },
  { id: "tt0367279", name: "Arrested Development", year: 2003, poster: "https://images.metahub.space/poster/medium/tt0367279/img" },
  { id: "tt0397442", name: "Extras", year: 2005, poster: "https://images.metahub.space/poster/medium/tt0397442/img" },
  { id: "tt0898266", name: "The Big Bang Theory", year: 2007, poster: "https://images.metahub.space/poster/medium/tt0898266/img" },
  { id: "tt1442437", name: "Parks and Recreation", year: 2009, poster: "https://images.metahub.space/poster/medium/tt1442437/img" },
  { id: "tt1439629", name: "Community", year: 2009, poster: "https://images.metahub.space/poster/medium/tt1439629/img" },
  { id: "tt1586680", name: "Louie", year: 2010, poster: "https://images.metahub.space/poster/medium/tt1586680/img" },
  { id: "tt2085059", name: "Black Mirror", year: 2011, poster: "https://images.metahub.space/poster/medium/tt2085059/img" },
  { id: "tt2861424", name: "Rick and Morty", year: 2013, poster: "https://images.metahub.space/poster/medium/tt2861424/img" },
  { id: "tt3501074", name: "Master of None", year: 2015, poster: "https://images.metahub.space/poster/medium/tt3501074/img" },
  { id: "tt4158110", name: "Mr. Robot", year: 2015, poster: "https://images.metahub.space/poster/medium/tt4158110/img" },
  { id: "tt3526078", name: "Unbreakable Kimmy Schmidt", year: 2015, poster: "https://images.metahub.space/poster/medium/tt3526078/img" },
  { id: "tt5753856", name: "Dark", year: 2017, poster: "https://images.metahub.space/poster/medium/tt5753856/img" },
  { id: "tt0348914", name: "Curb Your Enthusiasm", year: 2000, poster: "https://images.metahub.space/poster/medium/tt0264235/img" },
  { id: "tt0264235", name: "Curb Your Enthusiasm", year: 2000, poster: "https://images.metahub.space/poster/medium/tt0264235/img" },
  { id: "tt3398228", name: "Silicon Valley", year: 2014, poster: "https://images.metahub.space/poster/medium/tt3398228/img" },
  { id: "tt0452046", name: "Psych", year: 2006, poster: "https://images.metahub.space/poster/medium/tt0452046/img" },
  { id: "tt1600195", name: "Brooklyn Nine-Nine", year: 2013, poster: "https://images.metahub.space/poster/medium/tt1600195/img" },
  { id: "tt5180504", name: "The Good Place", year: 2016, poster: "https://images.metahub.space/poster/medium/tt5180504/img" }
];

const soapOperas = [
  { id: "tt0043208", name: "The Guiding Light", year: 1952, poster: "https://images.metahub.space/poster/medium/tt0043208/img" },
  { id: "tt0048572", name: "As the World Turns", year: 1956, poster: "https://images.metahub.space/poster/medium/tt0048572/img" },
  { id: "tt0056775", name: "General Hospital", year: 1963, poster: "https://images.metahub.space/poster/medium/tt0056775/img" },
  { id: "tt0059012", name: "Days of Our Lives", year: 1965, poster: "https://images.metahub.space/poster/medium/tt0059012/img" },
  { id: "tt0060008", name: "One Life to Live", year: 1968, poster: "https://images.metahub.space/poster/medium/tt0060008/img" },
  { id: "tt0066626", name: "All My Children", year: 1970, poster: "https://images.metahub.space/poster/medium/tt0066626/img" },
  { id: "tt0069794", name: "The Young and the Restless", year: 1973, poster: "https://images.metahub.space/poster/medium/tt0069794/img" },
  { id: "tt0078564", name: "Dallas", year: 1978, poster: "https://images.metahub.space/poster/medium/tt0078564/img" },
  { id: "tt0078577", name: "Knots Landing", year: 1979, poster: "https://images.metahub.space/poster/medium/tt0078577/img" },
  { id: "tt0080319", name: "Falcon Crest", year: 1981, poster: "https://images.metahub.space/poster/medium/tt0080319/img" },
  { id: "tt0081820", name: "Dynasty", year: 1981, poster: "https://images.metahub.space/poster/medium/tt0081820/img" },
  { id: "tt0092319", name: "The Bold and the Beautiful", year: 1987, poster: "https://images.metahub.space/poster/medium/tt0092319/img" },
  { id: "tt0098844", name: "Beverly Hills, 90210", year: 1990, poster: "https://images.metahub.space/poster/medium/tt0098844/img" },
  { id: "tt0098936", name: "Twin Peaks", year: 1990, poster: "https://images.metahub.space/poster/medium/tt0098936/img" },
  { id: "tt0103542", name: "Melrose Place", year: 1992, poster: "https://images.metahub.space/poster/medium/tt0103542/img" },
  { id: "tt0121220", name: "Dawson's Creek", year: 1998, poster: "https://images.metahub.space/poster/medium/tt0121220/img" },
  { id: "tt0206512", name: "Passions", year: 1999, poster: "https://images.metahub.space/poster/medium/tt0206512/img" },
  { id: "tt0347137", name: "The O.C.", year: 2003, poster: "https://images.metahub.space/poster/medium/tt0347137/img" },
  { id: "tt0374091", name: "Desperate Housewives", year: 2004, poster: "https://images.metahub.space/poster/medium/tt0374091/img" },
  { id: "tt0411008", name: "Lost", year: 2004, poster: "https://images.metahub.space/poster/medium/tt0411008/img" },
  { id: "tt0413573", name: "Grey's Anatomy", year: 2005, poster: "https://images.metahub.space/poster/medium/tt0413573/img" },
  { id: "tt0460627", name: "Ugly Betty", year: 2006, poster: "https://images.metahub.space/poster/medium/tt0460627/img" },
  { id: "tt1016216", name: "Mad Men", year: 2007, poster: "https://images.metahub.space/poster/medium/tt1016216/img" },
  { id: "tt1054487", name: "Dirty Sexy Money", year: 2007, poster: "https://images.metahub.space/poster/medium/tt1054487/img" },
  { id: "tt1405406", name: "Gossip Girl", year: 2007, poster: "https://images.metahub.space/poster/medium/tt1405406/img" },
  { id: "tt1204406", name: "90210", year: 2008, poster: "https://images.metahub.space/poster/medium/tt1204406/img" },
  { id: "tt1442449", name: "True Blood", year: 2008, poster: "https://images.metahub.space/poster/medium/tt1442449/img" },
  { id: "tt1266020", name: "Parenthood", year: 2010, poster: "https://images.metahub.space/poster/medium/tt1266020/img" },
  { id: "tt1520211", name: "The Walking Dead", year: 2010, poster: "https://images.metahub.space/poster/medium/tt1520211/img" },
  { id: "tt1535751", name: "Suits", year: 2011, poster: "https://images.metahub.space/poster/medium/tt1535751/img" },
  { id: "tt1837642", name: "Scandal", year: 2012, poster: "https://images.metahub.space/poster/medium/tt1837642/img" },
  { id: "tt1837888", name: "Homeland", year: 2011, poster: "https://images.metahub.space/poster/medium/tt1837888/img" },
  { id: "tt1843678", name: "Revenge", year: 2011, poster: "https://images.metahub.space/poster/medium/tt1843678/img" },
  { id: "tt1844624", name: "American Horror Story", year: 2011, poster: "https://images.metahub.space/poster/medium/tt1844624/img" },
  { id: "tt2306299", name: "Vikings", year: 2013, poster: "https://images.metahub.space/poster/medium/tt2306299/img" },
  { id: "tt2364582", name: "Peaky Blinders", year: 2013, poster: "https://images.metahub.space/poster/medium/tt2364582/img" },
  { id: "tt2661044", name: "Reign", year: 2013, poster: "https://images.metahub.space/poster/medium/tt2661044/img" },
  { id: "tt2741602", name: "The Americans", year: 2013, poster: "https://images.metahub.space/poster/medium/tt2741602/img" },
  { id: "tt3566726", name: "Jane the Virgin", year: 2014, poster: "https://images.metahub.space/poster/medium/tt3566726/img" },
  { id: "tt3743822", name: "How to Get Away with Murder", year: 2014, poster: "https://images.metahub.space/poster/medium/tt3743822/img" },
  { id: "tt4295140", name: "Empire", year: 2015, poster: "https://images.metahub.space/poster/medium/tt4295140/img" },
  { id: "tt4846340", name: "This Is Us", year: 2016, poster: "https://images.metahub.space/poster/medium/tt4846340/img" },
  { id: "tt5208196", name: "The Crown", year: 2016, poster: "https://images.metahub.space/poster/medium/tt5208196/img" },
  { id: "tt6470478", name: "Riverdale", year: 2017, poster: "https://images.metahub.space/poster/medium/tt6470478/img" },
  { id: "tt0094517", name: "Married with Children", year: 1987, poster: "https://images.metahub.space/poster/medium/tt0094517/img" },
  { id: "tt0083399", name: "Cheers", year: 1982, poster: "https://images.metahub.space/poster/medium/tt0083399/img" },
  { id: "tt0460649", name: "How I Met Your Mother", year: 2005, poster: "https://images.metahub.space/poster/medium/tt0460649/img" },
  { id: "tt0364845", name: "Prison Break", year: 2005, poster: "https://images.metahub.space/poster/medium/tt0364845/img" },
  { id: "tt0455275", name: "Heroes", year: 2006, poster: "https://images.metahub.space/poster/medium/tt0455275/img" },
  { id: "tt1222853", name: "True Detective", year: 2014, poster: "https://images.metahub.space/poster/medium/tt1222853/img" },
  { id: "tt0944947", name: "Game of Thrones", year: 2011, poster: "https://images.metahub.space/poster/medium/tt0944947/img" },
  { id: "tt2575988", name: "Narcos", year: 2015, poster: "https://images.metahub.space/poster/medium/tt2575988/img" },
  { id: "tt4574334", name: "Stranger Things", year: 2016, poster: "https://images.metahub.space/poster/medium/tt4574334/img" },
  { id: "tt2802850", name: "Fargo", year: 2014, poster: "https://images.metahub.space/poster/medium/tt2802850/img" },
  { id: "tt0285286", name: "The West Wing", year: 1999, poster: "https://images.metahub.space/poster/medium/tt0285286/img" },
  { id: "tt0141842", name: "The Sopranos", year: 1999, poster: "https://images.metahub.space/poster/medium/tt0141842/img" },
  { id: "tt0167190", name: "Six Feet Under", year: 2001, poster: "https://images.metahub.space/poster/medium/tt0167190/img" },
  { id: "tt0285331", name: "The Shield", year: 2002, poster: "https://images.metahub.space/poster/medium/tt0285331/img" },
  { id: "tt0348914", name: "Nip/Tuck", year: 2003, poster: "https://images.metahub.space/poster/medium/tt0348914/img" },
  { id: "tt0773262", name: "Dexter", year: 2006, poster: "https://images.metahub.space/poster/medium/tt0773262/img" },
  { id: "tt0903747", name: "Breaking Bad", year: 2008, poster: "https://images.metahub.space/poster/medium/tt0903747/img" },
  { id: "tt1796960", name: "Boardwalk Empire", year: 2010, poster: "https://images.metahub.space/poster/medium/tt1796960/img" },
  { id: "tt3032476", name: "Better Call Saul", year: 2015, poster: "https://images.metahub.space/poster/medium/tt3032476/img" }
];

const cartoonSeries = [
  { id: "tt0053502", name: "The Flintstones", year: 1960, poster: "https://images.metahub.space/poster/medium/tt0053502/img" },
  { id: "tt0054557", name: "The Jetsons", year: 1962, poster: "https://images.metahub.space/poster/medium/tt0054557/img" },
  { id: "tt0066631", name: "Scooby-Doo, Where Are You!", year: 1969, poster: "https://images.metahub.space/poster/medium/tt0066631/img" },
  { id: "tt0086648", name: "He-Man and the Masters of the Universe", year: 1983, poster: "https://images.metahub.space/poster/medium/tt0086648/img" },
  { id: "tt0086690", name: "G.I. Joe: A Real American Hero", year: 1983, poster: "https://images.metahub.space/poster/medium/tt0086690/img" },
  { id: "tt0086817", name: "Transformers", year: 1984, poster: "https://images.metahub.space/poster/medium/tt0086817/img" },
  { id: "tt0086551", name: "Care Bears", year: 1985, poster: "https://images.metahub.space/poster/medium/tt0086551/img" },
  { id: "tt0086728", name: "Thundercats", year: 1985, poster: "https://images.metahub.space/poster/medium/tt0086728/img" },
  { id: "tt0088515", name: "My Little Pony", year: 1986, poster: "https://images.metahub.space/poster/medium/tt0088515/img" },
  { id: "tt0088516", name: "DuckTales", year: 1987, poster: "https://images.metahub.space/poster/medium/tt0088516/img" },
  { id: "tt0092379", name: "Teenage Mutant Ninja Turtles", year: 1987, poster: "https://images.metahub.space/poster/medium/tt0092379/img" },
  { id: "tt0094519", name: "Chip 'n Dale Rescue Rangers", year: 1989, poster: "https://images.metahub.space/poster/medium/tt0094519/img" },
  { id: "tt0096697", name: "The Simpsons", year: 1989, poster: "https://images.metahub.space/poster/medium/tt0096697/img" },
  { id: "tt0098993", name: "TaleSpin", year: 1990, poster: "https://images.metahub.space/poster/medium/tt0098993/img" },
  { id: "tt0101309", name: "Darkwing Duck", year: 1991, poster: "https://images.metahub.space/poster/medium/tt0101309/img" },
  { id: "tt0103584", name: "Batman: The Animated Series", year: 1992, poster: "https://images.metahub.space/poster/medium/tt0103584/img" },
  { id: "tt0103439", name: "Beavis and Butt-Head", year: 1993, poster: "https://images.metahub.space/poster/medium/tt0103439/img" },
  { id: "tt0105950", name: "Rugrats", year: 1991, poster: "https://images.metahub.space/poster/medium/tt0105950/img" },
  { id: "tt0107952", name: "Animaniacs", year: 1993, poster: "https://images.metahub.space/poster/medium/tt0107952/img" },
  { id: "tt0106220", name: "Rocko's Modern Life", year: 1993, poster: "https://images.metahub.space/poster/medium/tt0106220/img" },
  { id: "tt0112167", name: "Pinky and the Brain", year: 1995, poster: "https://images.metahub.space/poster/medium/tt0112167/img" },
  { id: "tt0115163", name: "Dexter's Laboratory", year: 1996, poster: "https://images.metahub.space/poster/medium/tt0115163/img" },
  { id: "tt0118266", name: "King of the Hill", year: 1997, poster: "https://images.metahub.space/poster/medium/tt0118266/img" },
  { id: "tt0118375", name: "Johnny Bravo", year: 1997, poster: "https://images.metahub.space/poster/medium/tt0118375/img" },
  { id: "tt0121955", name: "South Park", year: 1997, poster: "https://images.metahub.space/poster/medium/tt0121955/img" },
  { id: "tt0159206", name: "Pokemon", year: 1997, poster: "https://images.metahub.space/poster/medium/tt0159206/img" },
  { id: "tt0129286", name: "The Powerpuff Girls", year: 1998, poster: "https://images.metahub.space/poster/medium/tt0129286/img" },
  { id: "tt0111360", name: "Cow and Chicken", year: 1997, poster: "https://images.metahub.space/poster/medium/tt0111360/img" },
  { id: "tt0149460", name: "Futurama", year: 1999, poster: "https://images.metahub.space/poster/medium/tt0149460/img" },
  { id: "tt0163503", name: "SpongeBob SquarePants", year: 1999, poster: "https://images.metahub.space/poster/medium/tt0163503/img" },
  { id: "tt0168366", name: "Digimon", year: 1999, poster: "https://images.metahub.space/poster/medium/tt0168366/img" },
  { id: "tt0182576", name: "Family Guy", year: 1999, poster: "https://images.metahub.space/poster/medium/tt0182576/img" },
  { id: "tt0130027", name: "The Fairly OddParents", year: 2001, poster: "https://images.metahub.space/poster/medium/tt0130027/img" },
  { id: "tt0318092", name: "The Grim Adventures of Billy & Mandy", year: 2001, poster: "https://images.metahub.space/poster/medium/tt0318092/img" },
  { id: "tt0367724", name: "Foster's Home for Imaginary Friends", year: 2004, poster: "https://images.metahub.space/poster/medium/tt0367724/img" },
  { id: "tt0397306", name: "Ben 10", year: 2005, poster: "https://images.metahub.space/poster/medium/tt0397306/img" },
  { id: "tt0412398", name: "The Boondocks", year: 2005, poster: "https://images.metahub.space/poster/medium/tt0412398/img" },
  { id: "tt0417299", name: "Avatar: The Last Airbender", year: 2005, poster: "https://images.metahub.space/poster/medium/tt0417299/img" },
  { id: "tt1185836", name: "Star Wars: The Clone Wars", year: 2008, poster: "https://images.metahub.space/poster/medium/tt1185836/img" },
  { id: "tt1305826", name: "Adventure Time", year: 2010, poster: "https://images.metahub.space/poster/medium/tt1305826/img" },
  { id: "tt1358573", name: "Regular Show", year: 2010, poster: "https://images.metahub.space/poster/medium/tt1358573/img" },
  { id: "tt1561211", name: "Bob's Burgers", year: 2011, poster: "https://images.metahub.space/poster/medium/tt1561211/img" },
  { id: "tt1561755", name: "My Little Pony: Friendship Is Magic", year: 2010, poster: "https://images.metahub.space/poster/medium/tt1561755/img" },
  { id: "tt1865718", name: "Gravity Falls", year: 2012, poster: "https://images.metahub.space/poster/medium/tt1865718/img" },
  { id: "tt2788732", name: "Steven Universe", year: 2013, poster: "https://images.metahub.space/poster/medium/tt2788732/img" },
  { id: "tt2861424", name: "Rick and Morty", year: 2013, poster: "https://images.metahub.space/poster/medium/tt2861424/img" },
  { id: "tt3498820", name: "BoJack Horseman", year: 2014, poster: "https://images.metahub.space/poster/medium/tt3498820/img" }
];

// Helper to build meta objects from classic lists
function buildMeta(item, type) {
  return {
    id: item.id,
    type,
    name: item.name,
    year: item.year,
    poster: item.poster,
    background: item.poster
  };
}

const builder = new addonBuilder(manifest);

// ── CATALOG ────────────────────────────────────────────────────────────
builder.defineCatalogHandler(async ({ type, id, extra }) => {
  const skip = parseInt((extra && extra.skip) || 0);
  const PAGE = 40;

  // Internet Archive public domain movies
  if (type === "movie" && id === "falcon-public-domain") {
    const search = extra && extra.search;
    const rows = 20;
    try {
      let url;
      if (search) {
        url = `https://archive.org/advancedsearch.php?q=${encodeURIComponent(search)}+AND+mediatype:movies+AND+licenseurl:*creativecommons*&fl[]=identifier,title,description,year,creator,subject&rows=${rows}&page=1&output=json`;
      } else {
        const page = Math.floor(skip / rows) + 1;
        url = `https://archive.org/advancedsearch.php?q=mediatype:movies+AND+subject:feature+film+AND+licenseurl:*creativecommons*&fl[]=identifier,title,description,year,creator,subject&rows=${rows}&page=${page}&output=json`;
      }
      const res = await axios.get(url, { timeout: 10000 });
      const docs = res.data.response.docs;
      const metas = docs.filter(d => d.identifier && d.title).map(d => ({
        id: `falcon:${d.identifier}`,
        type: "movie",
        name: d.title,
        year: d.year ? parseInt(d.year) : undefined,
        description: d.description || "",
        poster: `https://archive.org/services/img/${d.identifier}`,
        background: `https://archive.org/services/img/${d.identifier}`,
        director: d.creator ? [d.creator] : []
      }));
      return { metas };
    } catch (e) {
      console.error("Catalog error:", e.message);
      return { metas: [] };
    }
  }

  // 80s & 90s classics
  if (type === "movie" && id === "falcon-classics-80s90s") {
    return { metas: classics80s90s.slice(skip, skip + PAGE).map(m => buildMeta(m, "movie")) };
  }

  // 2000s classics
  if (type === "movie" && id === "falcon-classics-2000s") {
    return { metas: classics2000s.slice(skip, skip + PAGE).map(m => buildMeta(m, "movie")) };
  }

  // Horror
  if (type === "movie" && id === "falcon-horror") {
    return { metas: horror.slice(skip, skip + PAGE).map(m => buildMeta(m, "movie")) };
  }

  // Classic TV series
  if (type === "series" && id === "falcon-series-80s90s") {
    return { metas: classicSeries.slice(skip, skip + PAGE).map(m => buildMeta(m, "series")) };
  }

  // Drama
  if (type === "series" && id === "falcon-drama") {
    return { metas: dramaSeries.slice(skip, skip + PAGE).map(m => buildMeta(m, "series")) };
  }

  // Comedy
  if (type === "series" && id === "falcon-comedy") {
    return { metas: comedySeries.slice(skip, skip + PAGE).map(m => buildMeta(m, "series")) };
  }

  // Soap Operas
  if (type === "series" && id === "falcon-soap-opera") {
    return { metas: soapOperas.slice(skip, skip + PAGE).map(m => buildMeta(m, "series")) };
  }

  // Cartoons
  if (type === "series" && id === "falcon-cartoons") {
    return { metas: cartoonSeries.slice(skip, skip + PAGE).map(m => buildMeta(m, "series")) };
  }

  return { metas: [] };
});

// ── META ─────────────────────────────────────────────────────────────
builder.defineMetaHandler(async ({ type, id }) => {
  // Classic content — use IMDB id directly
  if (id.startsWith("tt")) {
    const allMovies = [...classics80s90s, ...classics2000s, ...horror];
    const allSeries = [...classicSeries, ...dramaSeries, ...comedySeries, ...soapOperas, ...cartoonSeries];
    const all = type === "series" ? allSeries : allMovies;
    const item = all.find(m => m.id === id);
    if (item) return { meta: buildMeta(item, type) };
    // Not in our list but valid tt id — return basic meta so Cinemeta can fill it
    return { meta: { id, type, name: id } };
  }

  // Internet Archive content
  if (type !== "movie" || !id.startsWith("falcon:")) return { meta: null };
  const identifier = id.replace("falcon:", "");
  try {
    const res = await axios.get(`https://archive.org/metadata/${identifier}`, { timeout: 10000 });
    const data = res.data;
    const meta = data.metadata || {};
    return {
      meta: {
        id,
        type: "movie",
        name: Array.isArray(meta.title) ? meta.title[0] : (meta.title || identifier),
        year: meta.year ? parseInt(meta.year) : undefined,
        description: Array.isArray(meta.description) ? meta.description[0] : (meta.description || ""),
        poster: `https://archive.org/services/img/${identifier}`,
        background: `https://archive.org/services/img/${identifier}`,
        director: meta.creator ? (Array.isArray(meta.creator) ? meta.creator : [meta.creator]) : []
      }
    };
  } catch (e) {
    console.error("Meta error:", e.message);
    return { meta: null };
  }
});

// ── STREAMS ───────────────────────────────────────────────────────────
builder.defineStreamHandler(async ({ type, id }) => {
  // Classic IMDB content — no direct streams, let other addons handle it
  if (id.startsWith("tt")) return { streams: [] };

  // Internet Archive streams
  if (type !== "movie" || !id.startsWith("falcon:")) return { streams: [] };
  const identifier = id.replace("falcon:", "");
  try {
    const res = await axios.get(`https://archive.org/metadata/${identifier}`, { timeout: 10000 });
    const files = res.data.files || [];
    const priority = [".mp4", ".ogv", ".avi", ".mkv"];
    const videoFiles = files
      .filter(f => priority.some(ext => f.name.toLowerCase().endsWith(ext)))
      .sort((a, b) => {
        const ai = priority.findIndex(ext => a.name.toLowerCase().endsWith(ext));
        const bi = priority.findIndex(ext => b.name.toLowerCase().endsWith(ext));
        return ai - bi;
      });
    const streams = videoFiles.slice(0, 3).map(f => ({
      title: `Falcon – ${f.name}`,
      url: `https://archive.org/download/${identifier}/${encodeURIComponent(f.name)}`
    }));
    return { streams };
  } catch (e) {
    console.error("Stream error:", e.message);
    return { streams: [] };
  }
});

// ── SERVE ─────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 7000;
serveHTTP(builder.getInterface(), { port: PORT });
console.log(`🦅 Falcon addon running on port ${PORT}`);
