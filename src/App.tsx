import { useState } from "react";
import { useStarWarsData } from "./hooks/myHooks";
import { formatTitle } from "./utils/romanNum";

const App = () => {
  const data = useStarWarsData();
  const [searchFor, setSearchFor] = useState<string>();
  const [currentSelectedID, setCurrentSelectedID] = useState<number>();
  const [sortBy, setSortBy] = useState<string>();

  return (
    <>
      <nav className="h-[3rem] bg-slate-800 items-center flex flex-row max-w-screen ">
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
