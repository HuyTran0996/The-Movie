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

function FilterPage() {
  const [stateHomePage, dispatchHomePage] = useReducer(reducer, initialState);

  const { state, dispatch, getData } = useContext(PageContext);
  const { pageDataFilter, dataFilter } = state;

  const { pageSearch } = stateHomePage;

  console.log("dataSearch:", dataFilter);

  const handleChangeSearch = (e, p) => {
    dispatchHomePage({ type: "SET_PAGE_Search", payload: p });
  };

  ////////////////////////////////
  const handlePrevDataSearch = () => {
    if (pageDataFilter > 1) {
      dispatch({
        type: "SET_PAGE_DATA_Filter",
        payload: pageDataFilter - 1,
      });
    }
  };
  const handleNextDataSearch = () => {
    dispatch({
      type: "SET_PAGE_DATA_Filter",
      payload: pageDataFilter + 1,
    });
  };
  ///////////////////////////////////////////////

  if (!dataFilter) {
    getData();
    return <div>Loading...</div>;
  } else {
    // getData();
    return (
      <Container>
        <Container style={cardStyle}>
          <Typography variant="h5" component="div">
            Result of: {123}
          </Typography>

          <Grid style={gridStyle}>
            {dataFilter
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
              count={Math.ceil(dataFilter.length / 5)}
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

export default FilterPage;
