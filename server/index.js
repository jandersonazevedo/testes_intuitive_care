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

// ##### ROTAS PARA O CRUD #####

// POST

app.post("/carregar-arquivo", (req, res) => {
  // Faz a leitura do arquivo Relatorio_cadop.csv, e insere todos os dados no banco de dados
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

// GET

app.get("/operadoras/:pesquisa/:coluna/:ordem/:pagina/:limit", (req, res) => {
  //Rota principal para pegar os dados de todas as operadoras, ou as operadors pesquisadas.
  const coluna = req.params.coluna;
  const ordem = req.params.ordem;
  const pagina = req.params.pagina;
  const limit = req.params.limit;

  let SQL = "";

  if (req.params.pesquisa === "[null]") {
    //Se o campo de pesquisa estiver vazio, busca todos as operadoras existentes no banco (sem filtro)
    SQL = `SELECT * FROM operadoras_ativas_ans ORDER BY ${coluna} ${ordem} LIMIT ${limit} OFFSET ${
      pagina * limit - limit
    }`;
  } else {
    const p = `%${req.params.pesquisa.toLowerCase()}%`;
    SQL = `SELECT * FROM operadoras_ativas_ans
          WHERE registro_ans 
          LIKE '${p}' OR cnpj LIKE '${p}' OR razao_social LIKE '${p}' OR nome_fantasia 
          LIKE '${p}' OR modalidade LIKE '${p}' OR logradouro LIKE '${p}' OR numero 
          LIKE '${p}' OR complemento LIKE '${p}' OR bairro LIKE '${p}' OR cidade 
          LIKE '${p}' OR uf LIKE '${p}' OR cep LIKE '${p}' OR ddd LIKE '${p}' OR telefone 
          LIKE '${p}' OR fax LIKE '${p}' OR endereco_eletronico LIKE '${p}' OR representante 
          LIKE '${p}' OR cargo_representante LIKE '${p}' OR data_registro_ans LIKE '${p}'
          ORDER BY ${coluna} ${ordem} LIMIT ${limit} OFFSET ${
      pagina * limit - limit
    }`;
  }

  db.query(SQL, (err, result) => {
    if (err) res.send(err);
    res.send(JSON.stringify(result));
  });
});

app.get("/operadora/:id", (req, res) => {
  // Faz a busca de uma operadora específica
  const SQL = "SELECT * FROM operadoras_ativas_ans WHERE id = ?";

  db.query(SQL, req.params.id, (err, result) => {
    if (err) res.send(err);
    res.send(JSON.stringify(result));
  });
});

// PUT

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

// DELETE

app.delete("/limpar-dados", (req, res) => {
  // Remove todos os dados existente na tabela
  SQL = "TRUNCATE operadoras_ativas_ans";
  db.query(SQL, (err, results) => {
    if (err) res.send(err);
    res.send(JSON.stringify(results));
  });
});

app.delete("/deletar-operadora/:id", (req, res) => {
  SQL = "DELETE FROM operadoras_ativas_ans WHERE id = ?";

  db.query(SQL, req.params.id, (err, result) => {
    if (err) res.send(err);
    res.send(JSON.stringify(result));
  });
});

app.listen(8081, () => console.log("Servidor em execução."));
