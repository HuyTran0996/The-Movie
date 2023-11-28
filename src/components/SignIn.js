import * as React from "react";
import { useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import { useNavigate } from "react-router-dom";

import { apiServiceLogin } from "../app/apiService";
///////////////STYLES///////////////////
const containerStyle = {
  width: "100%",
  height: "calc(100vh - 0.5*290px)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};
const cardStyle = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: "350px",
  height: "290px",
};
const inputStyle = {
  background: "#4caf50",
  border: " 1px solid black",
  width: "300px",
  marginBottom: "8px",
};
///////////////////////////////////

export default function SingIn() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [emailValue, setEmailValue] = useState("");
  const [passWordValue, setPassWordValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await apiServiceLogin.post("/api/login", {
        email: "eve.holt@reqres.in",
        // password: "pistol",
        // email: emailValue,
        password: passWordValue,
      });
      // console.log("signin", response);
      let token = response.data.token;
      console.log("your token is", token);
      return token;
    } catch (error) {
      console.log(`Error fetchData: ${error.name}: ${error.message}`);
      console.log("ádasd", error);

      let errorName = await error.response.data.error;
      setErrorMessage(errorName);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOnClick = async () => {
    const data = await fetchData();
    localStorage.setItem("token", data);
    navigate("/");
  };

  const handleEmailChange = (e) => {
    setEmailValue(e.target.value);
  };
  const handlePassWordChange = (e) => {
    setPassWordValue(e.target.value);
  };

  return (
    <div style={containerStyle}>
      <Card style={cardStyle}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Email
          </Typography>
          <InputBase
            placeholder="your email"
            style={inputStyle}
            value={emailValue}
            onChange={handleEmailChange}
            autoComplete="off"
          />

          <Typography gutterBottom variant="h5" component="div">
            PassWord
          </Typography>
          <InputBase
            placeholder="your password"
            style={inputStyle}
            type="password"
            value={passWordValue}
            onChange={handlePassWordChange}
            autoComplete="off"
          />
        </CardContent>

        <Typography sx={{ fontWeight: "bold", color: "red" }}>
          {errorMessage}
        </Typography>

        <CardActions>
          <Button
            variant="contained"
            size="small"
            // disabled={emailValue && passWordValue ? false : true}
            disabled={isLoading || !(emailValue && passWordValue)}
            onClick={handleOnClick}
          >
            Sign In
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}
