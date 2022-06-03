const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const db = require("./src/database/config_db");
const nameToVar = require("./src/modules/nameToVar");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());

app.get("/operadoras", (req, res) => {
  const SQL = "SELECT * FROM operadoras_ativas_ans LIMIT 10";

  db.query(SQL, (err, result) => {
    if (err) res.send(err);
    res.send(JSON.stringify(result));
  });
});

app.get("/operadoras/:coluna/:ordem", (req, res) => {
  const coluna = req.params.coluna;
  const ordem = req.params.ordem;
  const SQL = `SELECT * FROM operadoras_ativas_ans ORDER BY ${coluna} ${ordem} LIMIT 10`;

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
  LIKE '${p}' OR cargo_representante LIKE '${p}' OR data_registro_ans LIKE '${p}' LIMIT 10`;

  db.query(SQL, (err, result) => {
    if (err) res.send(err);
    res.send(JSON.stringify(result));
  });
});

app.get("/pesquisar-operadora", (req, res) => {
  const SQL = `SELECT * FROM operadoras_ativas_ans LIMIT 10`;

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

app.get("/operadora/:id", (req, res) => {
  const SQL = "SELECT * FROM operadoras_ativas_ans WHERE id = ?";

  db.query(SQL, req.params.id, (err, result) => {
    if (err) res.send(err);
    res.send(JSON.stringify(result));
  });
});

app.post("/cadastrar-operadora", (req, res) => {
  const values = Object.values(req.body);

  const keys = Object.keys(req.body);

  const SQL =
    "INSERT INTO operadoras_ativas_ans (" +
    keys +
    ") VALUES (" +
    "?, ".repeat(keys.length - 1) +
    "?)";

  db.query(SQL, values, (err, result) => {
    if (err) throw err;

    res.send(result);
  });
});

app.put("/editar-operadora/:id", (req, res) => {
  const { registro_ans } = req.body;
  const { cnpj } = req.body;
  const { razao_social } = req.body;
  const { nome_fantasia } = req.body;
  const { modalidade } = req.body;
  const { logradouro } = req.body;
  const { numero } = req.body;
  const { complemento } = req.body;
  const { bairro } = req.body;
  const { cidade } = req.body;
  const { uf } = req.body;
  const { cep } = req.body;
  const { ddd } = req.body;
  const { telefone } = req.body;
  const { fax } = req.body;
  const { endereco_eletronico } = req.body;
  const { representante } = req.body;
  const { cargo_representante } = req.body;
  const { data_registro_ans } = req.body;

  const SQL =
    "UPDATE operadoras_ativas_ans SET registro_ans = ?, cnpj = ?," +
    " razao_social = ?, nome_fantasia = ?, modalidade = ?, logradouro = ?," +
    " numero = ?, complemento = ?, bairro = ?, cidade = ?, uf = ?, cep = ?," +
    " ddd = ?, telefone = ?, fax = ?, endereco_eletronico = ?, representante = ?," +
    " cargo_representante = ?, data_registro_ans = ? WHERE id = " +
    req.params.id;

  const binds = [
    registro_ans,
    cnpj,
    razao_social,
    nome_fantasia,
    modalidade,
    logradouro,
    numero,
    complemento,
    bairro,
    cidade,
    uf,
    cep,
    ddd,
    telefone,
    fax,
    endereco_eletronico,
    representante,
    cargo_representante,
    data_registro_ans,
  ];

  db.query(SQL, binds, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.listen(3000, () => console.log("Servidor em execução."));
