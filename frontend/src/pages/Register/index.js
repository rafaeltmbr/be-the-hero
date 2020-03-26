import React from "react";
import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

import "./styles.sass";
import api from "../../services/api";
import Logo from "../../assets/logo.svg";
import Form from "./Form";

export default function Register() {
  const history = useHistory();

  async function handleRegister(inputs) {
    try {
      const res = await api.post("ongs", inputs);
      alert(`Seu id de acesso: ${res.data.ong_id}`);
      history.push("/");
    } catch (err) {
      alert("Usuário não cadastrado, tente novamente");
      console.warn(err.response ? err.response.data : err.message);
    }
  }

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
            <p>Voltar para o logon</p>
          </Link>
        </section>
        <Form onSubmit={handleRegister} />
      </div>
    </div>
  );
}
