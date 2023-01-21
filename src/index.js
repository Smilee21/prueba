import express from "express";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import indexRoutes from "./routes/index.js";
import sqlite3 from "sqlite3";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
let sql;
dotenv.config()
// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "antomigel23@gmail.com",
    pass: process.env.MAIL_KEY,
  },
});

const app = express();

const __dirname = dirname(fileURLToPath(import.meta.url));

//configuraciones
app.set("views", join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.json());
app.use(indexRoutes);

//Cuando se realiza el post  mediante el fecht
//este a su vez hace la accion de llevar esos datos a la base de datos de SQLite3
app.post("/contact", async (req, res) => {
  let elementosForm = req.body;
  let localizacion = elementosForm.pais;
  let ipjson = elementosForm.ip;
  let fecha = elementosForm.fecha;
  let nombre = elementosForm.nombre;
  let email = elementosForm.email;
  let mensaje = elementosForm.mensaje;
  //send to email
    await transporter.sendMail({
    from: '"ANTONIO VOLCAN" <antomigel23@gmail.com>', // sender address
    to: "antomigel23@dispostable.com",
    subject: "Alguien quiere contactarse contigo", // Subject line
    text: `Se a registrado un nuevo usuario 
              Nombre: ${nombre}
              Email: ${email}
              Pais: ${localizacion}
              Ip: ${ipjson}
              Fecha: ${fecha}
              Mensaje del usuario: ${mensaje}`
              
  });

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
