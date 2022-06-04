<template>
  <div class="container-div">
    <div class="links-top">
      <router-link to="/">◄ Voltar</router-link> |
      <h1 class="table-title">Detalhes da Operadora</h1>
    </div>
    <div class="container-detalhes">
      <div class="categoria">
        <h2>Dados da operadora</h2>
        <hr />
        <div class="container-label">
          <span> <b>Registro ANS: </b> {{ operadora.registro_ans }} </span>
          <span> <b>CNPJ: </b> {{ operadora.cnpj }} </span>
          <span> <b>Razão Social: </b> {{ operadora.razao_social }} </span>
          <span> <b>Nome Fantasia: </b> {{ operadora.nome_fantasia }} </span>
          <span> <b>Modalidade: </b> {{ operadora.modalidade }} </span>
          <span> <b>Representante: </b> {{ operadora.representante }} </span>
          <span>
            <b>Cargo Representante: </b> {{ operadora.cargo_representante }}
          </span>
          <span>
            <b>Data Registro ANS: </b> {{ operadora.data_registro_ans }}
          </span>
        </div>
      </div>
      <div class="categoria">
        <h2>Endereço</h2>
        <hr />
        <div class="container-label">
          <span> <b>Logradouro: </b> {{ operadora.logradouro }} </span>
          <span> <b>Número: </b> {{ operadora.numero }} </span>
          <span> <b>Complemento: </b> {{ operadora.complemento }} </span>
          <span> <b>Bairro: </b> {{ operadora.bairro }} </span>
          <span> <b>Cidade: </b> {{ operadora.cidade }} </span>
          <span> <b>UF: </b> {{ operadora.uf }} </span>
          <span> <b>CEP: </b> {{ operadora.cep }} </span>
        </div>
      </div>
      <div class="categoria">
        <h2>Contatos</h2>
        <hr />
        <div class="container-label">
          <span> <b>DDD: </b> {{ operadora.ddd }} </span>
          <span> <b>Telefone: </b> {{ operadora.telefone }} </span>
          <span> <b>Fax: </b> {{ operadora.fax }} </span>
          <span>
            <b>Endereço eletrônico: </b> {{ operadora.endereco_eletronico }}
          </span>
        </div>
      </div>
      <div class="btn-acoes">
        <button @click="deletar(operadora.id)" class="btn-deletar">
          Deletar
        </button>
        <router-link :to="`/editar/${operadora.id}`" class="btn btn-editar"
          >Editar</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/services/api";

export default {
  name: "Detalhes",
  data() {
    return {
      id: null,
      operadora: [],
    };
  },
  methods: {
    async getDadosOperadora() {
      //Faz a requisição no banco de dados buscar os dados da operadora
      await api
        .get(`/operadora/${this.id}`)
        .then((response) => {
        if (response.data[0]) {
          this.operadora = response.data[0];
        } else {
          //se não encontrar o id que está na url, é redirecionado para tela inicial
          this.$router.push(`/`);
        }
      });
    },
    async deletar(id) {
      if (confirm(`Tem certeza que deseja delatar esta operadora?`)) {
        api.delete(`/deletar-operadora/${id}`);
        this.$router.push("/");
      }
    },
  },
  mounted() {
    this.id = this.$route.params.id;
    this.getDadosOperadora();
  },
};
</script>

<style scoped>
.links-top {
  display: flex;
  align-items: center;
  column-gap: 10px;
  margin-bottom: 10px;
}

h2 {
  font-size: 15px;
}

hr {
  border: 0;
  border-bottom: 1px solid #bbb;
  margin: 5px 0px 10px 0px;
}

.categoria {
  margin-bottom: 15px;
  padding: 10px;
}

.container-label {
  display: flex;
  flex-wrap: wrap;
  row-gap: 20px;
  column-gap: 20px;
}

span {
  width: 330px;
  text-align: left;
  font-size: 14px;
}

input {
  width: 180px;
}

.container-detalhes {
  display: flex;
  flex-wrap: wrap;
  justify-content: right;
  padding: 10px;
}
</style>