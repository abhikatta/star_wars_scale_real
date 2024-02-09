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
                    className=" border-b-[1px] py-4 flex flex-row  gap-3">
                    <p>EPISODE {v.episode_id}</p>
                    <p>{formatTitle(v.episode_id, v.title)}</p>
                  </div>
                );
              })}
            </div>

            <div className="w-full px-4 border-l-2 items-center">
              {currentSelectedID ? (
                <>
                  <p>
                    {formatTitle(
                      currentSelectedID,
                      data.results[currentSelectedID - 1]?.title
                    )}
                  </p>
                  <p>{data?.results[currentSelectedID - 1]?.opening_crawl}</p>
                </>
              ) : (
                <p>asdhjasbhdj</p>
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
