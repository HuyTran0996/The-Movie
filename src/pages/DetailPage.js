import React, { useContext } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { red } from "@mui/material/colors";
import { useParams } from "react-router-dom";

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
  margin: "6px",
  backgroundColor: "transparent",
};
const cardActionStyle = {
  // display: "flex",
  // justifyContent: "space-between",
};

const imgStyle = {
  // objectFit: "contain",
  maxWidth: "60vw",
  maxHeight: "50vh",
};

const contentStyle = {
  overflow: "auto",
  maxWidth: "60vw",
};

export default function DetailPage() {
  const params = useParams();
  const Id = params.id;
  console.log("movie id:", Id);
  const { state, getData, dispatch } = useContext(PageContext);
  const { dataDetail, movieId } = state;
  let movie = dataDetail;

  if (!dataDetail) {
    getData();
    return <Card style={cardStyle}>{Loading()}</Card>;
  } else {
    return (
      <Card variant="standard" style={cardStyle}>
        <CardMedia
          style={imgStyle}
          component="img"
          alt="poster"
          image={`${IMAGE_PATH}${movie.backdrop_path}`}
        />

        <CardContent style={contentStyle}>
          <Typography gutterBottom variant="h5" component="div">
            {movie.title}
          </Typography>
          <Typography gutterBottom variant="h7" component="div">
            {movie.overview}
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
          <Typography variant="body2" color="text.secondary">
            Languages:{" "}
            {movie.spoken_languages.map(
              (language) => `${language.english_name}, `
            )}
          </Typography>
          <Typography variant="body2" color="text.secondary">
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
            >
              <ShoppingCartIcon />
            </Button>
          </CardActions>
        </CardContent>
      </Card>
    );
  }
}
