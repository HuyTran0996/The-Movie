import React, { useContext, useEffect } from "react";
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

function UpComing() {
  const { state, getData, dispatch } = useContext(PageContext);
  const { dataUpComing } = state;
  const navigate = useNavigate();
  let [searchParams] = useSearchParams();
  let page = parseInt(searchParams.get("page")) || 1;

  useEffect(() => {
    dispatch({ type: "SET_PAGE_DATA_UpComing", payload: `${page}` });
  }, [page]);

  console.log("dataUpComing:", dataUpComing);

  const handleChangePopularMovie = (e, p) => {
    navigate(`/coming?page=${p}`);
  };

  if (!dataUpComing) {
    getData();
    return <Container style={cardStyle}>{Loading()}</Container>;
  } else {
    let dataUpComing1 = dataUpComing.results;
    return (
      <Container>
        <Container style={cardStyle}>
          <div className="movieStyle">Up Coming</div>

          <Grid style={gridStyle}>
            {dataUpComing1?.map((movie) => {
              return (
                <Grid style={movieStyle} key={movie.id} item xs={12} lg={4}>
                  <MovieCard movie={movie} />
                </Grid>
              );
            })}
          </Grid>

          <Grid style={stackStyle}>
            <Pagination
              count={Math.ceil(dataUpComing.total_pages)}
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

export default UpComing;
