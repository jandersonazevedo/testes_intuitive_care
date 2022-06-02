const fs = require("fs");
const nameToVar = require("./nameToVar");
const db = require("../database/config_db");

const carregarArquivo = () => {
  var result = { titulo: "", chaves: [], dados: [] };

  return fs.readFile("../assets/Relatorio_cadop.csv", "binary", (err, data) => {
    if (err) throw err;

    const rows = data.replace(/"/g, "").split("\r\n");

    result.titulo = rows[0];
    const chaves = rows[2].split(";");

    for (i in chaves) {
      result.chaves.push(nameToVar(chaves[i]));
    }

    const preparaDados = rows.splice(3, rows.length);
    let dados = [];

    for (i in preparaDados) {
      dados = preparaDados[i].split(";");
      for (j in dados) {
        result.dados.push(dados[j]);
      }
    }

    const SQL = `INSERT INTO operadoras_ativas_ans (${result.chaves}) VALUES ${
      ("(" + "?, ".repeat(result.chaves.length - 1) + "?), ").repeat(
        result.dados.length - 1
      ) +
      ("(" + "?, ".repeat(result.chaves.length - 1) + "?)")
    }`;

    // db.query(SQL, result.dados);
  });
};

module.exports = carregarArquivo;
