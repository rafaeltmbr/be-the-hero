import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

import "./styles.sass";
import Logo from "../../assets/logo.svg";
import Form from "./Form";
import api from "../../services/api";

export default function NewIncident() {
  const [id, setId] = useState();
  const history = useHistory();

  useEffect(() => {
    const i = localStorage.getItem("ong_id");
    if (i) {
      setId(i);
    } else {
      history.push("/");
      localStorage.clear();
    }
  }, [history]);

  async function handleSubmit(incident) {
    try {
      await api.post("incidents", incident, {
        headers: {
          Authorization: id
        }
      });
    } catch (err) {
      console.warn(err.response.data);
    } finally {
      history.push("/profile");
    }
  }

  return (
    <div className="new-incident">
      <div className="content">
        <section>
          <img className="logo" src={Logo} alt="Be The Hero" />
          <h1>Cadastrar novo caso</h1>
          <p>
            Descreva o caso detalhadamente para encontrar um herói para resolver
            isso.
          </p>
          <Link to="/profile" className="link">
            <FiArrowLeft size={16} color="#E02041" />
            <p>Voltar para home</p>
          </Link>
        </section>
        <Form onSubmit={handleSubmit} />
      </div>
    </div>
  );
}
