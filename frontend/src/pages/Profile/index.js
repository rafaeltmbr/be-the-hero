import React from "react";
import { Link } from "react-router-dom";
import { FiPower } from "react-icons/fi";
import { FiTrash2 } from "react-icons/fi";

import "./styles.sass";
import Logo from "../../assets/logo.svg";

export default function Profile() {
  const ong = {
    name: "APAD - Associação dos animais com deficiência",
    email: "contato@apad.com.br",
    whatsapp: "+55 (44) 98877-6655",
    city: "Rio do Sul",
    uf: "SC"
  };

  const casos = [
    {
      title: "Lollizitas dog",
      description: "Sadly, Lolly was injured after a car crash on her",
      value: 120.5
    },
    {
      title: "Lollizitas dog2",
      description: "Sadly, Lolly was injured after a car crash on her",
      value: 120.5
    },
    {
      title: "Lollizitas dog3",
      description: "Sadly, Lolly was injured after a car crash on her",
      value: 120.5
    },
    {
      title: "Lollizitas dog4",
      description: "Sadly, Lolly was injured after a car crash on her",
      value: 120.5
    }
  ];

  return (
    <div className="profile">
      <header>
        <img className="logo" src={Logo} alt="Be The Hero" />
        <span>Bem vinda, {ong.name}</span>
        <Link to="/incidents/new" className="button">
          Cadastrar novo caso
        </Link>
        <button type="button">
          <FiPower size={18} color="#E02041" />
        </button>
      </header>

      <h1>Casos cadastrados</h1>

      <ul>
        {casos.map((c, i) => (
          <li key={i}>
            <strong>CASO:</strong>
            <p>{c.title}</p>
            <strong>DESCRIÇÃO</strong>
            <p>{c.description}</p>
            <strong>VALOR:</strong>
            <p>R$ {c.value}</p>
            <button type="button">
              <FiTrash2 size={18} color="#a8a8b3" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
