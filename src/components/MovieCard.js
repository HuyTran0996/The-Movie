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
  justifyContent: "center",
  alignItems: "center",
  width: "165px",
  height: "450px",
  margin: "6px",
};
const cardActionStyle = {
  display: "flex",
  justifyContent: "space-between",
};

const imgStyle = {
  objectFit: "contain",
};

const contentStyle = {
  overflow: "auto",
  maxHeight: "150px",
};
////////////////////////////
export default function MovieCard({ movie }) {
  // console.log("path", IMAGE_PATH);
  //tại sao IMAGE_PATH là undefined????
  const { state, getData, dispatch } = useContext(PageContext);
  const { dataDetail, movieId } = state;
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
  return (
    <Card style={cardStyle}>
      <CardMedia
        style={imgStyle}
        component="img"
        alt="poster"
        image={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
      />

      <CardContent style={contentStyle}>
        <Typography gutterBottom variant="h7" component="div">
          {movie.title}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          Rate: {movie.vote_average} points ({movie.vote_count} votes)
        </Typography>

        <Typography variant="body2" color="text.secondary">
          Views : {movie.popularity}
        </Typography>
        <Typography variant="body2" color="text.secondary">
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
        >
          <ShoppingCartIcon />
        </Button>
      </CardActions>
    </Card>
  );
}
