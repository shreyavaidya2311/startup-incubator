import React from "react";
import {
  Grid,
  Typography,
  TextField,
  FormControl,
  FormGroup,
  Checkbox,
  FormControlLabel,
  FormLabel,
} from "@mui/material";

const Page3 = (props) => {
  return (
    <>
      <center>
        <Typography variant="h6" gutterBottom>
          Investment Details
        </Typography>
      </center>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="nstartup"
            name="nstartup"
            label="Invested Startups"
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
            id="nstartup"
            name="nstartup"
            label="Investment Experience"
            type="number"
            fullWidth
            variant="standard"
            value={props.experience}
            onChange={(e) => props.setExperience(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <FormLabel component="legend">Preferred Startup Domains</FormLabel>
          <FormControl component="fieldset">
            <FormGroup aria-label="position" row>
              <FormControlLabel
                value="tech"
                control={
                  <Checkbox
                    checked={props.tech}
                    onChange={() => props.setTech(!props.tech)}
                  />
                }
                label="Technology"
              />
              <FormControlLabel
                value="fintech"
                control={
                  <Checkbox
                    checked={props.fintech}
                    onChange={() => props.setFintech(!props.fintech)}
                  />
                }
                label="FinTech"
              />
              <FormControlLabel
                value="edtech"
                control={
                  <Checkbox
                    checked={props.edtech}
                    onChange={() => props.setEdtech(!props.edtech)}
                  />
                }
                label="EdTech"
              />
            </FormGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={12}>
          <FormControl component="fieldset">
            <FormGroup aria-label="position" row>
              <FormControlLabel
                value="medtech"
                control={
                  <Checkbox
                    checked={props.medtech}
                    onChange={() => props.setMedtech(!props.medtech)}
                  />
                }
                label="MedTech"
              />
              <FormControlLabel
                value="food"
                control={
                  <Checkbox
                    checked={props.food}
                    onChange={() => props.setFood(!props.food)}
                  />
                }
                label="Food"
              />
              <FormControlLabel
                value="wearables"
                control={
                  <Checkbox
                    checked={props.wearables}
                    onChange={() => props.setWearables(!props.wearables)}
                  />
                }
                label="Wearables"
              />
            </FormGroup>
          </FormControl>
        </Grid>
      </Grid>
    </>
  );
};

export default Page3;
