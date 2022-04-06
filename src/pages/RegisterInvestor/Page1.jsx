import React from "react";
import { Grid, Typography, TextField } from "@mui/material";

const Page1 = (props) => {
  return (
    <>
      <center>
        <Typography variant="h6" gutterBottom>
          Login Credentials
        </Typography>
      </center>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          <TextField
            required
            id="username"
            name="username"
            label="Username"
            fullWidth
            variant="standard"
            value={props.username}
            onChange={(e) => props.setUsername(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            required
            id="password"
            name="password"
            label="Password"
            type="password"
            fullWidth
            variant="standard"
            value={props.password}
            onChange={(e) => props.setPassword(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            required
            id="cpassword"
            name="cpassword"
            label="Confirm Password"
            type="password"
            fullWidth
            variant="standard"
            value={props.cpassword}
            onChange={(e) => props.setCpassword(e.target.value)}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default Page1;
