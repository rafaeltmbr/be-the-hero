import React from "react";

import "./Form.sass";

export default function Form() {
  return (
    <form className="incident-form">
      <input placeholder="Titulo do caso"></input>
      <textarea placeholder="Descrição"></textarea>
      <input placeholder="Valor em reais"></input>
      <button className="button" type="submit">
        Cadastrar
      </button>
    </form>
  );
}
