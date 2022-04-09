import React, { useState, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import axios from "axios";
import { CircularProgress } from "@mui/material";

const ProtectedRoute = (props) => {
  const { component: Component, ...rest } = props;
  const [credentialsValid, setCredentialsValid] = useState(false);
  const [validated, setValidated] = useState(false);
  let token = localStorage.getItem("smartup-auth-token");

  const verifyToken = async () => {
    try {
      const resp = await axios.post("http://localhost:5000/api/users/verify", {
        headers: {
          "smartup-auth-token": token,
        },
      });
      setCredentialsValid(resp.data.res);
      setValidated(true);
    } catch (err) {
      setCredentialsValid(false);
      setValidated(true);
      localStorage.setItem("smartup-auth-token", null);
    }
  };
  useEffect(() => {
    verifyToken();
    //eslint-disable-next-line
  }, []);

  if (credentialsValid && validated) {
    return (
      <Route {...rest} render={(props) => <Component {...rest} {...props} />} />
    );
  } else if (!credentialsValid && validated) {
    localStorage.setItem("smartup-auth-token", null);
    return <Redirect to="/" />;
  } else {
    return <CircularProgress />;
  }
};

export default ProtectedRoute;
