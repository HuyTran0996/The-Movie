import React, { useContext, useReducer, useEffect } from "react";
import Grid from "@mui/material/Grid";
import { Container } from "@mui/material";
import Pagination from "@mui/material/Pagination";

import { red } from "@mui/material/colors";
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

///////////////////

function TopRated() {
  const { state, getData, dispatch } = useContext(PageContext);
  const { dataTopRated } = state;
  const navigate = useNavigate();
  let [searchParams] = useSearchParams();
  let page = parseInt(searchParams.get("page")) || 1;

  useEffect(() => {
    dispatch({ type: "SET_PAGE_DATA_TopRated", payload: `${page}` });
  }, [page]);

  const handleChangePopularMovie = (e, p) => {
    navigate(`/top?page=${p}`);
  };

  if (!dataTopRated) {
    getData();
    return <Container style={cardStyle}>{Loading()}</Container>;
  } else {
    let dataTopRated1 = dataTopRated.results;
    return (
      <Container>
        <Container style={cardStyle}>
          <div className="movieStyle">Top Rated</div>

          <Grid style={gridStyle}>
            {dataTopRated1?.map((movie) => {
              return (
                <Grid style={movieStyle} key={movie.id} item xs={12} lg={4}>
                  <MovieCard movie={movie} />
                </Grid>
              );
            })}
          </Grid>

          <Grid style={stackStyle}>
            <Pagination
              count={Math.ceil(dataTopRated.total_pages)}
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

export default TopRated;
