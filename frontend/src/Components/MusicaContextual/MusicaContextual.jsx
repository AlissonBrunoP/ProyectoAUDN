import React from "react";
import arrowLeft from "../../assets/icons/position=left-1.svg";

function MusicaContextual() {
  return (
    <div>
      <nav>
        <img src={arrowLeft} alt="Back" />
        <h2>Música Contextual</h2>
      </nav>
      <div>
        <input type="text" />
      </div>
    </div>
  );
}

export default MusicaContextual;
