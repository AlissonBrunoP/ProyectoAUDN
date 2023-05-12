import { Register, MusicaContextual, Login } from "./Components";

const routes = [
  {
    path: "/",
    element: Register(),
  },
  {
    path: "/login",
    element: Login(),
  },
];

export default routes;
