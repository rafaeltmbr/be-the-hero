import React, { useState, useEffect, useCallback } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiPower } from "react-icons/fi";
import { FiTrash2 } from "react-icons/fi";

import "./styles.sass";
import Logo from "../../assets/logo.svg";
import api from "../../services/api";

export default function Profile() {
  const [name, setName] = useState("");
  const [id, setId] = useState();
  const [incidents, setIncidents] = useState([]);
  const history = useHistory();

  const handleLogout = useCallback(() => {
    localStorage.clear();
    history.push("/");
  }, [history]);

  function fetchAndUpdateIncidents() {
    if (!id) return;

    try {
      api
        .get("profile", {
          headers: {
            Authorization: id
          }
        })
        .then(res => setIncidents(res.data.incidents));
    } catch (err) {
      console.warn(err);
    }
  }
  useEffect(fetchAndUpdateIncidents, [id]);

  useEffect(() => {
    const n = localStorage.getItem("ong_name");
    if (n) {
      setName(n);
    } else {
      handleLogout();
    }
  }, [handleLogout]);

  useEffect(() => {
    const id = localStorage.getItem("ong_id");
    if (id) {
      setId(id);
    } else {
      handleLogout();
    }
  }, [handleLogout]);

  async function deleteIncident(index) {
    try {
      debugger;
      await api.delete(`incidents/${incidents[index].id}`, {
        headers: {
          Authorization: id
        }
      });
      fetchAndUpdateIncidents();
    } catch (err) {
      console.warn(err.response.data);
    }
  }

  return (
    <div className="profile">
      <header>
        <img className="logo" src={Logo} alt="Be The Hero" />
        <span>Bem vinda, {name}</span>
        <Link to="/incidents/new" className="button">
          Cadastrar novo caso
        </Link>
        <button type="button" onClick={handleLogout}>
          <FiPower size={18} color="#E02041" />
        </button>
      </header>

      <h1>
        {incidents.length ? "Casos cadastrados" : "Sem casos cadastrados"}
      </h1>

      <ul>
        {incidents.map((c, i) => (
          <li key={i}>
            <strong>CASO:</strong>
            <p>{c.title}</p>
            <strong>DESCRIÇÃO</strong>
            <p>{c.description}</p>
            <strong>VALOR:</strong>
            <p>R$ {Number(c.value).toFixed(2)}</p>
            <button type="button" onClick={() => deleteIncident(i)}>
              <FiTrash2 size={18} color="#a8a8b3" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
