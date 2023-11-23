import React, { useContext, useReducer } from "react";
import Grid from "@mui/material/Grid";
import { Button, Container } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import { useNavigate, useSearchParams } from "react-router-dom";

import MovieCard from "../components/MovieCard";
import PageContext from "../context/PageContext";

///////////STYLES//////////////

const stackStyle = {
  marginTop: "5px",

  backgroundColor: "blue",
  display: "flex",
  alignItems: "center",
};

const cardStyle = {
  display: "flex",
  flexDirection: "column",
  // justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#1565c0",
  // width: "80vw",
  marginTop: "6px",
};
const gridStyle = {
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "space-evenly",
  // alignItems: "center",
  marginTop: "6px",
};
///////////////////

const initialState = {
  pagePopular: 1,
  pageUpComing: 1,
  pageTopRated: 1,
};

function reducer(stateHomePage, action) {
  switch (action.type) {
    case "SET_PAGE_PopularMovie":
      return { ...stateHomePage, pagePopular: action.payload };
    case "SET_PAGE_UpComing":
      return { ...stateHomePage, pageUpComing: action.payload };
    case "SET_PAGE_TopRated":
      return { ...stateHomePage, pageTopRated: action.payload };

    default:
      throw new Error("Invalid Action");
  }
}

function HomePage() {
  const [stateHomePage, dispatchHomePage] = useReducer(reducer, initialState);

  const { state, getData, dispatch } = useContext(PageContext);
  const {
    dataPopularMovie,
    dataUpComing,
    dataTopRated,
    pageDataPopularMovie,
    pageDataUpComing,
    pageDataTopRated,
  } = state;

  const { pagePopular, pageUpComing, pageTopRated } = stateHomePage;

  console.log("dataHome:", dataPopularMovie);

  const handleChangePopularMovie = (e, p) => {
    dispatchHomePage({ type: "SET_PAGE_PopularMovie", payload: p });
  };
  const handleChangeUpComing = (e, p) => {
    dispatchHomePage({ type: "SET_PAGE_UpComing", payload: p });
  };
  const handleChangeTopRated = (e, p) => {
    dispatchHomePage({ type: "SET_PAGE_TopRated", payload: p });
  };
  /////////////// PopularMovie/////////////////
  const handlePrevDataPopularMovie = () => {
    if (pageDataPopularMovie > 1) {
      dispatch({
        type: "SET_PAGE_DATA_PopularMovie",
        payload: pageDataPopularMovie - 1,
      });
    }
  };
  const handleNextDataPopularMovie = () => {
    dispatch({
      type: "SET_PAGE_DATA_PopularMovie",
      payload: pageDataPopularMovie + 1,
    });
  };
  ///////////////////////////////////////////////
  /////////////// Up Coming/////////////////
  const handlePrevDataUpComing = () => {
    if (pageDataUpComing > 1) {
      dispatch({
        type: "SET_PAGE_DATA_UpComing",
        payload: pageDataUpComing - 1,
      });
    }
  };
  const handleNextDataUpComing = () => {
    dispatch({
      type: "SET_PAGE_DATA_UpComing",
      payload: pageDataUpComing + 1,
    });
  };
  ///////////////////////////////////////////////
  ///////////////////Top Rated/////////////////
  const handlePrevDataTopRated = () => {
    if (pageDataTopRated > 1) {
      dispatch({
        type: "SET_PAGE_DATA_TopRated",
        payload: pageDataTopRated - 1,
      });
    }
  };
  const handleNextDataTopRated = () => {
    dispatch({
      type: "SET_PAGE_DATA_TopRated",
      payload: pageDataTopRated + 1,
    });
  };
  /////////////////////////////////////////////
  if (!dataPopularMovie) {
    <div>Loading...</div>;
    getData();
  } else if (!dataUpComing) {
    <div>Loading...</div>;
    getData();
  } else if (!dataTopRated) {
    <div>Loading...</div>;
    getData();
  } else {
    return (
      <Container>
        {/* /////////// Popular Movie/////////////// */}
        <Container style={cardStyle}>
          <Typography variant="h5" component="div">
            Popular Movie
          </Typography>

          <Grid style={gridStyle}>
            {dataPopularMovie
              ?.slice((pagePopular - 1) * 5, (pagePopular - 1) * 5 + 5)
              .map((movie) => {
                return (
                  <Grid key={movie.id} item xs={12} lg={4}>
                    <MovieCard movie={movie} />
                  </Grid>
                );
              })}
          </Grid>

          <Grid style={stackStyle}>
            <SkipPreviousIcon onClick={handlePrevDataPopularMovie} />
            <Pagination
              count={Math.ceil(dataPopularMovie.length / 5)}
              color="primary"
              onChange={handleChangePopularMovie}
              page={pagePopular}
            />
            <SkipNextIcon onClick={handleNextDataPopularMovie} />
          </Grid>
        </Container>

        {/*/////////////// UpComing///////////////// */}
        <Container style={cardStyle}>
          <Typography variant="h5" component="div">
            Up Coming
          </Typography>

          <Grid style={gridStyle}>
            {dataUpComing
              ?.slice((pageUpComing - 1) * 5, (pageUpComing - 1) * 5 + 5)
              .map((movie) => {
                return (
                  <Grid key={movie.id} item xs={12} lg={4}>
                    <MovieCard movie={movie} />
                  </Grid>
                );
              })}
          </Grid>

          <Grid style={stackStyle}>
            <SkipPreviousIcon onClick={handlePrevDataUpComing} />
            <Pagination
              count={Math.ceil(dataUpComing.length / 5)}
              color="primary"
              onChange={handleChangeUpComing}
              page={pageUpComing}
            />
            <SkipNextIcon onClick={handleNextDataUpComing} />
          </Grid>
        </Container>

        {/*/////////////// Top Rated///////////////// */}
        <Container style={cardStyle}>
          <Typography variant="h5" component="div">
            Top Rated
          </Typography>

          <Grid style={gridStyle}>
            {dataTopRated
              ?.slice((pageTopRated - 1) * 5, (pageTopRated - 1) * 5 + 5)
              .map((movie) => {
                return (
                  <Grid key={movie.id} item xs={12} lg={4}>
                    <MovieCard movie={movie} />
                  </Grid>
                );
              })}
          </Grid>

          <Grid style={stackStyle}>
            <SkipPreviousIcon onClick={handlePrevDataTopRated} />

            <Pagination
              count={Math.ceil(dataTopRated.length / 5)}
              color="primary"
              onChange={handleChangeTopRated}
              page={pageTopRated}
            />

            <SkipNextIcon onClick={handleNextDataTopRated} />
          </Grid>
        </Container>
      </Container>
    );
  }
}

export default HomePage;
