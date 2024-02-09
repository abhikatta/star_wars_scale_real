import { useState } from "react";
import { useStarWarsData } from "./hooks/myHooks";

const App = () => {
  const data = useStarWarsData();
  const [searchFor, setSearchFor] = useState<string>();
  const [currentSelectedID, setCurrentSelectedID] = useState<number>();
  const [sortBy, setSortBy] = useState<string>();
  function formatTitle(num: number, title: string): string {
    var lookup: any = {
        M: 1000,
        CM: 900,
        D: 500,
        CD: 400,
        C: 100,
        XC: 90,
        L: 50,
        XL: 40,
        X: 10,
        IX: 9,
        V: 5,
        IV: 4,
        I: 1,
      },
      roman = "",
      i;
    for (i in lookup) {
      while (num >= lookup[i]) {
        roman += i;
        num -= lookup[i];
      }
    }
    return `Episode ${roman} - ${title}`;
  }
  return (
    <>
      <nav className="h-[3rem] bg-slate-300 items-center flex flex-row max-w-screen ">
        <select value={"Sort By.."} className="rounded-md px-2 py-1">
          <option disabled hidden>
            Sort By..
          </option>
          <option>Episode</option>
          <option>Year</option>
        </select>
        <input
          className="w-full rounded-sm  px-2 py-1  outline-none"
          type="text"
          value={searchFor}
          onChange={(e) => setSearchFor(e.target.value)}
          placeholder="Type to Search..."></input>
      </nav>
      {data ? (
        <div className=" min-h-screen w-full px-5 h-screen">
          <div className="w-full flex flex-row justify-between">
            <div className="flex flex-col w-full">
              {data?.results.map((v, i) => {
                return (
                  <div
                    onClick={() => setCurrentSelectedID(v.episode_id)}
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
                      data.results[currentSelectedID - 1]?.title
                    )}
                  </p>
                  <p>{data?.results[currentSelectedID - 1]?.opening_crawl}</p>
                  <p className="pt-5">
                    Directed by:{" "}
                    {data?.results[currentSelectedID - 1]?.director}
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
