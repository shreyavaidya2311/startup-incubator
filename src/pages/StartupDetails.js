import React from "react";
import { withRouter } from "react-router-dom";
import { AppBar, Toolbar, Avatar, Grid, IconButton } from "@mui/material";
import { Logout } from "@mui/icons-material";
import logo from "../assets/img/SmartUp-dark.png";
import "../App.css";
import { Link } from "react-router-dom";

function StartupDetails(props) {
  const handleLogout = () => {
    localStorage.clear();
    props.history.push("/");
  };
  return (
    <div>
      <AppBar color="primary">
        <Toolbar>
          <Grid container justifyContent="space-between">
            <Grid item>
              <img src={logo} alt="logo" />
            </Grid>
            <Grid item>
              <Link to="/startup-details">
                <IconButton style={{ marginTop: "5px" }}>
                  <Avatar src="https://i.ibb.co/0jGHG81/profile.png" />
                </IconButton>
              </Link>

              <IconButton onClick={handleLogout} style={{ marginTop: "8px" }}>
                <Logout style={{ color: "#ffffff" }} />
              </IconButton>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default withRouter(StartupDetails);
