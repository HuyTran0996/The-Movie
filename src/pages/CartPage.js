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

import Cart from "../components/Cart";
import PageContext from "../context/PageContext";
import Loading from "../components/Loading";

///////////STYLES//////////////

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

export default function CartPage() {
  const { state, getData, dispatch } = useContext(PageContext);
  const { dataDetail, movieId, dataCart } = state;
  // let movie = dataCart;

  if (dataCart.length === 0) {
    return (
      <Container className="movieStyle" style={cardStyle}>
        YOUR CART IS EMPTY
      </Container>
    );
  } else {
    let dataPopularMovie1 = dataCart;
    return (
      <Container>
        {/* /////////// Popular Movie/////////////// */}
        <Container style={cardStyle}>
          <div className="movieStyle">YOUR CART MOVIES</div>

          <Grid style={gridStyle}>
            {dataPopularMovie1?.map((movie) => {
              return (
                <Grid style={movieStyle} key={movie.id} item xs={12} lg={4}>
                  <Cart movie={movie} />
                </Grid>
              );
            })}
          </Grid>
        </Container>
      </Container>
    );
  }
}
