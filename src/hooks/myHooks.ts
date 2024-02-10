import { useState, useEffect } from "react";
import { StarWarsData } from "../types";

const useStarWarsData = () => {
  const [data, setData] = useState<StarWarsData | null>(null);
  const endpoint = "https://swapi.dev/api/films/?format=json";
  const fetchStarWarsData = async () => {
    await fetch(endpoint)
      .then((value) => {
        return value.json();
      })
      .then((data) => {
        console.log(data);
        setData(data);
        localStorage.setItem("data", JSON.stringify(data));
        return null;
      });
  };

  useEffect(() => {
    if (localStorage.getItem("data") === null) {
      fetchStarWarsData();
    } else {
      console.log("data fetched from localStorage");

      setData(JSON.parse(localStorage.getItem("data") || ""));
    }
  }, []);

  return data;
};
export { useStarWarsData };
