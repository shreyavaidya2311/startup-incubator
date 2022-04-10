import React from "react";
import Navbar from "../components/Navbar";
import { withRouter } from "react-router-dom";

function StartupPortal() {
  return (
    <div>
      <Navbar role="startup" />
    </div>
  );
}

export default withRouter(StartupPortal);
