import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import routes from "./routes";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {routes.map((route) => (
            <Route path={route.path} element={route.element} key={route.path} />
          ))}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
