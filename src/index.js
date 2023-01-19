import express from "express";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import indexRoutes from "./routes/index.js";
import sqlite3 from "sqlite3";
import localizar from "./public/js/pais.js";
let sql;

const app = express();

let array = [];

const __dirname = dirname(fileURLToPath(import.meta.url));

//configuraciones
app.set("views", join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.json());
app.use(indexRoutes);

//Cuando se realiza el post  mediante el fech
//este a su vez hace la accion de llevar esos datos a la base de datos de SQLite3
app.post("/contact", (req, res) => {
  console.log(req.body);

  let elementosForm = req.body;
  let ip = req.ip;
  let localizacion = localizar(ip);
  let ipjson = ip;
  let fecha = elementosForm.fecha;
  let nombre = elementosForm.nombre;
  let email = elementosForm.email;
  let mensaje = elementosForm.mensaje;
  //aqui se insertan los datos en la tabla
  sql =
    "INSERT INTO users (fecha,nombre,email,mensaje,ipjson,localizacion)VALUES (?,?,?,?,?,?)";
  db.run(sql, [fecha, nombre, email, mensaje, ipjson, localizacion], (err) => {
    if (err) return console.error(err.message);
  });
  //este comando es para conssultar la tabla y mostrarla en la consola
  // en total hay 7 usuarios de prueba puede que halla mas.
  //se le pusieron nombres aleatorios
  sql = "SELECT * FROM users";
  db.all(sql, [], (err, rows) => {
    if (err) return console.error(err.message);
    rows.forEach((row) => {
      console.log(row);
    });
  });
  res.send(req.body);

});

const db = new sqlite3.Database(
  "./db/form.db",
  sqlite3.OPEN_READWRITE,
  (err) => {
    if (err) return console.error(err.message);
  }
);
//se crea la tabla//
/*  sql = 'ALTER TABLE users ADD localizacion';
db.run(sql); */

app.use(express.static(join(__dirname, "public")));

const PORT = process.env.PORT || 3000;
console.log("server on port", PORT);

app.listen(PORT, () => {
  console.log("server in port:", PORT);
});
