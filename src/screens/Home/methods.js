import { TABLE_WORLD_WIDE_CASES } from './constants'

export const getCovidSummaryData = () => {

  return fetch(TABLE_WORLD_WIDE_CASES)
    .then((response) => response.json())
    .then((json) => {
      return json;
    })
    .catch((error) => {
      console.log(error);
      return false;
    });


}