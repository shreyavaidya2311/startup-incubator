import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
  Grid,
  IconButton,
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
import Navbar from "../components/Navbar";

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
  const [expanded, setExpanded] = useState([]);
  const [open, setOpen] = useState(false);
  const [dialogData, setDialogData] = useState();
  const [dialogLoading, setDialogLoading] = useState(true);
  const [investment, setInvestment] = useState(null);
  const [equity, setEquity] = useState(null);
  const [mode, setMode] = useState(null);
  const [offers, setOffers] = useState([]);
  useEffect(() => {
    let domains = localStorage.getItem("domains");
    const domains_array = domains.split(",");
    let body = { domains: domains_array };
    axios
      .post("http://localhost:5000/api/startups/get-preferred-startups", body)
      .then((res) => {
        setData(res.data.startup);
        let newarr = [];
        res.data.startup.map(() => {
          newarr.push(false);
        });
        setExpanded(newarr);
        let investor_id = localStorage.getItem("investor-id");
        let body = { investor_id };
        axios
          .post("http://localhost:5000/api/investors/get-investor", body)
          .then((result) => {
            if (result.data.investor.offers) {
              setOffers(result.data.investor.offers);
            }
            if (result.data.investor.mode) {
              setMode(result.data.investor.mode);
            }
            setLoading(false);
          });
      });
  }, []);
  const handleExpandClick = (key) => {
    let newarr = [...expanded];
    newarr[key] = !newarr[key];
    setExpanded(newarr);
  };
  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  const handleDialog = () => {
    setOpen(!open);
  };
  const handleOffer = (item) => {
    setDialogData(item);
    setDialogLoading(false);
    setOpen(true);
  };
  const handleSubmit = (startup_id) => {
    let investor_id = localStorage.getItem("investor-id");
    let investor_image = localStorage.getItem("profile-pic");
    let investor_name = localStorage.getItem("name");
    let body = {
      investor_id: investor_id,
      investor_name: investor_name,
      startup_id: startup_id,
      equity: equity,
      investment: investment,
      investor_image: investor_image,
    };
    axios
      .post("http://localhost:5000/api/investors/make-offer", body)
      .then(() => {
        window.location.reload();
      });
  };
  return (
    <div>
      <Navbar role="investor" />
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          {data.length === 0 ? (
            <center>
              <Typography variant="h4" style={{ marginTop: "4em" }}>
                No Startups Available
              </Typography>
            </center>
          ) : (
            <center>
              <Typography variant="h4" style={{ marginTop: "3em" }}>
                Recommended Startups
              </Typography>
            </center>
          )}
          <br />
          <br />
          <Grid container spacing={3} justifyContent="center">
            {data.map((item, key) =>
              item.mode === "private" ? null : (
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
                      {offers.includes(item.startup_id) ||
                      mode === "private" ? (
                        <Button
                          startIcon={<CurrencyRupee />}
                          variant="outlined"
                          color="primary"
                          disabled
                        >
                          Offer
                        </Button>
                      ) : (
                        <Button
                          startIcon={<CurrencyRupee />}
                          variant="outlined"
                          color="primary"
                          onClick={() => handleOffer(item)}
                        >
                          Offer
                        </Button>
                      )}

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
              )
            )}
          </Grid>
        </>
      )}
      {dialogLoading ? null : (
        <Dialog open={open} onClose={handleDialog}>
          <DialogTitle>Make an Offer</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To make an offer to <strong>{dialogData.nstartup}</strong>, fill
              in your Investment Offer and Ask for Equity below.
            </DialogContentText>
            <Grid container spacing={2} style={{ marginTop: "1em" }}>
              <Grid item xs={12} sm={12}>
                <TextField
                  required
                  fullWidth
                  label="Original Ask for Investment"
                  name="money"
                  value={`₹${numberWithCommas(dialogData.investment)}`}
                  disabled
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  required
                  fullWidth
                  label="Original Equity Offered"
                  name="equity"
                  value={`${dialogData.equity}%`}
                  disabled
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  required
                  fullWidth
                  label="Calculated Valuation"
                  name="valuation"
                  value={`₹${numberWithCommas(
                    (dialogData.investment / dialogData.equity) * 100
                  )}`}
                  disabled
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  required
                  fullWidth
                  label="Investment Offer"
                  name="money"
                  type="number"
                  value={investment}
                  onChange={(e) => setInvestment(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  required
                  fullWidth
                  label="Ask for Equity"
                  name="equity"
                  type="number"
                  value={equity}
                  onChange={(e) => setEquity(e.target.value)}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button color="secondary" variant="outlined" onClick={handleDialog}>
              Cancel
            </Button>
            <Button
              onClick={() => handleSubmit(dialogData.startup_id)}
              variant="outlined"
            >
              Offer
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
}

export default withRouter(InvestmentPortal);
