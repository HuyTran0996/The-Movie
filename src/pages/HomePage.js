import React, { useContext } from "react";
import Grid from "@mui/material/Grid";
import { Container } from "@mui/material";

import { useNavigate } from "react-router-dom";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import MovieCard from "../components/MovieCard";
import PageContext from "../context/PageContext";
import Loading from "../components/Loading";

///////////STYLES//////////////

const loadingStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "70vw",
  marginTop: "20vh",
};

const cardStyle = {
  marginBottom: "50px",
};
const gridStyle = {
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "space-evenly",
  marginTop: "6px",
};

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 7,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 2,
  },
};
///////////////////

function HomePage() {
  const { state, getData, dispatch } = useContext(PageContext);
  const { dataPopularMovie, dataUpComing, dataTopRated } = state;
  const navigate = useNavigate();

  const moveToPopularMovie = () => {
    navigate(`/popular?page=1`);
  };
  const moveToUpComing = () => {
    navigate(`/coming?page=1`);
  };
  const moveToTopRated = () => {
    navigate(`/top?page=1`);
  };

  /////////////////////////////////////////////

  if (!dataPopularMovie || !dataUpComing || !dataTopRated) {
    getData();
    return <Container style={loadingStyle}>{Loading()}</Container>;
  } else {
    let dataPopularMovie1 = dataPopularMovie.results;
    let dataUpComing1 = dataUpComing.results;
    let dataTopRated1 = dataTopRated.results;
    return (
      <Container>
        {/* /////////// Popular Movie/////////////// */}
        <Container style={cardStyle}>
          <div onClick={moveToPopularMovie} className="movieStyle">
            Popular Movie
          </div>
          <Carousel
            className="carousel"
            responsive={responsive}
            transitionDuration={300}
            infinite={true}
            ssr={true}
          >
            {dataPopularMovie1?.map((movie) => {
              return (
                <Grid style={gridStyle} key={movie.id} item xs={12} lg={4}>
                  <MovieCard movie={movie} />
                </Grid>
              );
            })}
          </Carousel>
        </Container>

        {/*/////////////// UpComing///////////////// */}
        <Container style={cardStyle}>
          <div className="movieStyle" onClick={moveToUpComing}>
            Up Coming
          </div>

          <Carousel
            className="carousel"
            responsive={responsive}
            transitionDuration={300}
            infinite={true}
            ssr={true}
          >
            {dataUpComing1?.map((movie) => {
              return (
                <Grid style={gridStyle} key={movie.id} item xs={12} lg={4}>
                  <MovieCard movie={movie} />
                </Grid>
              );
            })}
          </Carousel>
        </Container>

        {/*/////////////// Top Rated///////////////// */}
        <Container style={cardStyle}>
          <div className="movieStyle" onClick={moveToTopRated}>
            Top Rated
          </div>

          <Carousel
            className="carousel"
            responsive={responsive}
            transitionDuration={300}
            infinite={true}
            ssr={true}
          >
            {dataTopRated1?.map((movie) => {
              return (
                <Grid style={gridStyle} key={movie.id} item xs={12} lg={4}>
                  <MovieCard movie={movie} />
                </Grid>
              );
            })}
          </Carousel>
        </Container>
      </Container>
    );
  }
}

export default HomePage;
