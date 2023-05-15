import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./RecuperarCuenta.css";
import arrowLeft from "../../assets/icons/position=left-1.svg";

function Recuperar() {
  const [inputValue, setInputValue] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(false);

  const validateEmail = (email) => {
    // Expresión regular para validar el formato del correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleInputChange = (event) => {
    // const value = event.target.value;
    const { value } = event.target;
    setInputValue(value);
    setIsValidEmail(validateEmail(value));
  };

  const handleContinueClick = () => {
    //  agregar la lógica para continuar

    console.log("Continuar");
  };

  return (
    <div className="container">
      <header className="header">
        <NavLink to="/login">
          <img src={arrowLeft} alt="Left Arrow" />
        </NavLink>
        <h4>Recuperar Cuenta</h4>
      </header>
      <div className="content">
        <h3>Nombre de Usuario o E-mail:</h3>
        <input
          value={inputValue}
          type="text"
          name="recuperar"
          className="input-field"
          onChange={handleInputChange}
        />
        <p className="rules">
          Deberás poder ingresar al e-mail de la cuenta para poder recuperarla.
        </p>
        <button
          value=""
          type="submit"
          className={isValidEmail ? "button" : "inactivebutton"}
          disabled={!isValidEmail}
          onClick={handleContinueClick}
        >
          Continuar
        </button>
      </div>
    </div>
  );
}

export default Recuperar;
