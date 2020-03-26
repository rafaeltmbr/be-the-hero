import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiLogIn } from "react-icons/fi";

import "./Form.sass";

export default function Form({ idLength = 8, onSubmit, status }) {
  const [input, setInput] = useState("");

  function handleSubmit(e) {
    e.nativeEvent.preventDefault();
    onSubmit && onSubmit(input);
    setInput("");
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <header>Faça seu Logon</header>
      <input
        placeholder={
          status === "unauthorized" ? "Usuário não encontrado" : "Seu ID"
        }
        value={input}
        onChange={e => setInput(e.target.value)}
        tabIndex={1}
        type="text"
        pattern="[0-9a-fA-F]{8}$"
        maxLength="8"
        required
      />
      <button className="button" type="submit">
        Entrar
      </button>
      <Link to="/register" className="link">
        <FiLogIn size={16} color="#E02041" />
        <p>Não tenho cadastro</p>
      </Link>
    </form>
  );
}
