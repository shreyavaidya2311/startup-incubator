import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Avatar,
  IconButton,
  Grid,
  TextField,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";
import { Logout, Public, Save, PrivacyTip } from "@mui/icons-material";
import logo from "../assets/img/SmartUp-dark.png";
import "../App.css";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

function StartupDetails(props) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pitch, setPitch] = useState(null);
  const [clogo, setLogo] = useState(null);
  const [investment, setInvestment] = useState(null);
  const [equity, setEquity] = useState(null);
  const [tagline, setTagline] = useState(null);
  const [mode, setMode] = useState("private");
  const handleLogout = () => {
    localStorage.clear();
    props.history.push("/");
  };
  useEffect(() => {
    let startup_id = localStorage.getItem("startup-id");
    let body = { startup_id };
    axios
      .post("http://localhost:5000/api/startups/get-startup", body)
      .then((res) => {
        setData(res.data.startup);
        if (res.data.startup.mode) {
          setMode(res.data.startup.mode);
        }
        if (res.data.startup.equity) {
          setEquity(res.data.startup.equity);
        }
        if (res.data.startup.clogo) {
          setLogo(res.data.startup.clogo);
        }
        if (res.data.startup.investment) {
          setInvestment(res.data.startup.investment);
        }
        if (res.data.startup.pitch) {
          setPitch(res.data.startup.pitch);
        }
        if (res.data.startup.tagline) {
          setTagline(res.data.startup.tagline);
        }
        setLoading(false);
      });
  }, []);

  const saveChanges = () => {
    let startup_id = localStorage.getItem("startup-id");
    let body = { startup_id, equity, pitch, investment, clogo, tagline };
    axios
      .post("http://localhost:5000/api/startups/edit-startup", body)
      .then((res) => {
        setData(res.data.startup);
        if (res.data.startup.mode) {
          setMode(res.data.startup.mode);
        }
        if (res.data.startup.equity) {
          setEquity(res.data.startup.equity);
        }
        if (res.data.startup.clogo) {
          setLogo(res.data.startup.clogo);
        }
        if (res.data.startup.investment) {
          setInvestment(res.data.startup.investment);
        }
        if (res.data.startup.pitch) {
          setPitch(res.data.startup.pitch);
        }
        if (res.data.startup.tagline) {
          setTagline(res.data.startup.tagline);
        }
      });
  };

  const changeMode = (pmode) => {
    let startup_id = localStorage.getItem("startup-id");
    let body = { startup_id, mode: pmode };
    axios
      .post("http://localhost:5000/api/startups/change-mode", body)
      .then((res) => {
        setMode(pmode);
      });
  };

  return (
    <div>
      <Navbar role="startup" />
      <div style={{ marginTop: "4.5em" }}>
        <center>
          <Typography variant="overline" style={{ fontSize: "1.75em" }}>
            <strong>Startup Details</strong>
          </Typography>
          <br />
          {loading ? (
            <CircularProgress />
          ) : (
            <>
              <Grid container spacing={2} style={{ width: "50%" }}>
                <Grid item xs={12} sm={12}>
                  <TextField
                    name="name"
                    required
                    fullWidth
                    label="Name of Startup"
                    value={data.nstartup}
                    disabled
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    name="domain"
                    required
                    fullWidth
                    label="Startup Domain"
                    value={data.domain}
                    disabled
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    label="Prior Investors"
                    name="pinvestors"
                    value={data.istartups}
                    disabled
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    label="Current Valuation"
                    name="valuation"
                    value={data.valuation}
                    disabled
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    name="description"
                    required
                    fullWidth
                    label="Description"
                    value={tagline}
                    multiline
                    onChange={(e) => setTagline(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    name="logo"
                    required
                    fullWidth
                    label="Startup Logo (Link)"
                    value={clogo}
                    onChange={(e) => setLogo(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    name="pitch"
                    required
                    fullWidth
                    label="Pitch and Demo (Link)"
                    value={pitch}
                    onChange={(e) => setPitch(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    label="Ask for Investment"
                    name="money"
                    type="number"
                    value={investment}
                    onChange={(e) => setInvestment(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    label="Equity Offer"
                    name="equity"
                    type="number"
                    value={equity}
                    onChange={(e) => setEquity(e.target.value)}
                  />
                </Grid>
              </Grid>
              <br />
              {mode === "private" ? (
                <Button
                  variant="outlined"
                  color="primary"
                  startIcon={<Public />}
                  onClick={() => changeMode("public")}
                >
                  Make Startup Public
                </Button>
              ) : (
                <Button
                  variant="outlined"
                  color="primary"
                  startIcon={<PrivacyTip />}
                  onClick={() => changeMode("private")}
                >
                  Make Startup Private
                </Button>
              )}

              <Button
                variant="outlined"
                color="secondary"
                style={{ marginLeft: "1em" }}
                startIcon={<Save />}
                onClick={saveChanges}
              >
                Save Changes
              </Button>
            </>
          )}
        </center>
      </div>
    </div>
  );
}

export default withRouter(StartupDetails);
