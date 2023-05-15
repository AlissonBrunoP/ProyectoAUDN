import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import MusicaContextual from "./Components/MusicaContextual/MusicaContextual.jsx";
import Playlist from "./Components/Playlist/Playlist.jsx";
import Searcher from "./Components/Searcher/Searcher.jsx";
import Friends from "./Components/Friends/Friends.jsx";
import Error from "./Components/ErrorPage/Error.jsx";

const Router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/contextMusic", element: <MusicaContextual /> },
  { path: "/playlist", element: <Playlist /> },
  { path: "/search", element: <Searcher /> },
  { path: "/friends", element: <Friends /> },
  { path: "*", element: <Error /> },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={Router} />
  </React.StrictMode>
);
