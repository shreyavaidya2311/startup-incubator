import React from "react";
import { Grid, Typography, TextField } from "@mui/material";

const Page2 = (props) => {
  return (
    <>
      <center>
        <Typography variant="h6" gutterBottom>
          Contact Information
        </Typography>
      </center>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="firstName"
            label="First Name"
            fullWidth
            variant="standard"
            value={props.firstName}
            onChange={(e) => props.setFirstName(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="lastName"
            label="Last Name"
            fullWidth
            variant="standard"
            value={props.lastName}
            onChange={(e) => props.setLastName(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            required
            id="email"
            name="email"
            label="Email"
            fullWidth
            variant="standard"
            value={props.email}
            onChange={(e) => props.setEmail(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            id="code"
            name="code"
            label="Country Code"
            value="+91"
            fullWidth
            variant="outlined"
            disabled
          />
        </Grid>
        <Grid item xs={12} sm={9}>
          <TextField
            required
            id="phoneno"
            name="phoneno"
            label="Phone Number"
            type="number"
            fullWidth
            variant="standard"
            value={props.phoneno}
            onChange={(e) => props.setPhoneNo(e.target.value)}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default Page2;
