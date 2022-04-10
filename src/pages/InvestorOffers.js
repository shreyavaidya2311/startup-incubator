import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import {
  CircularProgress,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  CardActions,
  Grid,
} from "@mui/material";
import { withRouter } from "react-router-dom";
import { Cancel, Check } from "@mui/icons-material";

const InvestorOffers = () => {
  const [accepted, setAccepted] = useState([]);
  const [rejected, setRejected] = useState([]);
  const [startups, setStartups] = useState([]);
  const [loading, setLoading] = useState(true);
  let investor_id = localStorage.getItem("investor-id");
  useEffect(() => {
    let investor_id = localStorage.getItem("investor-id");
    let body = { investor_id };
    axios
      .post("http://localhost:5000/api/investors/get-investor", body)
      .then((result) => {
        if (result.data.investor.accepted) {
          setAccepted(result.data.investor.accepted);
        }
        if (result.data.investor.rejected) {
          setRejected(result.data.investor.rejected);
        }
        axios
          .get("http://localhost:5000/api/startups/get-startups")
          .then((res) => {
            setStartups(res.data.startup);
            setLoading(false);
          });
      });
  }, []);
  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  return (
    <div>
      <Navbar role="investor" />
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          {startups.length === 0 ? (
            <center>
              <Typography variant="h4" style={{ marginTop: "4em" }}>
                No Offers made
              </Typography>
            </center>
          ) : (
            <center>
              <Typography variant="h4" style={{ marginTop: "3em" }}>
                Track Offers
              </Typography>
            </center>
          )}
          <br />
          <br />
          <Grid container spacing={3} justifyContent="center">
            {startups.map((item) =>
              accepted.includes(item.startup_id) ? (
                <Grid item>
                  <Card sx={{ minWidth: 370 }}>
                    <CardMedia
                      component="img"
                      height="240"
                      image={item.clogo}
                      alt="logo"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {item.nstartup}
                      </Typography>
                      {item.offers.map((ele) =>
                        ele.investor_id === investor_id ? (
                          <>
                            <Typography variant="body2" color="text.secondary">
                              <strong>Amount Invested</strong> : ₹
                              {numberWithCommas(ele.investment)}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              <strong>Equity Gained</strong>: {ele.equity}%
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              <strong>Calculated Valuation</strong> : ₹
                              {numberWithCommas(
                                (ele.investment / ele.equity) * 100
                              )}
                            </Typography>
                          </>
                        ) : null
                      )}
                    </CardContent>
                    <CardActions>
                      <Button
                        startIcon={<Check />}
                        variant="outlined"
                        color="success"
                      >
                        Accepted
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ) : null
            )}
            {startups.map((item) =>
              rejected.includes(item.startup_id) ? (
                <Grid item>
                  <Card sx={{ minWidth: 370 }}>
                    <CardMedia
                      component="img"
                      height="240"
                      image={item.clogo}
                      alt="logo"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {item.nstartup}
                      </Typography>
                      {item.offers.map((ele) =>
                        ele.investor_id === investor_id ? (
                          <>
                            <Typography variant="body2" color="text.secondary">
                              <strong>Investment Offered</strong> : ₹
                              {numberWithCommas(ele.investment)}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              <strong>Equity Asked</strong>: {ele.equity}%
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              <strong>Calculated Valuation</strong> : ₹
                              {numberWithCommas(
                                (ele.investment / ele.equity) * 100
                              )}
                            </Typography>
                          </>
                        ) : null
                      )}
                    </CardContent>
                    <CardActions>
                      <Button
                        startIcon={<Cancel />}
                        variant="outlined"
                        color="secondary"
                      >
                        Declined
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ) : null
            )}
          </Grid>
        </>
      )}
    </div>
  );
};

export default withRouter(InvestorOffers);
