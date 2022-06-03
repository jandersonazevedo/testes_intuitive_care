<template>
  <div class="container-table">
    <h1 class="table-title">Relação de Operadoras Ativas ANS</h1>

    <div class="top-buttons">
      <router-link to="/cadastrar" class="btn">Cadastrar operadora</router-link>
      <button @click="restaurarDados" v-show="operadoras">
        Restaurar dados iniciais
      </button>
      <form @submit="getPesquisa" class="search-bar">
        <input
          type="text"
          name="pesquisa"
          placeholder="Digite sua pesquisa aqui"
          class="campo-pesquisa"
        />
        <input type="submit" value="Pesquisar" class="btn-pesquisar" />
      </form>
    </div>
    <h1 v-show="loading">Carregando...</h1>
    <table>
      <thead>
        <th @click="orderBy">Registro ANS</th>
        <th>CNPJ</th>
        <th>Nome Fantasia</th>
        <th>Telefone</th>
        <th>E-mail</th>
        <th></th>
      </thead>
      <tbody v-show="!loading">
        <tr v-for="op in operadoras" :key="op.id">
          <td>{{ op.registro_ans }}</td>
          <td>{{ op.cnpj }}</td>
          <td>{{ op.nome_fantasia }}</td>
          <td>{{ op.telefone }}</td>
          <td>{{ op.endereco_eletronico }}</td>
          <td>
            <div class="btn-acoes">
              <button @click="deletar(op.id)" class="btn-deletar">
                Deletar
              </button>
              <router-link :to="`/editar/${op.id}`" class="btn btn-editar"
                >Editar</router-link
              >
              <router-link :to="`/detalhes/${op.id}`" class="btn btn-detalhes"
                >Detalhes</router-link
              >
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import api from "@/services/api";

export default {
  name: "Table",
  data() {
    return {
      operadoras: null,
      loading: false,
    };
  },
  methods: {
    async getOperadoras() {
      this.loading = true;
      await api
        .get("/operadoras")
        .then((response) => (this.operadoras = response.data));
      this.loading = false;
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

<style>
.table-title {
  grid-area: h1;
  font-size: 20px;
  font-weight: 400;
  color: #5161f1;
}
</style>

<style scoped>
.container-table {
  display: grid;
  grid-template-areas: "h1 div" "table table";
  column-gap: 12px;
  row-gap: 12px;
}

.top-buttons {
  grid-area: div;
  display: flex;
  justify-content: flex-end;
  column-gap: 10px;
  row-gap: 10px;
  max-height: fit-content;
}

table {
  grid-area: table;
  text-align: left;
  border-collapse: collapse;
  width: 100%;
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
  border-bottom: 1px solid #ddd;
  word-wrap: wrap;
}

.campo-pesquisa {
  border-radius: 4px 0px 0px 4px;
  border: 1px solid #555;
  background-color: #fdfdfd;
  padding: 6px 10px;
}

.btn-pesquisar {
  background-color: #555;
  border: 1px solid #555;
  color: #fdfdfd;
  padding: 6px 5px;
  border-radius: 0px 4px 4px 0px;
  cursor: pointer;
  transition: 0.1s;
}

.search-bar:hover > .campo-pesquisa,
.search-bar:hover > .btn-pesquisar,
.campo-pesquisa:focus,
.btn-pesquisar:focus {
  border: 1px solid #777;
}

.search-bar:hover > .btn-pesquisar {
  background-color: #777;
}

.btn-acoes {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  column-gap: 10px;
  row-gap: 10px;
}
</style>