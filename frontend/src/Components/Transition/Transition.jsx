import React, { useEffect, useState } from "react";
import loader from "../../assets/icons/Transition.svg";
import tick from "../../assets/icons/TransitionDone.svg";
import gif from "../../assets/gif.gif";
import "./Transition.css";

function Transition() {
  const [loading, setLoading] = useState(true);
  const time = 3000;

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, time);
  }, []);
  return (
    <div className="transition">
      {loading ? (
        <img src={loader} alt="Spinner" className="spinner" />
      ) : (
        <img src={tick} alt="Tick" className="tick" />
      )}
      <img src={gif} alt="Gif" className="video" />
    </div>
  );
}

export default Transition;
