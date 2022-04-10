import React, { useState } from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Paper,
  Box,
  Grid,
  Typography,
} from "@mui/material";
import { Link, withRouter } from "react-router-dom";
import { Person } from "@mui/icons-material";
import logo from "../assets/img/SmartUp.png";
import axios from "axios";

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    let body = { username, password };
    axios.post("http://localhost:5000/api/users/login", body).then((res) => {
      localStorage.setItem("smartup-auth-token", res.data.token);
      localStorage.setItem("user-id", res.data._id);
      localStorage.setItem("username", res.data.username);
      if (res.data.img) {
        localStorage.setItem("profile-pic", res.data.img);
      }
      if (res.data.role === "investor") {
        localStorage.setItem("investor-id", res.data.investor_id);
        localStorage.setItem("domains", res.data.domains);
        props.history.push("/investment-portal");
      } else {
        localStorage.setItem("startup-id", res.data.startup_id);
        props.history.push("/startup-portal");
      }
    });
  };

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: `url(${logo})`,
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundPosition: "center",
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            verticalAlign: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
            <Person />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSubmit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link
                  style={{ textDecoration: "none", color: "primary" }}
                  to="/register-investor"
                >
                  Sign up as Investor
                </Link>
              </Grid>
              <Grid item>
                <Link
                  style={{ textDecoration: "none", color: "primary" }}
                  to="/register-startup"
                >
                  Sign up as Startup
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};
export default withRouter(Login);
