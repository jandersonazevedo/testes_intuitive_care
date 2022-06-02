<template>
  <div class="container-table">
    <h1 class="table-title">{{ title }}</h1>

    <div class="search-bar">
      <input type="text" placeholder="Digite sua pesquisa aqui" />
      <input type="submit" value="Pesquisar" />
    </div>

    <table>
      <thead>
        <th>Registro ANS</th>
        <th>CNPJ</th>
        <th>Nome Fantasia</th>
        <th>Modalidade</th>
        <th>Telefone</th>
        <th>E-mail</th>
      </thead>
      <tbody>
        <tr v-for="op in operadoras" :key="op.id">
          <td>{{ op.registro_ans }}</td>
          <td>{{ op.cnpj }}</td>
          <td>{{ op.nome_fantasia }}</td>
          <td>{{ op.modalidade }}</td>
          <td>{{ op.telefone }}</td>
          <td>{{ op.endereco_eletronico }}</td>
        </tr>
      </tbody>
    </table>

    <button @click="carregarArquivo" v-show="operadoras">
      Restaurar dados iniciais
    </button>
  </div>
</template>

<script>
import api from "@/services/api";

export default {
  name: "Table",
  data() {
    return {
      title: null,
      operadoras: null,
    };
  },
  methods: {
    getOperadoras() {
      api
        .get("/operadoras")
        .then((response) => (this.operadoras = response.data));
    },
    carregarArquivo() {
      api.post("/carregar-arquivo");
      this.getOperadoras();
    },
  },
  mounted() {
    this.getOperadoras();
  },
};
</script>

<style scoped>
.container-table {
  display: grid;
  grid-template-areas: "h1 div" "table table";
  column-gap: 12px;
  row-gap: 12px;
}

.table-title {
  grid-area: h1;
  font-size: 20px;
  font-weight: 400;
  color: #5161f1;
}

.search-bar {
  grid-area: div;
}

table {
  grid-area: table;
  height: 100px;
  text-align: left;
  border-collapse: collapse;
}

thead {
  border-bottom: 2px solid #bbb;
}

th {
  padding: 5px;
  font-size: 15px;
  color: #333;
}
</style>