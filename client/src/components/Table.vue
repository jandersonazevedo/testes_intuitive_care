<template>
  <div class="container-table">
    <h1 class="table-title">Relação de Operadoras Ativas ANS</h1>

    <div class="search-bar">
      <form @submit="getPesquisa">
        <input
          type="text"
          name="pesquisa"
          placeholder="Digite sua pesquisa aqui"
        />
        <input type="submit" value="Pesquisar" />
      </form>
    </div>

    <table>
      <thead>
        <th @click="orderBy">Registro ANS</th>
        <th>CNPJ</th>
        <th>Nome Fantasia</th>
        <th>Telefone</th>
        <th>E-mail</th>
        <th></th>
      </thead>
      <tbody>
        <tr v-for="op in operadoras" :key="op.id">
          <td>{{ op.registro_ans }}</td>
          <td>{{ op.cnpj }}</td>
          <td>{{ op.nome_fantasia }}</td>
          <td>{{ op.telefone }}</td>
          <td>{{ op.endereco_eletronico }}</td>
          <td>
            <button @click="deletar(op.id)">Deletar</button>
          </td>
        </tr>
      </tbody>
    </table>

    <button @click="restaurarDados" v-show="operadoras">
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
      operadoras: null,
    };
  },
  methods: {
    async getOperadoras() {
      await api
        .get("/operadoras")
        .then((response) => (this.operadoras = response.data));
    },

    async restaurarDados() {
      await api.delete("/limpar-dados");
      await api.post("/carregar-arquivo");
      this.getOperadoras();
    },

    async getPesquisa(event) {
      event.preventDefault();

      const pesquisa = event.target.pesquisa.value;

      api.get(`/pesquisar-operadora/${pesquisa}`).then(({ data }) => {
        this.operadoras = data;
      });
    },

    async deletar(id) {
      if (confirm(`Tem certeza que deseja delatar esta operadora?`)) {
        api.delete(`/deletar-operadora/${id}`);
        this.getOperadoras();
      }
    },

    orderBy() {
      console.log(this.operadoras);
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
  display: flex;
  justify-content: flex-end;
}

table {
  grid-area: table;
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
  cursor: pointer;
  transition: 0.2s;
}

th:hover {
  color: #000;
  background-color: #eee;
}

tr {
  transition: 0.1s;
  cursor: pointer;
}

tr:hover {
  background-color: #eee;
}

td {
  padding: 10px 5px;
  font-size: 14px;
}
</style>