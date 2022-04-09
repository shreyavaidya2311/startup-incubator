import React, { useState } from "react";
import {
  Box,
  Container,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  CssBaseline,
  Grid,
} from "@mui/material";
import Page1 from "./Page1";
import Page2 from "./Page2";
import Page3 from "./Page3";
import { BarChart } from "@mui/icons-material";
import logo from "../../assets/img/SmartUp.png";
import axios from "axios";
import { withRouter } from "react-router-dom";

const steps = ["Page 1", "Page 2", "Page 3"];

const Register = (props) => {
  const [activeStep, setActiveStep] = useState(0);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [cpassword, setCpassword] = useState(null);
  const [email, setEmail] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [phoneno, setPhoneNo] = useState(null);
  const [istartups, setIstartups] = useState(0);
  const [nstartup, setNstartup] = useState(null);
  const [domain, setDomain] = useState(null);
  const [valuation, setValuation] = useState(0);

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Page1
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
            cpassword={cpassword}
            setCpassword={setCpassword}
          />
        );
      case 1:
        return (
          <Page2
            firstName={firstName}
            setFirstName={setFirstName}
            lastName={lastName}
            setLastName={setLastName}
            email={email}
            setEmail={setEmail}
            phoneno={phoneno}
            setPhoneNo={setPhoneNo}
          />
        );
      case 2:
        return (
          <Page3
            nstartup={nstartup}
            setNstartup={setNstartup}
            domain={domain}
            setDomain={setDomain}
            istartups={istartups}
            setIstartups={setIstartups}
            valuation={valuation}
            setValuation={setValuation}
          />
        );
      default:
        throw new Error("Unknown step");
    }
  };

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };
  const handleValidate = () => {};
  const handleSubmit = () => {
    let body = {
      username,
      password,
      email,
      firstName,
      lastName,
      phoneno,
      istartups,
      domain,
      nstartup,
      valuation,
    };
    axios
      .post("http://localhost:5000/api/users/register-startup", body)
      .then(props.history.push("/"));
  };

  return (
    <>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${logo})`,
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 7,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              verticalAlign: "center",
            }}
          >
            <Typography component="h1" variant="h5">
              <strong>Register as Startup Owner</strong>
            </Typography>
            <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
              <Paper
                variant="outlined"
                sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
              >
                <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
                  {steps.map((label) => (
                    <Step key={label}>
                      <StepLabel>{label}</StepLabel>
                    </Step>
                  ))}
                </Stepper>
                <>
                  {activeStep === steps.length ? (
                    <>
                      <center>
                        <Typography variant="h6" gutterBottom>
                          The form has been submitted successfully!
                        </Typography>
                        <Button
                          variant="contained"
                          color="primary"
                          startIcon={<BarChart />}
                        >
                          View Analytics
                        </Button>
                      </center>
                    </>
                  ) : (
                    <>
                      {getStepContent(activeStep)}
                      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                        {activeStep !== 0 && (
                          <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                            Back
                          </Button>
                        )}
                        {activeStep === steps.length - 1 ? (
                          <>
                            <Button
                              variant="outlined"
                              onClick={handleValidate}
                              sx={{ mt: 3, ml: 1 }}
                            >
                              Validate
                            </Button>
                            <Button
                              variant="contained"
                              onClick={handleSubmit}
                              sx={{ mt: 3, ml: 1 }}
                            >
                              Submit
                            </Button>
                          </>
                        ) : (
                          <Button
                            variant="contained"
                            onClick={handleNext}
                            sx={{ mt: 3, ml: 1 }}
                          >
                            Next
                          </Button>
                        )}
                      </Box>
                    </>
                  )}
                </>
              </Paper>
            </Container>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default withRouter(Register);
