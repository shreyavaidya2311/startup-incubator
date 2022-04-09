import React from "react";
import { withRouter } from "react-router-dom";
import { AppBar, Toolbar, Avatar, Grid, IconButton } from "@mui/material";
import { Logout } from "@mui/icons-material";
import logo from "../assets/img/SmartUp-dark.png";

function InvestorDashboard(props) {
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
              <IconButton style={{ marginTop: "5px" }}>
                <Avatar src="https://i.ibb.co/0jGHG81/profile.png" />
              </IconButton>
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

export default withRouter(InvestorDashboard);
