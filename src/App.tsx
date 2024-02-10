import { useEffect, useState } from "react";
import { useStarWarsData } from "./hooks/myHooks";
import { formatTitle } from "./utils/romanNum";
import { StarWarsData } from "./types";

const App = () => {
  const data = useStarWarsData();
  const [searchFor, setSearchFor] = useState<string>();
  const [currentSelectedID, setCurrentSelectedID] = useState<number>();
  const [sortBy, setSortBy] = useState<string>();
  const [sortResults, setSortResults] = useState<
    StarWarsData["results"] | null
  >();
  useEffect(() => {
    if (data?.results) {
      setSortResults(data.results);
    }
  }, [data]);
  function sortData(value: string) {
    setSortBy(value);
    if (value === "episode") {
      const newSortedData = sortResults?.sort(
        (a, b) => a.episode_id - b.episode_id
      );
      setSortResults(newSortedData);
    } else if (value === "year") {
      const newSortedData = sortResults?.sort((a, b) => {
        const data1 = a.release_date.toUpperCase();
        const data2 = b.release_date.toUpperCase();
        if (data1 > data2) {
          return 1;
        } else if (data1 < data2) {
          return -1;
        } else {
          return 0;
        }
      });
      setSortResults(newSortedData);
    }
  }

  return (
    <>
      <nav className="h-[3rem] px-5 gap-5 bg-slate-800 items-center flex flex-row max-w-screen ">
        <select
          onChange={(e) => sortData(e.target.value)}
          className="rounded-sm px-2 py-1">
          <option value={""} hidden>
            Sort By..
          </option>
          <option value={"year"}>Year</option>
          <option value={"episode"}>Episode</option>
        </select>
        <input
          className="w-full rounded-sm  px-2 py-1  outline-none"
          type="text"
          value={searchFor}
          onChange={(e) => setSearchFor(e.target.value)}
          placeholder="Type to Search..."></input>
      </nav>
      {sortResults ? (
        <div className=" min-h-screen w-full px-5 h-screen">
          <div className="w-full flex flex-row justify-between">
            <div className="flex flex-col w-full">
              {sortResults?.map((v, i) => {
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

            <div className="w-full px-4 h-screen border-l-2 items-center">
              {currentSelectedID ? (
                <div className=" flex flex-col h-full w-full items-start justify-start p-4">
                  <p className="text-xl text-slate-700 pb-5">
                    {formatTitle(
                      currentSelectedID,
                      data?.results.find(
                        (a) => a.episode_id === currentSelectedID
                      )?.title
                    )}
                  </p>
                  <p>
                    {
                      data?.results.find(
                        (a) => a.episode_id === currentSelectedID
                      )?.opening_crawl
                    }
                  </p>
                  <p className="pt-5">
                    Directed by:{" "}
                    {
                      data?.results.find(
                        (a) => a.episode_id === currentSelectedID
                      )?.director
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
