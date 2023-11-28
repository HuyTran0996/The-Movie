import React, { useContext } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { red } from "@mui/material/colors";

import { useNavigate } from "react-router-dom";

import { IMAGE_PATH } from "../app/config";
import PageContext from "../context/PageContext";

//////////////Styles////////////////////
const cardStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "200px",
  height: "450px",
  backgroundColor: "transparent",
};
const cardActionStyle = {
  display: "flex",
  justifyContent: "space-between",
};

const contentStyle = {
  overflow: "auto",
  maxHeight: "150px",
  color: "white",
};
////////////////////////////

export default function MovieCard({ movie }) {
  const { state, dispatch } = useContext(PageContext);
  const { favorite } = state;
  const navigate = useNavigate();

  const handleSeeDetail = () => {
    localStorage.setItem("movieId", movie.id);
    dispatch({
      type: "SET_MOVIE_ID",
      payload: movie.id,
    });
    dispatch({
      type: "SET_DATA_DETAIL",
      payload: null,
    });
    navigate(`/detail/${movie.id}`);
  };

  const addToCart = () => {
    const favoriteList = favorite ? favorite : [];
    let newFavorite = [...favoriteList];
    const isMovieAlreadyInCart = newFavorite.find(
      (existingMovie) => existingMovie.id === movie.id
    );
    if (!isMovieAlreadyInCart) {
      newFavorite.push(movie);
    }
    dispatch({
      type: "SET_FAVORITE_OVERRIDE",
      payload: newFavorite,
    });
    dispatch({
      type: "SET_DATA_CART",
      payload: newFavorite,
    });
    localStorage.setItem("favorite", JSON.stringify(newFavorite));
  };

  return (
    <Card
      style={cardStyle}
      sx={{
        border: 2,
        borderColor: "aqua",
        borderRadius: 2,
        "&:hover": {
          filter: "brightness(130%)",
        },
      }}
    >
      <CardMedia
        className="cardMedia"
        component="img"
        alt="poster"
        image={`${IMAGE_PATH}${movie.poster_path}`}
        onClick={handleSeeDetail}
      />

      <CardContent style={contentStyle}>
        <Typography gutterBottom variant="h6" component="div">
          {movie.title}
        </Typography>

        <Typography variant="body2">
          Release date: {movie.release_date}
        </Typography>
      </CardContent>

      <CardActions style={cardActionStyle}>
        <Button
          sx={{
            "&:hover": {
              backgroundColor: red[100],
              transition: "0.3s",
            },
          }}
          onClick={handleSeeDetail}
        >
          Detail
        </Button>
        <Button
          sx={{
            "&:hover": {
              backgroundColor: red[100],
              transition: "0.3s",
            },
          }}
          onClick={addToCart}
        >
          <ShoppingCartIcon />
        </Button>
      </CardActions>
    </Card>
  );
}
