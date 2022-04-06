import React from "react";
import {
  Grid,
  Typography,
  TextField,
  Select,
  InputLabel,
  FormControl,
  MenuItem,
} from "@mui/material";

const Page3 = (props) => {
  return (
    <>
      <center>
        <Typography variant="h6" gutterBottom>
          Startup Details
        </Typography>
      </center>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          <TextField
            required
            id="nstartup"
            name="nstartup"
            label="Name of Startup"
            fullWidth
            variant="standard"
            value={props.nstartup}
            onChange={(e) => props.setNstartup(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <FormControl fullWidth>
            <InputLabel>Domain</InputLabel>
            <Select
              value={props.domain}
              label="Domain"
              onChange={(e) => props.setDomain(e.target.value)}
            >
              <MenuItem value={"Technology"}>Technology</MenuItem>
              <MenuItem value={"FinTech"}>FinTech</MenuItem>
              <MenuItem value={"EdTech"}>EdTech</MenuItem>
              <MenuItem value={"MedTech"}>MedTech</MenuItem>
              <MenuItem value={"Food"}>Food</MenuItem>
              <MenuItem value={"Wearables"}>Wearables</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            label="Prior Investors"
            type="number"
            fullWidth
            variant="standard"
            value={props.istartups}
            onChange={(e) => props.setIstartups(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            label="Current Valuation"
            type="number"
            fullWidth
            variant="standard"
            value={props.valuation}
            onChange={(e) => props.setValuation(e.target.value)}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default Page3;
