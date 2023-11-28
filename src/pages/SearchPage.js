import React, { useContext, useEffect } from "react";
import Grid from "@mui/material/Grid";
import { Button, Container } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
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

function SearchPage() {
  const { state, dispatch, getData } = useContext(PageContext);
  const { search, dataSearch } = state;
  const navigate = useNavigate();
  let [searchParams] = useSearchParams();
  let page = parseInt(searchParams.get("page")) || 1;

  useEffect(() => {
    dispatch({ type: "SET_PAGE_DATA_Search", payload: `${page}` });
  }, [page]);

  console.log("dataSearch:", dataSearch);

  const handleChangeSearch = (e, p) => {
    navigate(`/search?search=${search}&page=${p}`);
  };

  if (!dataSearch) {
    getData();
    return <Container style={cardStyle}>{Loading()}</Container>;
  } else {
    let dataSearch1 = dataSearch.results;
    return (
      <Container>
        <Container style={cardStyle}>
          <div className="movieStyle1">Result of: {search}</div>

          <Grid style={gridStyle}>
            {dataSearch1?.map((movie) => {
              return (
                <Grid style={movieStyle} key={movie.id} item xs={12} lg={4}>
                  <MovieCard movie={movie} />
                </Grid>
              );
            })}
          </Grid>

          <Grid style={stackStyle}>
            <Pagination
              count={Math.ceil(dataSearch.total_pages)}
              color="primary"
              onChange={handleChangeSearch}
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

export default SearchPage;
