import React from "react";
import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

import "./styles.sass";
import Logo from "../../assets/logo.svg";
import Form from "./Form";

export default function NewIncident() {
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
        <Form />
      </div>
    </div>
  );
}
