import React, { useState } from "react";

import "./Form.sass";

export default function Form({ onSubmit }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [city, setCity] = useState("");
  const [uf, setUf] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (onSubmit) {
      const inputs = { name, email, whatsapp, city, uf };
      onSubmit(inputs);
    }
  }

  return (
    <form className="register-form" onSubmit={handleSubmit}>
      <input
        tabIndex={1}
        value={name}
        onChange={e => setName(e.target.value)}
        required
        placeholder="Nome da ONG"
      ></input>

      <input
        tabIndex={2}
        value={email}
        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
        onChange={e => setEmail(e.target.value)}
        required
        type="email"
        placeholder="E-mail"
      ></input>

      <input
        tabIndex={3}
        value={whatsapp}
        onChange={e => setWhatsapp(e.target.value)}
        required
        placeholder="WhatsApp"
      ></input>

      <div className="input-group">
        <input
          tabIndex={4}
          value={city}
          onChange={e => setCity(e.target.value)}
          required
          placeholder="Cidade"
        ></input>

        <input
          tabIndex={5}
          value={uf}
          onChange={e => setUf(e.nativeEvent.target.value)}
          minLength="2"
          maxLength="2"
          required
          placeholder="UF"
        ></input>
      </div>

      <button tabIndex={6} className="button" type="submit">
        Cadastrar
      </button>
    </form>
  );
}
