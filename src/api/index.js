import axios from "axios";

const url = "https://covid19.mathdro.id/api";

export const fetchData = async (country) => {
  let newUrl = url;
  if (country) {
    newUrl = `${url}/countries/${country}`;
  }
  try {
    const {
      data: { confirmed, recovered, deaths, lastUpdate },
    } = await axios.get(newUrl);
    return {
      confirmed,
      recovered,
      deaths,
      lastUpdate,
    };
  } catch (error) {
    console.log(error);
  }
};

export const fetchDailyData = async () => {
  try {
    const response = await axios.get(`${url}/daily`);
    const { data } = response;
    const modifiedData = data.map((dailyData) => ({
      confirmed: dailyData.confirmed.total,
      deaths: dailyData.deaths.total,
      date: dailyData.reportDate,
    }));

    return modifiedData;
  } catch (error) {
    console.log(error);
  }
};

export const fetchCountries = async () => {
  try {
    const response = await axios.get(`${url}/countries`);
    const {
      data: { countries },
    } = response;
    const modifiedData = countries.map((country) => country.name);
    return modifiedData;
  } catch (error) {
    console.log(error);
  }
};
