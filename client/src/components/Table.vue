<template>
  <div class="container-table">
    <div class="top-container">
      <h1 class="table-title" onclick="getOperadoras">Relação de Operadoras Ativas ANS</h1>

      <div class="top-buttons">
        <router-link to="/cadastrar" class="btn btn-cadastrar"
          >Cadastrar operadora</router-link
        >

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
    </div>

    <div class="table">
      <table>
        <thead>
          <th @click="ordenar('id')">
            ID
            <span v-show="orderBy.coluna == 'id'">{{ setaOrdem }}</span>
          </th>
          <th @click="ordenar('registro_ans')">
            Registro ANS
            <span v-show="orderBy.coluna == 'registro_ans'">{{
              setaOrdem
            }}</span>
          </th>
          <th @click="ordenar('cnpj')">
            CNPJ
            <span v-show="orderBy.coluna == 'cnpj'">{{ setaOrdem }}</span>
          </th>
          <th @click="ordenar('nome_fantasia')">
            Nome Fantasia
            <span v-show="orderBy.coluna == 'nome_fantasia'">{{
              setaOrdem
            }}</span>
          </th>
          <th @click="ordenar('endereco_eletronico')">
            Endereço eletrônico
            <span v-show="orderBy.coluna == 'endereco_eletronico'">{{
              setaOrdem
            }}</span>
          </th>
          <th @click="ordenar('telefone')">
            Telefone
            <span v-show="orderBy.coluna == 'telefone'">{{ setaOrdem }}</span>
          </th>

          <th style="cursor: default"></th>
        </thead>
        <tbody class="dados-tabela" v-show="!sem_dados">
          <tr v-for="op in operadoras" :key="op.id">
            <td class="id">{{ op.id }}</td>
            <td class="registro_ans">{{ op.registro_ans }}</td>
            <td class="cnpj">{{ op.cnpj }}</td>
            <td class="nome_fantasia">{{ op.nome_fantasia }}</td>
            <td class="endereco_eletronico">{{ op.endereco_eletronico }}</td>
            <td class="telefone">
              <span v-show="op.ddd">({{ op.ddd }})</span> {{ op.telefone }}
            </td>
            <td class="acoes">
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
        <h1 v-show="sem_dados" class="sem-dados">Sem dados para exibir.</h1>
      </table>
    </div>
    <div class="bottom-buttons">
      <label>
        Limite:
        <input type="number" min="1" v-model="limite" class="input-limit" />
      </label>
      <div class="paginacao">
        <button @click="pagina--" v-show="pagina > 1">Anterior</button>
        <input type="number" min="1" v-model="pagina" class="input-pagina" />
        <button @click="pagina++">Próximo</button>
      </div>
      <select @change="opcoes_de_dados">
        <option value="">Opções de dados</option>
        <option value="restaurarDados">Restaurar dados originais</option>
        <option value="limparDados">Limpar todos os dados</option>
      </select>
    </div>
  </div>
</template>

<script>
import api from "@/services/api";

export default {
  name: "Table",
  data() {
    return {
      operadoras: null,
      pesquisa: "[null]",
      orderBy: { coluna: "", ordem: "" },
      pagina: 1,
      limite: 15,
      setaOrdem: "▼",
      sem_dados: false
    };
  },
  methods: {
    async getOperadoras() {
      await api
        .get(
          `/operadoras/${this.pesquisa}/${this.orderBy.coluna}/${this.orderBy.ordem}/${this.pagina}/${this.limite}`
        )
        .then((response) => (this.operadoras = response.data));

        this.sem_dados = this.operadoras.length == 0;
    },

    async restaurarDados() {
      await api.delete("/limpar-dados");
      await api.post("/carregar-arquivo");
      this.getOperadoras();
    },

    async limparDados() {
      await api.delete("/limpar-dados");
      this.getOperadoras();
      this.getOperadoras();
    },

    async getPesquisa(event) {
      event.preventDefault();
      this.pesquisa = event.target.pesquisa.value
        ? event.target.pesquisa.value
        : "[null]";
      this.pagina = 1;
      this.getOperadoras();
    },

    async deletar(id) {
      if (confirm(`Tem certeza que deseja delatar esta operadora?`)) {
        api.delete(`/deletar-operadora/${id}`);
        this.getOperadoras();
        this.getOperadoras();
      }
    },

    ordenar(coluna) {
      this.orderBy.coluna == coluna
        ? (this.orderBy.ordem = this.orderBy.ordem === "DESC" ? "ASC" : "DESC")
        : (this.orderBy.ordem = "ASC");
      this.orderBy.coluna = coluna;
      this.setaOrdem = this.orderBy.ordem === "ASC" ? "▲" : "▼";
      this.getOperadoras();
    },

    opcoes_de_dados(event) {
      if (event.target.value == "restaurarDados") {
        if (
          confirm(
            "Atenção! Ao confirmar esta ação, todas as alterações realizadas na tabela serão perdidas. Tem certeza que deseja continuar?"
          )
        ) {
          this.restaurarDados();
        }
      }

      if (event.target.value == "limparDados") {
        if (
          confirm(
            "Atenção! Ao confirmar esta ação, apagará todas os dados da tabela. Tem certeza que deseja continuar?"
          )
        ) {
          this.limparDados();
        }
      }

      event.target.value = "";
    },
  },
  mounted() {
    this.orderBy.coluna = "id";
    this.orderBy.ordem = "DESC";
    this.getOperadoras();
  },
  watch: {
    pagina() {
      this.getOperadoras();
    },
    limite() {
      this.getOperadoras();
    },
  },
};
</script>

<style scoped>
.top-buttons {
  display: flex;
  column-gap: 20px;
  justify-content: right;
  align-items: center;
}
.btn-cadastrar {
  background-color: #37923c;
  border: 1px solid #37923c;
}
.btn-cadastrar:hover {
  background-color: #29722d;
  border: 1px solid #29722d;
}

.campo-pesquisa {
  border-radius: 4px 0px 0px 4px;
}

.campo-pesquisa {
  border-radius: 4px 0px 0px 4px;
}

.btn-pesquisar {
  border-radius: 0px 4px 4px 0px;
}

.table {
  overflow: auto;
  border: 1px solid rgb(200, 200, 200);
  max-width: 100%;
  height: calc(100vh - 203px);
  border-radius: 4px;
}

table {
  border-collapse: collapse;
  padding: 0px 10px;
  text-align: left;
  width: 100%;
  border-spacing: 0px;
  font-size: 14px;
  color: #555;
}

thead {
  position: sticky;
  top: 0px;
  z-index: 10;
  box-shadow: 0px 0px 2px #555;
  background-color: #fff;
}

td {
  padding: 5px 10px;
  box-sizing: border-box;
  overflow: auto;
}

th {
  padding: 10px;
  cursor: pointer;
  word-wrap: normal;
  white-space: nowrap;
  user-select: none;
}

th:hover {
  color: #000;
}

tr:nth-child(even) {
  background: rgb(241, 240, 240);
}

.acoes {
  opacity: 0;
}

tr:hover {
  background-color: rgb(214, 221, 235);
}
tr:hover > .acoes {
  opacity: 1;
}

.id {
  width: 60px;
}

.registro_ans,
.telefone {
  width: 120px;
}

.cnpj {
  width: 130px;
}

.acoes {
  width: 200px;
}

.bottom-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}

.input-limit {
  width: 70px;
}

.paginacao {
  display: flex;
  column-gap: 10px;
  width: 180px;
  justify-content: right;
}

.input-pagina {
  width: 40px;
}

.sem-dados{
  margin: 10px 20px;
  font-size: 16px;
}
</style>