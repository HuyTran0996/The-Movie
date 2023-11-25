import { createContext, useReducer, useEffect } from "react";
import {
  FetchPopularMovie,
  FetchUpComing,
  FetchTopRated,
  FetchSearch,
  FetchFilter,
  FetchDetail,
} from "../data/FetchData";

const PageContext = createContext();

const initialState = {
  dataPopularMovie: null,
  dataUpComing: null,
  dataTopRated: null,
  dataSearch: null,
  dataFilter: null,
  dataDetail: null,
  ////////////////
  pageDataPopularMovie: 1,
  pageDataUpComing: 1,
  pageDataTopRated: 1,
  pageDataSearch: 1,
  pageDataFilter: 1,
  ////////////
  genre: localStorage.getItem("genre"),
  year: localStorage.getItem("year"),
  sort: localStorage.getItem("sort"),
  search: localStorage.getItem("search"),
  /////////////
  filterAppBarOpen: false,
  movieId: localStorage.getItem("movieId"),
};

function reducer(state, action) {
  switch (action.type) {
    /////////////DATA////////////////
    case "SET_DATA_PopularMovie":
      return { ...state, dataPopularMovie: action.payload };
    case "SET_DATA_UpComing":
      return { ...state, dataUpComing: action.payload };
    case "SET_DATA_TopRated":
      return { ...state, dataTopRated: action.payload };
    case "SET_DATA_SEARCH":
      return { ...state, dataSearch: action.payload };
    case "SET_DATA_FILTER":
      return { ...state, dataFilter: action.payload };
    case "SET_DATA_DETAIL":
      return { ...state, dataDetail: action.payload };
    //////////////////PAGE of DATA////////////
    case "SET_PAGE_DATA_PopularMovie":
      return { ...state, pageDataPopularMovie: action.payload };
    case "SET_PAGE_DATA_UpComing":
      return { ...state, pageDataUpComing: action.payload };
    case "SET_PAGE_DATA_TopRated":
      return { ...state, pageDataTopRated: action.payload };
    case "SET_PAGE_DATA_Search":
      return { ...state, pageDataSearch: action.payload };
    case "SET_PAGE_DATA_Filter":
      return { ...state, pageDataFilter: action.payload };
    ////////////////////////Value//////////////
    case "SET_SEARCH":
      return { ...state, search: action.payload };
    case "SET_GENRE":
      return { ...state, genre: action.payload };
    case "SET_YEAR":
      return { ...state, year: action.payload };
    case "SET_SORT":
      return { ...state, sort: action.payload };
    /////////////////////////////
    case "SET_FILTER_APP_BAR":
      return { ...state, filterAppBarOpen: action.payload };
    case "SET_MOVIE_ID":
      return { ...state, movieId: action.payload };

    default:
      throw new Error("Invalid Action");
  }
}

function PageProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const {
    dataPopularMovie,
    dataUpComing,
    dataTopRated,
    dataSearch,
    dataFilter,
    dataDetail,
    pageDataPopularMovie,
    pageDataUpComing,
    pageDataTopRated,
    pageDataSearch,
    pageDataFilter,
    search,
    genre,
    year,
    sort,
    filterAppBarOpen,
    movieId,
  } = state;
  const currentUrl = typeof window !== "undefined" ? window.location.href : "";
  console.log("current Url:", currentUrl);
  console.log("page top rated", pageDataTopRated);
  const getData = async () => {
    try {
      if (currentUrl.includes("search")) {
        const result = await FetchSearch(search, pageDataSearch);
        dispatch({ type: "SET_DATA_SEARCH", payload: result });
      } else if (currentUrl.includes("filter")) {
        const result = await FetchFilter(genre, year, sort, pageDataFilter);
        dispatch({ type: "SET_DATA_FILTER", payload: result });
      } else if (currentUrl.includes("detail")) {
        const result = await FetchDetail(movieId);
        dispatch({ type: "SET_DATA_DETAIL", payload: result });
      } else {
        const resultPopularMovie = await FetchPopularMovie(
          pageDataPopularMovie
        );
        const resultUpComing = await FetchUpComing(pageDataUpComing);
        const resultTopRated = await FetchTopRated(pageDataTopRated);
        dispatch({
          type: "SET_DATA_PopularMovie",
          payload: resultPopularMovie,
        });
        dispatch({
          type: "SET_DATA_UpComing",
          payload: resultUpComing,
        });
        dispatch({
          type: "SET_DATA_TopRated",
          payload: resultTopRated,
        });
        return;
      }
    } catch (err) {
      console.log(`Error Home: ${err.name}: ${err.message}`);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    getData();
  }, [
    pageDataPopularMovie,
    pageDataUpComing,
    pageDataTopRated,
    pageDataSearch,
    pageDataFilter,
  ]);

  const valueToShare = { state, dispatch, getData };
  return (
    <PageContext.Provider value={valueToShare}>{children}</PageContext.Provider>
  );
}

export { PageProvider };
export default PageContext;
