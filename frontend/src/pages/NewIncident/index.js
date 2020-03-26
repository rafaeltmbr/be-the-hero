import React from "react";

import "./styles.sass";
import Logo from "../../assets/logo.svg";

export default function NewIncident() {
  return (
    <div className="new-incident">
      <img src={Logo} alt="Be The Hero" />
      <h1>New Incident</h1>
    </div>
  );
}
