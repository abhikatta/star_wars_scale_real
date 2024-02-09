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
      });
  };

  useEffect(() => {
    fetchStarWarsData();
  }, []);

  return data;
};
export { useStarWarsData };
