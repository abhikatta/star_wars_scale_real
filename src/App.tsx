import { useState } from "react";
import { useStarWarsData } from "./hooks/myHooks";

const App = () => {
  const data = useStarWarsData();
  const [searchFor, setSearchFor] = useState<string>();

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
  return data ? (
    <>
      <nav className="h-[3rem] px-2 items-center flex flex-row justify-between gap-3 ">
        <select value={"asds"} className="  rounded-md px-2 py-1">
          <option className="">asd1</option>
          <option className="">asd2</option>
        </select>
        <input
          className="w-full rounded-sm  px-2 py-1  outline-none"
          type="text"
          value={searchFor}
          onChange={(e) => setSearchFor(e.target.value)}
          placeholder="Type to Search..."></input>
      </nav>
      <div
        className="h-full min-h-screen w-full py-10 px-5 
     ">
        <div className="w-full flex flex-row justify-between">
          <div className="flex flex-col w-full">
            {data?.results.map((v, i) => {
              return (
                <div className=" border-b-[1px] py-4 flex flex-row  gap-3">
                  <p>EPISODE {v.episode_id}</p>
                  <p>{formatTitle(v.episode_id, v.title)}</p>
                </div>
              );
            })}
          </div>
          <hr className="rotate-90"></hr>
          <div className="w-full">
            {/* <p>{data?.results[0].opening_crawl}</p> */}
          </div>
        </div>
      </div>
    </>
  ) : (
    <div className="h-screen w-screen flex items-center justify-center text-2xl">
      <p>Loading...</p>
    </div>
  );
};

export default App;
