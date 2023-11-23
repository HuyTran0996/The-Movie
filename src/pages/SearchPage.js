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
  width: "80vw",
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
  pageSearch: 1,
};

function reducer(stateHomePage, action) {
  switch (action.type) {
    case "SET_PAGE_Search":
      return { ...stateHomePage, pageSearch: action.payload };

    default:
      throw new Error("Invalid Action");
  }
}

function SearchPage() {
  const [stateHomePage, dispatchHomePage] = useReducer(reducer, initialState);

  const { state, dispatch, getData } = useContext(PageContext);
  const { pageDataSearch, search, dataSearch } = state;

  const { pageSearch } = stateHomePage;

  console.log("dataSearch:", dataSearch);

  const handleChangeSearch = (e, p) => {
    dispatchHomePage({ type: "SET_PAGE_Search", payload: p });
  };

  ////////////////////////////////
  const handlePrevDataSearch = () => {
    if (pageDataSearch > 1) {
      dispatch({
        type: "SET_PAGE_DATA_Search",
        payload: pageDataSearch - 1,
      });
    }
  };
  const handleNextDataSearch = () => {
    dispatch({
      type: "SET_PAGE_DATA_Search",
      payload: pageDataSearch + 1,
    });
  };
  ///////////////////////////////////////////////

  if (!dataSearch) {
    getData();
    return <div>Loading...</div>;
  } else {
    return (
      <Container>
        <Container style={cardStyle}>
          <Typography variant="h5" component="div">
            Result of: {search}
          </Typography>

          <Grid style={gridStyle}>
            {dataSearch
              ?.slice((pageSearch - 1) * 5, (pageSearch - 1) * 5 + 5)
              .map((movie) => {
                return (
                  <Grid key={movie.id} item xs={12} lg={4}>
                    <MovieCard movie={movie} />
                  </Grid>
                );
              })}
          </Grid>

          <Grid style={stackStyle}>
            <SkipPreviousIcon onClick={handlePrevDataSearch} />
            <Pagination
              count={Math.ceil(dataSearch.length / 5)}
              color="primary"
              onChange={handleChangeSearch}
              page={pageSearch}
            />
            <SkipNextIcon onClick={handleNextDataSearch} />
          </Grid>
        </Container>
      </Container>
    );
  }
}

export default SearchPage;
