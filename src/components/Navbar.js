import React from "react";
import logo from "../assets/img/SmartUp-dark.png";
import { withRouter } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Grid,
  IconButton,
  Avatar,
  Slide,
  useScrollTrigger,
} from "@mui/material";
import { CurrencyExchange, Logout } from "@mui/icons-material";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function HideOnScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func,
};

function Navbar(props) {
  const handleLogout = () => {
    localStorage.clear();
    props.history.push("/");
  };
  let profile = localStorage.getItem("profile-pic");
  return (
    <HideOnScroll {...props} style={{ marginBottom: "10em" }}>
      <AppBar color="primary">
        <Toolbar>
          <Grid container justifyContent="space-between">
            {props.role === "startup" ? (
              <Link to="/startup-portal">
                <Grid item>
                  <img src={logo} alt="logo" />
                </Grid>
              </Link>
            ) : (
              <Link to="/investment-portal">
                <Grid item>
                  <img src={logo} alt="logo" />
                </Grid>
              </Link>
            )}
            <Grid item>
              {props.role === "startup" ? (
                <Link to="/startup-details">
                  <IconButton style={{ marginTop: "5px" }}>
                    {profile ? (
                      <Avatar src={profile} />
                    ) : (
                      <Avatar src="https://i.ibb.co/0jGHG81/profile.png" />
                    )}
                  </IconButton>
                </Link>
              ) : (
                <Link to="/investor-details">
                  <IconButton style={{ marginTop: "5px" }}>
                    {profile ? (
                      <Avatar src={profile} />
                    ) : (
                      <Avatar src="https://i.ibb.co/0jGHG81/profile.png" />
                    )}
                  </IconButton>
                </Link>
              )}
              {props.role === "startup" ? null : (
                <Link to="/investor-offers">
                  <IconButton style={{ marginTop: "5px" }}>
                    <CurrencyExchange color="secondary" />
                  </IconButton>
                </Link>
              )}
              <IconButton onClick={handleLogout} style={{ marginTop: "8px" }}>
                <Logout style={{ color: "#ffffff" }} />
              </IconButton>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </HideOnScroll>
  );
}

export default withRouter(Navbar);
