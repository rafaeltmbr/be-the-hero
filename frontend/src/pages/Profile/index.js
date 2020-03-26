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

  const fetchAndUpdateIncidents = useCallback(async () => {
    if (!id) return;

    try {
      const res = await api.get("profile", {
        headers: {
          Authorization: id
        }
      });
      setIncidents(res.data.incidents);
    } catch (err) {
      console.warn(err.response ? err.response.data : err.message);
      handleLogout();
    }
  }, [handleLogout, id]);

  useEffect(() => {
    fetchAndUpdateIncidents();
  }, [fetchAndUpdateIncidents, id]);

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

  async function deleteIncident(incidentID) {
    try {
      debugger;
      await api.delete(`incidents/${incidentID}`, {
        headers: {
          Authorization: id
        }
      });
      fetchAndUpdateIncidents();
    } catch (err) {
      console.warn(err.response ? err.response.data : err.message);
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
        {incidents.map(c => (
          <li key={c.id}>
            <strong>CASO:</strong>
            <p>{c.title}</p>
            <strong>DESCRIÇÃO</strong>
            <p>{c.description}</p>
            <strong>VALOR:</strong>
            <p>
              {Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL"
              }).format(c.value)}
            </p>
            <button type="button" onClick={() => deleteIncident(c.id)}>
              <FiTrash2 size={18} color="#a8a8b3" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
