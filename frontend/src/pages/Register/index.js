import React from "react";
import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

import "./styles.sass";
import Logo from "../../assets/logo.svg";
import Form from "./Form";

export default function Register() {
  return (
    <div className="register">
      <div className="content">
        <section>
          <img className="logo" src={Logo} alt="Be The Hero" />
          <h1>Cadastro</h1>
          <p>
            Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem
            os casos da sua ONG.
          </p>
          <Link to="/" className="link">
            <FiArrowLeft size={16} color="#E02041" />
            <p>Já tenho cadastro</p>
          </Link>
        </section>
        <Form />
      </div>
    </div>
  );
}
