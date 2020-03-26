import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import Form from "./Form";
import "./styles.sass";
import api from "../../services/api";

import logo from "../../assets/logo.svg";
import heroes from "../../assets/heroes.png";

export default function Logon() {
  const [status, setStatus] = useState("waiting");
  const history = useHistory();

  async function onSubmit(id) {
    try {
      const {
        data: { name }
      } = await api.post("sessions", { id });
      localStorage.setItem("ong_id", id);
      localStorage.setItem("ong_name", name);
      history.push("/profile");
    } catch (err) {
      setStatus("unauthorized");
      console.warn(err.response ? err.response.data : err.message);
    }
  }

  return (
    <div className="logon">
      <div className="flex-container">
        <section className="form-container">
          <img className="logo" alt="Be The Hero logo" src={logo} />
          <Form status={status} onSubmit={onSubmit} />
        </section>
        <img className="heroes" alt="Heroes banner" src={heroes} />
      </div>
    </div>
  );
}
