<template>
  <div class="Detalhes Operadora">
    <div class="container-list">
      <div class="links-top">
        <router-link to="/">◄ Voltar</router-link> |
        <h1 class="table-title">Detalhes da Operadora</h1>
      </div>
      <div class="container-detalhes">
        <div class="categoria">
          <h1>Dados da operadora</h1>
          <hr />
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
        <div class="categoria">
          <h1>Endereço</h1>
          <hr />
          <span> <b>Logradouro: </b> {{ operadora.logradouro }} </span>
          <span> <b>Número: </b> {{ operadora.numero }} </span>
          <span> <b>Complemento: </b> {{ operadora.complemento }} </span>
          <span> <b>Bairro: </b> {{ operadora.bairro }} </span>
          <span> <b>Cidade: </b> {{ operadora.cidade }} </span>
          <span> <b>UF: </b> {{ operadora.uf }} </span>
          <span> <b>CEP: </b> {{ operadora.cep }} </span>
        </div>
        <div class="categoria">
          <h1>Contatos</h1>
          <hr />
          <span> <b>DDD: </b> {{ operadora.ddd }} </span>
          <span> <b>Telefone: </b> {{ operadora.telefone }} </span>
          <span> <b>Fax: </b> {{ operadora.fax }} </span>
          <span>
            <b>Endereço eletrônico: </b> {{ operadora.endereco_eletronico }}
          </span>
        </div>
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
      await api
        .get(`/operadora/${this.id}`)
        .then((response) => (this.operadora = response.data[0]));
    },
  },
  mounted() {
    this.id = this.$route.params.id;
    this.getDadosOperadora();
  },
};
</script>

<style>
.links-top {
  width: 100%;
  display: flex;
  row-gap: 10px;
  column-gap: 10px;
  align-items: center;
}
h1 {
  font-size: 17px;
  font-weight: 500;
  color: #333;
}

hr {
  border: 0;
  border-top: 0.5px solid #ccc;
  margin: 5px 0px 10px 0px;
}
.categoria {
  padding: 10px;
  border-radius: 4px;
  justify-content: left;
}
</style>

<style scoped>
.container-list {
  display: flex;
  flex-wrap: wrap;
  column-gap: 12px;
  row-gap: 12px;
  justify-content: center;
}


span {
  display: block;
  font-size: 15px;
  color: #333;
  margin: 5px 0px;
}
</style>