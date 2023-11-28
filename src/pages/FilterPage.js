import React, { useContext, useEffect } from "react";

import Grid from "@mui/material/Grid";
import { Container } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import Typography from "@mui/material/Typography";
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

function FilterPage() {
  const { state, dispatch, getData } = useContext(PageContext);
  const { dataFilter } = state;
  const navigate = useNavigate();
  let [searchParams] = useSearchParams();
  let page = parseInt(searchParams.get("page")) || 1;

  useEffect(() => {
    dispatch({ type: "SET_PAGE_DATA_Filter", payload: `${page}` });
  }, [page]);

  let genre = localStorage.getItem("genre");
  let year = localStorage.getItem("year");
  let sort = localStorage.getItem("sort");

  console.log("dataFilter:", dataFilter);
  const handleChangeFilter = (e, p) => {
    navigate(`/filter?genre=${genre}&year=${year}&sort=${sort}&page=${p}`);
  };

  if (!dataFilter) {
    getData();
    return <Container style={cardStyle}>{Loading()}</Container>;
  } else {
    let dataFilter1 = dataFilter.results;
    return (
      <Container>
        <Container style={cardStyle}>
          <div className="movieStyle1">Filter Result</div>

          <Grid style={gridStyle}>
            {dataFilter1?.map((movie) => {
              return (
                <Grid style={movieStyle} key={movie.id} item xs={12} lg={4}>
                  <MovieCard movie={movie} />
                </Grid>
              );
            })}
          </Grid>

          <Grid style={stackStyle}>
            <Pagination
              count={Math.ceil(dataFilter.total_pages)}
              color="primary"
              onChange={handleChangeFilter}
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

export default FilterPage;
