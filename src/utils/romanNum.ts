import { StarWarsData } from "../types";

export function formatTitle(num: number, title: string | undefined): string {
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
  return `Episode ${roman} - ${title ? title : ""}`;
}
export function getDetails(
  data: StarWarsData["results"],
  currentSelectedID: number
) {
  for (let index = 0; index < data.length; index++) {
    const element = data[index];
    if (element.episode_id == currentSelectedID) {
      return [data[index]];
    }
  }
}
