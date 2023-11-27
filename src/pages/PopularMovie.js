import React, { useContext, useReducer, useEffect } from "react";
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
  marginTop: "15px",
  marginBottom: "25px",
  display: "flex",
  alignItems: "center",
  // backgroundColor: "blue",
};

const cardStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "90vw",
  marginTop: "6px",
  // justifyContent: "center",
  // backgroundColor: "#1565c0",
};
const gridStyle = {
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "space-evenly",
  marginTop: "6px",
  // alignItems: "center",
};
const movieStyle = {
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "space-evenly",
  margin: "10px",
  // alignItems: "center",
};

const apiStyle = {
  cursor: "pointer",
};

///////////////////

function PopularMovie() {
  const { state, getData, dispatch } = useContext(PageContext);
  const { dataPopularMovie, dataUpComing, dataTopRated, pageDataPopularMovie } =
    state;
  const navigate = useNavigate();
  let [searchParams] = useSearchParams();
  let page = parseInt(searchParams.get("page")) || 1;

  useEffect(() => {
    dispatch({ type: "SET_PAGE_DATA_PopularMovie", payload: `${page}` });
  }, [page]);

  console.log("dataPopular:", dataPopularMovie);

  const handleChangePopularMovie = (e, p) => {
    navigate(`/popular?page=${p}`);
  };

  if (!dataPopularMovie) {
    getData();
    return <Container style={cardStyle}>{Loading()}</Container>;
  } else {
    let dataPopularMovie1 = dataPopularMovie.results;
    return (
      <Container>
        {/* /////////// Popular Movie/////////////// */}
        <Container style={cardStyle}>
          <div className="movieStyle">Popular Movie</div>

          <Grid style={gridStyle}>
            {dataPopularMovie1?.map((movie) => {
              return (
                <Grid style={movieStyle} key={movie.id} item xs={12} lg={4}>
                  <MovieCard movie={movie} />
                </Grid>
              );
            })}
          </Grid>

          <Grid style={stackStyle}>
            <Pagination
              count={Math.ceil(dataPopularMovie.total_pages)}
              color="primary"
              onChange={handleChangePopularMovie}
              page={page}
              sx={{
                "& button": {
                  color: "white",
                },
                "& button:hover": {
                  transition: "0.3s",
                  backgroundColor: red[100],
                  color: "blue",
                },
              }}
            />
          </Grid>
        </Container>
      </Container>
    );
  }
}

export default PopularMovie;
