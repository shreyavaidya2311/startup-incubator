import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { withRouter } from "react-router-dom";
import axios from "axios";
import {
  Grid,
  Typography,
  CircularProgress,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  IconButton,
  Button,
  Collapse,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  Clear,
  YouTube,
  ExpandMore as ExpandMoreIcon,
  Check,
} from "@mui/icons-material";
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
function StartupPortal() {
  const [data, setData] = useState([]);
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState([]);
  const [nloading, setNloading] = useState(true);
  const [accepted, setAccepted] = useState([]);
  const [rejected, setRejected] = useState([]);
  useEffect(() => {
    let startup_id = localStorage.getItem("startup-id");
    let body = { startup_id };
    axios
      .post("http://localhost:5000/api/startups/get-startup", body)
      .then((res) => {
        if (res.data.startup.offers) {
          setOffers(res.data.startup.offers);
          let newarr = [];

          res.data.startup.offers.map(() => {
            newarr.push(false);
          });
          setExpanded(newarr);
          setData(newarr);
        }
        if (res.data.startup.accepted) {
          setAccepted(res.data.startup.accepted);
        }
        if (res.data.startup.rejected) {
          setRejected(res.data.startup.rejected);
        }
        setLoading(false);
      });
  }, []);
  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handleAction = (key, action) => {
    let startup_id = localStorage.getItem("startup-id");
    let investor_id = offers[key].investor_id;
    let body = {
      investor_id: investor_id,
      startup_id: startup_id,
      action: action,
    };
    axios
      .post("http://localhost:5000/api/startups/offer-action", body)
      .then((res) => {
        console.log("Done");
      });
  };
  const handleExpandClick = (key) => {
    let investor_id = offers[key].investor_id;
    let body = { investor_id };
    axios
      .post("http://localhost:5000/api/investors/get-investor", body)
      .then((res) => {
        let arr = [...data];
        arr[key] = res.data.investor;
        setData(arr);
        setNloading(false);
      });
    let newarr = [...expanded];
    newarr[key] = !newarr[key];
    setExpanded(newarr);
  };
  return (
    <div>
      <Navbar role="startup" />
      {loading ? (
        <CircularProgress />
      ) : (
        <Grid
          container
          spacing={3}
          justifyContent="center"
          style={{ marginTop: "6em" }}
        >
          {offers.map((item, key) => (
            <Grid item>
              <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                  component="img"
                  height="194"
                  image={
                    item.investor_image
                      ? item.investor_image
                      : "https://i.ibb.co/0jGHG81/profile.png"
                  }
                  alt="logo"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {item.investor_name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Investment Offer</strong> - ₹
                    {numberWithCommas(item.investment)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Ask for Equity</strong> - {item.equity}%
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Calculated Valuation</strong> - ₹
                    {numberWithCommas((item.investment / item.equity) * 100)}
                  </Typography>
                </CardContent>
                <CardActions disableSpacing>
                  {accepted.includes(item.investor_id) ||
                  rejected.includes(item.investor_id) ? null : (
                    <>
                      <Button
                        startIcon={<Clear />}
                        variant="outlined"
                        color="secondary"
                        style={{ marginRight: "5px" }}
                        onClick={() => handleAction(key, "reject")}
                      >
                        Reject
                      </Button>
                      <Button
                        startIcon={<Check />}
                        variant="outlined"
                        color="primary"
                        onClick={() => handleAction(key, "accept")}
                      >
                        Accept
                      </Button>
                    </>
                  )}
                  {accepted.includes(item.investor_id) ? (
                    <Button variant="outlined" color="primary" disabled>
                      Accepted
                    </Button>
                  ) : null}
                  {rejected.includes(item.investor_id) ? (
                    <Button variant="outlined" color="primary" disabled>
                      Rejected
                    </Button>
                  ) : null}
                  <ExpandMore
                    expand={expanded[key]}
                    onClick={() => handleExpandClick(key)}
                    aria-label="show more"
                    aria-expanded={expanded[key]}
                  >
                    <ExpandMoreIcon />
                  </ExpandMore>
                </CardActions>
                <Collapse in={expanded[key]} timeout="auto" unmountOnExit>
                  <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                      Investor Details
                    </Typography>
                    {nloading ? (
                      <CircularProgress />
                    ) : (
                      <>
                        <Typography variant="body2" color="text.secondary">
                          <strong>Investment Experience</strong> -{" "}
                          {data[key].experience} years
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          <strong>Number of Invested Startups</strong> -{" "}
                          {data[key].istartups}
                        </Typography>
                      </>
                    )}
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

export default withRouter(StartupPortal);
