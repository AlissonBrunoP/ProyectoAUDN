const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const audnRoutes = require("./routes/audnRoutes");


//creamos el servidor con express
const app = express();

//middleware    man in the middle
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cors());

// colocar rutas
app.use("/api", audnRoutes)

// levantar el servidor en un puerto
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("Servidor levantado en el puerto 3000");
});