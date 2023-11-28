import React, { useContext } from "react";
import Grid from "@mui/material/Grid";
import { Container } from "@mui/material";

import Cart from "../components/Cart";
import PageContext from "../context/PageContext";

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
  const { state } = useContext(PageContext);
  const { dataCart } = state;

  if (!dataCart || dataCart.length === 0) {
    return (
      <Container className="movieStyle1" style={cardStyle}>
        YOUR CART IS EMPTY
      </Container>
    );
  } else {
    let dataPopularMovie1 = dataCart;
    return (
      <Container>
        <Container style={cardStyle}>
          <div className="movieStyle1">YOUR CART MOVIES</div>

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
