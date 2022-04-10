import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Avatar,
  Grid,
  IconButton,
  Paper,
  Box,
  Typography,
  Collapse,
  CircularProgress,
  Card,
  CardMedia,
  CardActions,
  CardContent,
  Button,
} from "@mui/material";
import {
  CurrencyRupee,
  Logout,
  YouTube,
  ExpandMore as ExpandMoreIcon,
} from "@mui/icons-material";
import logo from "../assets/img/SmartUp-dark.png";
import "../App.css";
import axios from "axios";
import { styled } from "@mui/material/styles";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

function InvestmentPortal(props) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(false);
  useEffect(() => {
    let domains = localStorage.getItem("domains");
    const domains_array = domains.split(",");
    let body = { domains: domains_array };
    console.log(body.domains);
    axios
      .post("http://localhost:5000/api/startups/get-preferred-startups", body)
      .then((res) => {
        setData(res.data.startup);
        console.log(res.data);
        setLoading(false);
      });
  }, []);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const handleLogout = () => {
    localStorage.clear();
    props.history.push("/");
  };
  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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
      {loading ? (
        <CircularProgress />
      ) : (
        <Grid
          container
          spacing={10}
          alignItems="center"
          justifyContent="center"
          style={{ minHeight: "100vh" }}
        >
          {data.map((item) => (
            <Grid item>
              <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                  component="img"
                  height="194"
                  image={item.clogo}
                  alt="logo"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {item.nstartup}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.tagline}
                  </Typography>
                </CardContent>
                <CardActions disableSpacing>
                  <Button
                    startIcon={<YouTube />}
                    variant="outlined"
                    color="secondary"
                    onClick={() => window.open(item.pitch, "_blank")}
                    style={{ marginRight: "5px" }}
                  >
                    View Pitch
                  </Button>
                  <Button
                    startIcon={<CurrencyRupee />}
                    variant="outlined"
                    color="primary"
                  >
                    Offer
                  </Button>
                  <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                  >
                    <ExpandMoreIcon />
                  </ExpandMore>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                  <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                      Company Details
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Domain</strong> - {item.domain}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Current Valuation</strong> - ₹
                      {numberWithCommas(item.valuation)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Ask for Investment</strong> - ₹
                      {numberWithCommas(item.investment)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Equity Offered</strong>- {item.equity}%
                    </Typography>
                  </CardContent>
                </Collapse>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
}

export default withRouter(InvestmentPortal);
