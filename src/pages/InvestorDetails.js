import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import {
  Grid,
  TextField,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";
import { Public, Save, PrivacyTip } from "@mui/icons-material";
import "../App.css";
import axios from "axios";
import Navbar from "../components/Navbar";

function InvestorDetails(props) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState(null);
  const [mode, setMode] = useState("private");
  useEffect(() => {
    let investor_id = localStorage.getItem("investor-id");
    let body = { investor_id };
    axios
      .post("http://localhost:5000/api/investors/get-investor", body)
      .then((res) => {
        setData(res.data.investor);
        if (res.data.investor.img) {
          setImage(res.data.investor.img);
        }
        if (res.data.investor.mode) {
          setMode(res.data.investor.mode);
        }
        setLoading(false);
      });
  }, []);

  const saveChanges = () => {
    let investor_id = localStorage.getItem("investor-id");
    let body = { investor_id, image };
    axios
      .post("http://localhost:5000/api/investors/edit-investor", body)
      .then((res) => {
        setData(res.data.investor);
        if (res.data.investor.img) {
          setImage(res.data.investor.img);
        }
        if (res.data.investor.mode) {
          setMode(res.data.investor.mode);
        }
      });
  };

  const changeMode = (pmode) => {
    let investor_id = localStorage.getItem("investor-id");
    let body = { investor_id, mode: pmode };
    axios
      .post("http://localhost:5000/api/investors/change-mode", body)
      .then((res) => {
        setMode(pmode);
      });
  };

  return (
    <div>
      <Navbar role="investor" />
      <div style={{ marginTop: "4.5em" }}>
        <center>
          <Typography variant="overline" style={{ fontSize: "1.75em" }}>
            <strong>Investor Details</strong>
          </Typography>
          <br />
          {loading ? (
            <CircularProgress />
          ) : (
            <Grid container spacing={2} style={{ width: "50%" }}>
              <Grid item xs={12} sm={12}>
                <TextField
                  name="name"
                  required
                  fullWidth
                  label="Name"
                  value={data.name}
                  disabled
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  name="email"
                  required
                  fullWidth
                  label="Email"
                  value={data.email}
                  disabled
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  name="phoneno"
                  required
                  fullWidth
                  label="Contact Number"
                  value={data.phoneno}
                  disabled
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Invested Startups"
                  name="istartups"
                  value={data.istartups}
                  disabled
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Investment Experience (in years)"
                  name="experience"
                  value={data.experience}
                  disabled
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  name="img"
                  required
                  fullWidth
                  label="Profile Picture (Link)"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                />
              </Grid>
            </Grid>
          )}

          <br />
          {mode === "private" ? (
            <Button
              variant="outlined"
              color="primary"
              startIcon={<Public />}
              onClick={() => changeMode("public")}
            >
              Make Profile Public
            </Button>
          ) : (
            <Button
              variant="outlined"
              color="primary"
              startIcon={<PrivacyTip />}
              onClick={() => changeMode("private")}
            >
              Make Profile Private
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
        </center>
      </div>
    </div>
  );
}

export default withRouter(InvestorDetails);
