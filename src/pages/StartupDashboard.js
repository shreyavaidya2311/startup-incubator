import React from "react";
import { Link, withRouter } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Avatar,
  Grid,
  IconButton,
  Typography,
  Grow,
} from "@mui/material";
import { Logout } from "@mui/icons-material";
import logo from "../assets/img/SmartUp-dark.png";
import community from "../assets/img/community.png";
import portal from "../assets/img/portal.png";
import resources from "../assets/img/resources.png";
import "../App.css";

function StartupDashboard(props) {
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
      <Grid
        container
        spacing={10}
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: "100vh" }}
      >
        <Grid item>
          <Grow in={true} timeout={500}>
            <div className="icon">
              <img src={community} alt="logo" width={250} height={250} />
              <center>
                <div className="text">
                  <Typography
                    variant="overline"
                    style={{ fontSize: "1.5em", fontFamily: "Barlow" }}
                  >
                    Community Chat
                  </Typography>
                </div>
              </center>
            </div>
          </Grow>
        </Grid>
        <Grid item>
          <Grow in={true} style={{ transformOrigin: "0 0 0" }} timeout={1500}>
            <div className="icon">
              <img src={portal} alt="logo" width={250} height={250} />
              <div className="text">
                <center>
                  <Typography
                    variant="overline"
                    style={{ fontSize: "1.5em", fontFamily: "Barlow" }}
                  >
                    Investment Portal
                  </Typography>
                </center>
              </div>
            </div>
          </Grow>
        </Grid>

        <Grid item>
          <Grow in={true} style={{ transformOrigin: "0 0 0" }} timeout={2500}>
            <div className="icon">
              <img src={resources} alt="logo" width={250} height={250} />
              <div className="text">
                <center>
                  <Typography
                    variant="overline"
                    style={{ fontSize: "1.5em", fontFamily: "Barlow" }}
                  >
                    Resources
                  </Typography>
                </center>
              </div>
            </div>
          </Grow>
        </Grid>
      </Grid>
    </div>
  );
}

export default withRouter(StartupDashboard);
