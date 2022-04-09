import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import theme from "./theme";
import Login from "./pages/Login";
import RegisterInvestor from "./pages/RegisterInvestor/Register";
import RegisterStartup from "./pages/RegisterStartup/Register";
import InvestorDashboard from "./pages/InvestorDashboard";
import StartupDashboard from "./pages/StartupDashboard";
import InvestmentPortal from "./pages/InvestmentPortal";
import ProtectedRoute from "./ProtectedRoute";
import StartupDetails from "./pages/StartupDetails";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/register-investor" component={RegisterInvestor} />
          <Route exact path="/register-startup" component={RegisterStartup} />
          <ProtectedRoute
            path="/investor-dashboard"
            component={InvestorDashboard}
          />
          <ProtectedRoute
            path="/startup-dashboard"
            component={StartupDashboard}
          />
          <ProtectedRoute
            path="/investment-portal"
            component={InvestmentPortal}
          />
          <ProtectedRoute path="/startup-details" component={StartupDetails} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
