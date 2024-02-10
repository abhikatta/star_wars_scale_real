export type StarWarsData = {
  count: number;
  next: null;
  previous: null;
  results: [
    {
      title: string;
      episode_id: number;
      opening_crawl: string;
      director: string;
      producer: string;
      release_date: string;
      characters: string[];
      planets: string[];
      starships: string[];
      vehicles: string[];
      species: string[];
      created: string;
      edited: string;
      url: string;
    }
  ];
};

export const sortType = {
  year: {
    ascending: "YEAR_ASCENDING",
    descending: "YEAR_DESCENDING",
  },
  episode: {
    ascending: "EPISODE_ASCENDING",
    descending: "EPISODE_DESCENDING",
  },
};
