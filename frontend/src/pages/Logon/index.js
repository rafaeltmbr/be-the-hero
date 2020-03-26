import React from "react";

import Form from "./Form";
import "./styles.sass";

import { url } from "../server.json";

import logo from "../../assets/logo.svg";
import heroes from "../../assets/heroes.png";

export default function Logon() {
  async function onSubmit(id) {
    try {
      const res = await fetch(url + "/sessions", {
        method: "POST",
        body: JSON.stringify({ id })
      });
      console.log(res);
    } catch (err) {
      console.error({ message: err.message });
    }
  }

  return (
    <div className="logon">
      <div className="flex-container">
        <section className="form-container">
          <img className="logo" alt="Be The Hero logo" src={logo} />
          <Form
            onSubmit={onSubmit}
            onRegister={() => console.log("new register")}
          />
        </section>
        <img className="heroes" alt="Heroes banner" src={heroes} />
      </div>
    </div>
  );
}
