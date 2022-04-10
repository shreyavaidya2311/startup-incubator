import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import theme from "./theme";
import Login from "./pages/Login";
import RegisterInvestor from "./pages/RegisterInvestor/Register";
import RegisterStartup from "./pages/RegisterStartup/Register";
import InvestmentPortal from "./pages/InvestmentPortal";
import StartupPortal from "./pages/StartupPortal";
import StartupDetails from "./pages/StartupDetails";
import InvestorDetails from "./pages/InvestorDetails";
import InvestorOffers from "./pages/InvestorOffers";
import ProtectedRoute from "./ProtectedRoute";
import CommunityChat from "./pages/CommunityChat";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/register-investor" component={RegisterInvestor} />
          <Route exact path="/register-startup" component={RegisterStartup} />
          <ProtectedRoute
            path="/investment-portal"
            component={InvestmentPortal}
          />
          <ProtectedRoute path="/startup-portal" component={StartupPortal} />
          <ProtectedRoute path="/startup-details" component={StartupDetails} />
          <ProtectedRoute
            path="/investor-details"
            component={InvestorDetails}
          />
          <ProtectedRoute path="/investor-offers" component={InvestorOffers} />
          <ProtectedRoute
            path="/community-chat"
            component={CommunityChat}
          />
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
