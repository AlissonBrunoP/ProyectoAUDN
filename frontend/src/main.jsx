import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import MusicaContextual from "./Components/MusicaContextual/MusicaContextual.jsx";

const Router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/MusicaContextual", element: <MusicaContextual /> },
  { path: "/songs/:id", element: <CupidoMusical /> },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={Router} />
  </React.StrictMode>
);
