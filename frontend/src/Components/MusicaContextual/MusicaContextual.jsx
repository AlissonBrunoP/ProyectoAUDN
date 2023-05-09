import React, { useState, useEffect } from "react";
import arrowLeft from "../../assets/icons/position=left-1.svg";
import "./MusicaContextual.css";

function MusicaContextual() {
  const [ocasion, setOcasion] = useState([]);
  const [feels, setFeels] = useState([]);
  const [isSelectOpen, setIsSelectOpen] = useState(false);

  const activity = async () => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    try {
      const response = await fetch(
        "http://localhost:3000/api/ocasion",
        requestOptions
      );
      if (response.ok) {
        const data = await response.json();
        setOcasion(data.ocasion);
      } else {
        alert("Ha ocurrido un error del lado del cliente");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const feeling = async () => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    try {
      const response = await fetch(
        "http://localhost:3000/api/feeling",
        requestOptions
      );
      if (response.ok) {
        const data = await response.json();
        setFeels(data.feels);
      } else {
        alert("Ha ocurrido un error del lado del cliente");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const arrowSelect = () => {
    setIsSelectOpen(!isSelectOpen);
  };

  const selectClass = `selectDropdown ${
    isSelectOpen ? "upArrow" : "downArrow"
  }`;

  return (
    <div>
      <nav className="navBarContextMusic">
        <img src={arrowLeft} alt="Left Arrow" />
        <h3>Música Contextual</h3>
      </nav>
      <section className="selectsContextMusic">
        <label>¿Cuál es la ocasión?</label>
        <select
          className={selectClass}
          onClick={() => {
            arrowSelect();
            activity();
          }}
        >
          <option value="" disabled selected hidden>
            Actividad:
          </option>
          {ocasion.map((item) => (
            <option key={item.id} value={item.name}>
              {item.name}
            </option>
          ))}
        </select>
        <label>¿Cómo te sientes?</label>
        <select
          className={selectClass}
          onClick={() => {
            arrowSelect();
            feeling();
          }}
        >
          <option value="" disabled selected hidden>
            Actividad:
          </option>
          {feels.map((item) => (
            <option key={item.id} value={item.name}>
              {item.name}
            </option>
          ))}
        </select>
        <label>¿Cómo está el clima?</label>
        <input type="text" placeholder="Clima" />
      </section>
      <section>
        <h2>Selecciona hasta 3 géneros:</h2>
      </section>
      <button>Crear Playlist</button>
    </div>
  );
}

export default MusicaContextual;
