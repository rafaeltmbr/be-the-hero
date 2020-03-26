import React, { useState } from "react";

import "./Form.sass";

export default function Form({ onSubmit }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [value, setValue] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (onSubmit) {
      const inputs = { title, description, value: Number(value) };
      onSubmit(inputs);
    }
  }

  return (
    <form className="incident-form" onSubmit={handleSubmit}>
      <input
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Titulo do caso"
        required
      ></input>

      <textarea
        value={description}
        onChange={e => setDescription(e.target.value)}
        placeholder="Descrição"
        required
      ></textarea>

      <input
        value={value}
        type="number"
        min="1"
        step="any"
        onChange={e => setValue(e.target.value)}
        placeholder="Valor em reais"
        required
      ></input>

      <button className="button" type="submit">
        Cadastrar
      </button>
    </form>
  );
}
