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

app.delete("/limpar-dados", (req, res) => {
  SQL = "TRUNCATE operadoras_ativas_ans";
  db.query(SQL, (err, results) => {
    if (err) res.send(err);
    res.send(JSON.stringify(results));
  });
});

app.get("/pesquisar-operadora/:pesquisa", (req, res) => {
  const p = `%${req.params.pesquisa.toLowerCase()}%`;
  const SQL = `SELECT * FROM operadoras_ativas_ans WHERE registro_ans 
  LIKE '${p}' OR cnpj LIKE '${p}' OR razao_social LIKE '${p}' OR nome_fantasia 
  LIKE '${p}' OR modalidade LIKE '${p}' OR logradouro LIKE '${p}' OR numero 
  LIKE '${p}' OR complemento LIKE '${p}' OR bairro LIKE '${p}' OR cidade 
  LIKE '${p}' OR uf LIKE '${p}' OR cep LIKE '${p}' OR ddd LIKE '${p}' OR telefone 
  LIKE '${p}' OR fax LIKE '${p}' OR endereco_eletronico LIKE '${p}' OR representante 
  LIKE '${p}' OR cargo_representante LIKE '${p}' OR data_registro_ans LIKE '${p}'`;

  db.query(SQL, (err, result) => {
    if (err) res.send(err);
    res.send(JSON.stringify(result));
  });
});

app.get("/pesquisar-operadora", (req, res) => {
  const SQL = `SELECT * FROM operadoras_ativas_ans`;

  db.query(SQL, (err, result) => {
    if (err) res.send(err);
    res.send(JSON.stringify(result));
  });
});

app.delete("/deletar-operadora/:id", (req, res) => {
  SQL = "DELETE FROM operadoras_ativas_ans WHERE id = ?";

  db.query(SQL, req.params.id, (err, result) => {
    if (err) res.send(err);
    res.send(JSON.stringify(result));
  });
});

app.listen(3000, () => console.log("Servidor em execução."));
