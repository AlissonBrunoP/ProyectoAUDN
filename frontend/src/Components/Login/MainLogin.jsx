/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import arrowLeft from "../../assets/icons/position=left-1.svg";
import closedEye from "../../assets/icons/state=closed.svg";
import openEye from "../../assets/icons/state=open.svg";
import "./MainLogin.css";

function MainLogin() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showError, setShowError] = useState(false);

  function togglePasswordVisibility() {
    setIsPasswordVisible((visible) => !visible);
  }

  function handleUsernameChange(event) {
    setUsername(event.target.value);
    if (event.target.value.trim() === "") {
      setUsernameError("Por favor, ingresa un nombre de usuario o e-mail válido.");
    } else {
      setUsernameError("");
    }
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
    if (event.target.value.trim() === "") {
      setPasswordError("Por favor, ingresa una contraseña válida.");
    } else {
      setPasswordError("");
    }
  }

  async function handleLogin(event) {
    event.preventDefault();
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      user_name: username,
      password: password,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    try {
      const response = await fetch(
        "http://localhost:3000/api/login",
        requestOptions
      );
      if (response.ok) {
        const respuesta = await response.json();
        localStorage.setItem("token", respuesta.token);
        navigate("/home");
        setError("");
        setShowError(false);
      } else {
        const respuesta = await response.json();
        console.log(respuesta.error);
        setError(respuesta.error);
        setShowError(true);
      }
    } catch (error) {
      setError(error.message);
    }
  }

  const isFormValid = username.trim() !== "" && password.trim() !== "";

  return (
    <>
      <header className="headerLogin">
        <NavLink to="/">
          <img src={arrowLeft} alt="Left Arrow" />
        </NavLink>
        <h3 className="iniciarsesionML">Iniciar Sesión</h3>
      </header>

      <main className="mainLogin">
        <form
          className="form"
          action="submit"
          onSubmit={handleLogin}
          style={{
            position: "relative",
          }}
        >
          <p className="labelTitleML">Nombre de Usuario o E-mail:</p>

          <input
            className={`input-login ${usernameError || showError && "error"}`}
            type="text"
            value={username}
            onChange={handleUsernameChange}
          />
          {usernameError && (
            <p className="error-message" style={{ color: "red" }}>
              {usernameError}
            </p>
          )}
          {showError && error && (
            <p className="error-message" style={{ color: "red" }}>
              {error}
            </p>
          )}
          <p className="labelPassML">Contraseña</p>
          <input
            className={`input-login ${passwordError || showError && "error"}`}
            type={isPasswordVisible ? "text" : "password"}
            value={password}
            onChange={handlePasswordChange}
          />
          {isPasswordVisible ? (
            <img
              src={openEye}
              style={{
                position: "absolute",
                right: 12,
                bottom: 10,
              }}
              onClick={togglePasswordVisibility}
              onKeyDown={togglePasswordVisibility}
              alt="Arrow Left"
            />
          ) : (
            <img
              src={closedEye}
              style={{
                position: "absolute",
                right: 12,
                bottom: 10,
              }}
              onClick={togglePasswordVisibility}
              onKeyDown={togglePasswordVisibility}
              alt="Arrow Left"
            />
          )}
          {passwordError && (
            <p className="error-message" style={{ color: "red" }}>
              {passwordError}
            </p>
          )}
        </form>

        <button
          type="submit"
          className={isFormValid ? "button" : "inactivebutton"}
          disabled={!isFormValid}
          onClick={handleLogin}
        >
          Iniciar Sesión
        </button>

        <button type="button" className="olvido">
          <NavLink to="/resetaccount"> ¿Olvidaste tu contraseña? </NavLink>
        </button>
      </main>
    </>
  );
}

export default MainLogin;
