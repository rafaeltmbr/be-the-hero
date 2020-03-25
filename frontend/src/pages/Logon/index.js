import React from "react";

import Form from "./Form";
import "./styles.sass";

import logo from "../../assets/logo.svg";
import heroes from "../../assets/heroes.png";

export default function Logon() {
  return (
    <div className="logon">
      <div className="flex-container">
        <section className="form-container">
          <img className="logo" alt="Be The Hero logo" src={logo} />
          <Form
            onSubmit={i => console.log("submit:", i)}
            onRegister={() => console.log("new register")}
          />
        </section>
        <img className="heroes" alt="Heroes banner" src={heroes} />
      </div>
    </div>
  );
}
