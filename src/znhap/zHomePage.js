import React, { useContext, useReducer } from "react";
import Grid from "@mui/material/Grid";
import { Button, Container } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import { red, white } from "@mui/material/colors";
import { useNavigate, useSearchParams } from "react-router-dom";

import MovieCard from "../components/MovieCard";
import PageContext from "../context/PageContext";
import Loading from "../components/Loading";

///////////STYLES//////////////

const stackStyle = {
  marginTop: "5px",
  // backgroundColor: "blue",
  display: "flex",
  alignItems: "center",
};

const cardStyle = {
  display: "flex",
  flexDirection: "column",
  // justifyContent: "center",
  alignItems: "center",
  // backgroundColor: "#1565c0",
  width: "70vw",
  marginTop: "6px",
};
const gridStyle = {
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "space-evenly",
  // alignItems: "center",
  marginTop: "6px",
};

const apiStyle = {
  cursor: "pointer",
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

  if (!dataPopularMovie || !dataUpComing || !dataTopRated) {
    getData();
    return <Container style={cardStyle}>{Loading()}</Container>;
  } else {
    return (
      <Container>
        {/* /////////// Popular Movie/////////////// */}
        <Container style={cardStyle}>
          <div className="movieStyle">Popular Movie</div>

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
            <SkipPreviousIcon
              style={apiStyle}
              onClick={handlePrevDataPopularMovie}
              sx={{
                "&:hover": {
                  backgroundColor: red[100],
                  transition: "0.3s",
                },
              }}
            />
            <Pagination
              count={Math.ceil(dataPopularMovie.length / 5)}
              color="primary"
              onChange={handleChangePopularMovie}
              page={pagePopular}
            />
            <SkipNextIcon
              style={apiStyle}
              onClick={handleNextDataPopularMovie}
              sx={{
                "&:hover": {
                  backgroundColor: red[100],
                  transition: "0.3s",
                },
              }}
            />
          </Grid>
        </Container>

        {/*/////////////// UpComing///////////////// */}
        <Container style={cardStyle}>
          <div className="movieStyle">Up Coming</div>

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
            <SkipPreviousIcon
              style={apiStyle}
              onClick={handlePrevDataUpComing}
              sx={{
                "&:hover": {
                  backgroundColor: red[100],
                  transition: "0.3s",
                },
              }}
            />
            <Pagination
              count={Math.ceil(dataUpComing.length / 5)}
              color="primary"
              onChange={handleChangeUpComing}
              page={pageUpComing}
            />
            <SkipNextIcon
              style={apiStyle}
              onClick={handleNextDataUpComing}
              sx={{
                "&:hover": {
                  backgroundColor: red[100],
                  transition: "0.3s",
                },
              }}
            />
          </Grid>
        </Container>

        {/*/////////////// Top Rated///////////////// */}
        <Container style={cardStyle}>
          <div className="movieStyle">Top Rated</div>

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
            <SkipPreviousIcon
              style={apiStyle}
              onClick={handlePrevDataTopRated}
              sx={{
                "&:hover": {
                  backgroundColor: red[100],
                  transition: "0.3s",
                },
              }}
            />

            <Pagination
              count={Math.ceil(dataTopRated.length / 5)}
              color="primary"
              onChange={handleChangeTopRated}
              page={pageTopRated}
            />

            <SkipNextIcon
              style={apiStyle}
              onClick={handleNextDataTopRated}
              sx={{
                "&:hover": {
                  backgroundColor: red[100],
                  transition: "0.3s",
                },
              }}
            />
          </Grid>
        </Container>
      </Container>
    );
  }
}

export default HomePage;
