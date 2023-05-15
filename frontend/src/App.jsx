import "./App.css";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Lobby from "./Components/Lobby/Lobby";
import MainLogin from "./Components/Login/MainLogin";
import RecuperarCuenta from "./Components/RecuperarCuenta/RecuperarCuenta";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Lobby />} />
          <Route path="/login" element={<MainLogin />} />
          <Route path="/resetaccount" element={<RecuperarCuenta />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
