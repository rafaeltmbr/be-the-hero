import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiLogIn } from "react-icons/fi";

import "./Form.sass";

export default function Form({ idLength = 8, onSubmit, onRegister }) {
  const [input, setInput] = useState("");

  const enabled = input.length === idLength;

  function validateInput(e) {
    const { value } = e.target;
    const [match] = value.match(/[0-9a-fA-F]+/) || [];

    if (!value || (match === value && value.length <= idLength)) {
      setInput(value);
    }
  }

  function handleKeydown(e) {
    if (e.nativeEvent.key === "Enter" && !enabled) {
      e.nativeEvent.preventDefault();
    }
  }

  function handleSubmit(e) {
    e.nativeEvent.preventDefault();
    onSubmit && onSubmit(input);
  }

  function handleRegister(e) {
    e.nativeEvent.preventDefault();
    onRegister && onRegister();
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <header>Faça seu Logon</header>
      <input
        placeholder="Seu ID"
        value={input}
        onChange={validateInput}
        tabIndex={1}
        onKeyDown={handleKeydown}
      />
      <button
        className="button"
        type="submit"
        data-enabled={enabled}
        tabIndex={enabled ? 2 : -1}
      >
        Entrar
      </button>
      <Link
        to="/register"
        className="link"
        tabIndex={enabled ? 3 : 2}
        onClick={handleRegister}
      >
        <FiLogIn size={16} color="#E02041" />
        <p>Não tenho cadastro</p>
      </Link>
    </form>
  );
}