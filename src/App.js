import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import theme from "./theme";
import Login from "./pages/Login";
import RegisterInvestor from "./pages/RegisterInvestor/Register";
import RegisterStartup from "./pages/RegisterStartup/Register";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/register-investor" component={RegisterInvestor} />
          <Route exact path="/register-startup" component={RegisterStartup} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
