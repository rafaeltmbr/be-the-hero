import React from "react";

import "./Form.sass";

export default function Form() {
  return (
    <form className="register-form">
      <input placeholder="Nome da ONG"></input>
      <input type="email" placeholder="E-mail"></input>
      <input placeholder="WhatsApp"></input>
      <div className="input-group">
        <input placeholder="Cidade"></input>
        <input placeholder="UF"></input>
      </div>
      <button className="button" type="submit">
        Cadastrar
      </button>
    </form>
  );
}
