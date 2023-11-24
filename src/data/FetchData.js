import { BASE_URL, API_KEY } from "../app/config";
import axios from "axios";
const FetchPopularMovie = async (pageDataPopularMovie) => {
  try {
    const data = await axios.get(
      `${BASE_URL}/movie/popular?${API_KEY}&language=en-US&page=${pageDataPopularMovie}`
    );

    let dataNeeded = data.data.results;
    console.log("dataNeeded FetchPopularMovie", dataNeeded);
    return dataNeeded;
  } catch (err) {
    console.log(`Error FetchPopularMovie: ${err.name}: ${err.message}`);
  }
};
const FetchUpComing = async (pageDataUpComing) => {
  try {
    const data = await axios.get(
      `${BASE_URL}/movie/upcoming?${API_KEY}&language=en-US&page=${pageDataUpComing}`
    );

    let dataNeeded = data.data.results;
    console.log("dataNeeded FetchUpComing", dataNeeded);
    return dataNeeded;
  } catch (err) {
    console.log(`Error FetchUpComing: ${err.name}: ${err.message}`);
  }
};

const FetchTopRated = async (pageDataTopRated) => {
  try {
    const data = await axios.get(
      `${BASE_URL}/movie/top_rated?${API_KEY}&language=en-US&page=${pageDataTopRated}`
    );

    let dataNeeded = data.data.results;
    console.log("dataNeeded FetchTopRated", dataNeeded);
    return dataNeeded;
  } catch (err) {
    console.log(`Error FetchTopRated: ${err.name}: ${err.message}`);
  }
};

const FetchSearch = async (search, pageDataSearch) => {
  try {
    const data = await axios.get(
      `${BASE_URL}/search/movie?${API_KEY}&page=${pageDataSearch}&query=${search}`
    );
    let dataNeeded = data.data.results;
    console.log("dataNeeded FetchSearch", dataNeeded);
    return dataNeeded;
  } catch (err) {
    console.log(`Error FetchSearch: ${err.name}: ${err.message}`);
  }
};
const FetchFilter = async (genre, year, sort, pageDataFilter) => {
  try {
    const data = await axios.get(
      `${BASE_URL}/discover/movie?${API_KEY}&language=en-US&page=${pageDataFilter}&primary_release_year=${year}&sort_by=${sort}&with_genres=${genre}`
    );
    let dataNeeded = data.data.results;
    console.log("dataNeeded FetchFilter", dataNeeded);
    return dataNeeded;
  } catch (err) {
    console.log(`Error FetchFilter: ${err.name}: ${err.message}`);
  }
};

export {
  FetchPopularMovie,
  FetchUpComing,
  FetchTopRated,
  FetchSearch,
  FetchFilter,
};
