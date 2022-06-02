const express = require("express");
const cors = require("cors");
const fs = require("fs");
const db = require("./src/database/config_db");
const nameToVar = require("./src/modules/nameToVar");

const app = express();

app.use(cors());

app.get("/operadoras", (req, res) => {
  const SQL = "SELECT * FROM operadoras_ativas_ans";

  db.query(SQL, (err, result) => {
    if (err) res.send(err);
    res.send(JSON.stringify(result));
  });
});

app.post("/carregar-arquivo", (req, res) => {
  var result = { titulo: "", chaves: [], dados: [] };

  fs.readFile("./src/assets/Relatorio_cadop.csv", "binary", (err, data) => {
    if (err) throw err;

    const rows = data.replace(/"/g, "").split("\r\n");

    result.titulo = rows[0];
    const chaves = rows[2].split(";");

    for (i in chaves) {
      result.chaves.push(nameToVar(chaves[i]));
    }

    const preparaDados = rows.splice(3, rows.length);
    let dados = [];
    let SQL = "";
    for (let i = 0; i < preparaDados.length - 1; i++) {
      dados = preparaDados[i].split(";");

      SQL = `INSERT INTO operadoras_ativas_ans (${
        result.chaves
      }) VALUES ( ${"?, ".repeat(result.chaves.length - 1)}?)`;
      db.query(SQL, dados);
    }
  });
});

app.listen(3000, () => console.log("Servidor em execução."));
