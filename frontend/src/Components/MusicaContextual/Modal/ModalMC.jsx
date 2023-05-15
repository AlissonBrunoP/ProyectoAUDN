import React, { useState } from "react";
import "./ModalMC.css";
import question from "../../../assets/icons/question-mark-1.svg";

function ModalMC(props) {
  const { showModal, closeModal, notShowAgain } = props;

  if (!showModal) {
    return null;
  }

  return (
    <div className="modalContainer">
      <div className="question">
        <img src={question} alt="Question Mark" className="questionImg" />
      </div>
      <h3 className="info">
        Llena cuantos campos quieras y crearemos una playlist basada en tus
        respuestas
      </h3>
      <button className="close" onClick={closeModal}>
        Entendido
      </button>
      <button className="notShow" onClick={notShowAgain}>
        No volver a mostrar
      </button>
    </div>
  );
}

export default ModalMC;
