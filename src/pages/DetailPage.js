import React, { useContext } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { red } from "@mui/material/colors";

import { IMAGE_PATH } from "../app/config";
import PageContext from "../context/PageContext";
import Loading from "../components/Loading";

const cardStyle = {
  display: "flex",
  flexDirection: "column",
  flexWrap: "wrap",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100vw",
  backgroundColor: "transparent",
  marginTop: "10px",
};
const cardActionStyle = {
  // display: "flex",
  // justifyContent: "space-between",
};

const imgStyle = {
  maxWidth: "50vw",
  maxHeight: "45vh",
};

const contentStyle = {
  // overflow: "auto",
  maxWidth: "50vw",
  color: "white",
};

export default function DetailPage() {
  const { state, getData, dispatch } = useContext(PageContext);
  const { dataDetail, favorite } = state;
  let movie = dataDetail;

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

  if (!dataDetail) {
    getData();
    return <Card style={cardStyle}>{Loading()}</Card>;
  } else {
    return (
      <Card
        variant="standard"
        style={cardStyle}
        sx={
          {
            // backgroundImage: `url(${IMAGE_PATH}${movie.poster_path})`,
            // backgroundSize: "cover",
            // backgroundFilter: "brightness(200%)",
            // backgroundRepeat: "no-repeat",
            // backgroundPosition: "center",
          }
        }
      >
        <CardMedia
          style={imgStyle}
          component="img"
          alt="poster"
          image={`${IMAGE_PATH}${movie.backdrop_path}`}
        />

        <CardContent style={contentStyle}>
          <Typography gutterBottom variant="h4" component="div">
            {movie.title}
          </Typography>

          <Typography gutterBottom component="div">
            {movie.overview}
          </Typography>

          <Typography variant="body2">
            Rate: {movie.vote_average} points ({movie.vote_count} votes)
          </Typography>

          <Typography variant="body2">Views : {movie.popularity}</Typography>

          <Typography variant="body2">
            Release date: {movie.release_date}
          </Typography>

          <Typography variant="body2">
            Languages:{" "}
            {movie.spoken_languages.map(
              (language) => `${language.english_name}, `
            )}
          </Typography>

          <Typography variant="body2">
            Genres : {movie.genres.map((genre) => `${genre.name}, `)}
          </Typography>

          <CardActions style={cardActionStyle}>
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
        </CardContent>
      </Card>
    );
  }
}
