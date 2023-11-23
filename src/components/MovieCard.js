import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { IMAGE_PATH } from "../app/config";

const cardStyle = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: "150px",
  height: "350px",
  margin: "6px",
};

const imgStyle = {
  width: 150,
  height: 210,
};

export default function MovieCard({ movie }) {
  // console.log("path", IMAGE_PATH);
  //tại sao IMAGE_PATH là undefined????
  return (
    <Card style={cardStyle}>
      <CardMedia
        style={imgStyle}
        component="img"
        alt="poster"
        image={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
      />

      <CardContent>
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

      {/* <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions> */}
    </Card>
  );
}
