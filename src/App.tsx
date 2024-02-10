import { useCallback, useEffect, useMemo, useState } from "react";
import { useStarWarsData } from "./hooks/myHooks";
import { formatTitle } from "./utils/romanNum";
import { StarWarsData, sortType } from "./types";

const App = () => {
  const data = useStarWarsData();
  const [searchFor, setSearchFor] = useState<string>();
  const [currentSelectedID, setCurrentSelectedID] = useState<number>();
  const [sortBy, setSortBy] = useState<string | null>(null);
  const [movies, setMovies] = useState<StarWarsData["results"] | null>();

  useEffect(() => {
    setMovies(data?.results);
  }, [data]);

  const sortItems = useMemo(() => {
    if (movies) {
      let sortMovies = [...movies];

      if (sortBy === sortType.episode.ascending) {
        sortMovies = sortMovies.sort((a, b) => a.episode_id - b.episode_id);
      } else if (sortBy === sortType.episode.descending) {
        sortMovies = sortMovies.sort((a, b) => b.episode_id - a.episode_id);
      } else if (sortBy === sortType.year.ascending) {
        sortMovies = sortMovies.sort((a, b) => {
          const movie1: string = a.release_date;
          const movie2: string = b.release_date;
          return movie1 > movie2 ? 1 : movie1 < movie2 ? -1 : 0;
        });
      } else if (sortBy === sortType.year.descending) {
        sortMovies = sortMovies.sort((a, b) => {
          const movie1 = a.release_date;
          const movie2 = b.release_date;
          return movie1 < movie2 ? 1 : movie1 > movie2 ? -1 : 0;
        });
      }

      return sortMovies;
    }

    return movies;
  }, [sortBy, movies]);

  const filteredItems = useMemo(() => {
    if (movies) {
      let searchMovies = [...(sortItems ?? movies)];

      if (searchFor && searchFor.length > 0) {
        searchMovies = searchMovies?.filter((item) =>
          item.title.toLowerCase().includes(searchFor.toLowerCase())
        );
      }
      return searchMovies;
    } else return movies;
  }, [movies, searchFor, sortItems]);

  const onSearchChange = useCallback((value?: string) => {
    if (value) {
      setSearchFor(value);
    } else {
      setSearchFor("");
    }
  }, []);

  return (
    <>
      <nav className="h-[3rem] px-5 gap-5 bg-slate-800 items-center flex flex-row max-w-screen ">
        <select
          value={sortBy || ""}
          onChange={(e) => setSortBy(e.target.value)}
          className="rounded-sm px-2 py-1">
          <optgroup label="Year">
            <option value={""} hidden>
              Sort By..
            </option>
            <option value={sortType.year.ascending}>Year Ascending</option>
            <option value={sortType.year.descending}>Year Descending</option>
          </optgroup>
          <optgroup label="Episode">
            <option value={sortType.episode.ascending}>
              Episode Ascending
            </option>
            <option value={sortType.episode.descending}>
              Episode Descending
            </option>
          </optgroup>
        </select>
        <input
          className="w-full rounded-sm  px-2 py-1  outline-none"
          type="text"
          value={searchFor}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Type to Search..."></input>
      </nav>
      {filteredItems ? (
        <div className=" w-full px-5 lg:h-[90vh]">
          <div className="w-full flex flex-row justify-between">
            <div className="flex flex-col w-full">
              {filteredItems?.map((v, i) => {
                return (
                  <div
                    key={i}
                    onClick={() => {
                      console.log(i, v.episode_id);
                      setCurrentSelectedID(v.episode_id);
                    }}
                    className="border-b-[1px] py-4 flex flex-row justify-between gap-3 px-5
                     hover:cursor-pointer hover:bg-slate-50">
                    <div className="flex flex-row justify-between items-center">
                      <p className="text-xs pr-10">EPISODE {v.episode_id}</p>
                      <p>{formatTitle(v.episode_id, v.title)}</p>
                    </div>
                    <p>{v.release_date}</p>
                  </div>
                );
              })}
            </div>

            <div className="w-full px-4 lg:h-[93.5vh] h-full border-l-2 items-center">
              {currentSelectedID ? (
                <div className=" flex flex-col h-full w-full items-start justify-start p-4">
                  <p className="text-xl text-slate-700 pb-5">
                    {formatTitle(
                      currentSelectedID,
                      movies?.find((a) => a.episode_id === currentSelectedID)
                        ?.title
                    )}
                  </p>
                  <p>
                    {
                      movies?.find((a) => a.episode_id === currentSelectedID)
                        ?.opening_crawl
                    }
                  </p>
                  <p className="pt-5">
                    Directed by:{" "}
                    {
                      movies?.find((a) => a.episode_id === currentSelectedID)
                        ?.director
                    }
                  </p>
                </div>
              ) : (
                <div className=" flex h-full w-full items-center justify-center">
                  <p>No movie selected</p>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="h-auto pt-[20%] w-screen max-w-screen flex items-center justify-center text-2xl">
          <p>Loading...</p>
        </div>
      )}
    </>
  );
};

export default App;
