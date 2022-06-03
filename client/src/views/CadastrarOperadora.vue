<template>
  <div class="container-list">
    <div class="links-top">
      <router-link to="/">◄ Voltar</router-link> |
      <h1 class="table-title">Cadastrar Operadora</h1>
    </div>
    <div class="container-form">
      <form @submit="addOperadora">
        <div class="categoria">
          <h1>Dados da operadora</h1>
          <hr />
          <label>
            Registro ANS:
            <input
              type="text"
              name="registro_ans"
              placeholder="Digite o Registro ANS"
              @change="handleChangeValues"
          /></label>
          <label>
            CNPJ:
            <input
              type="text"
              name="cnpj"
              placeholder="Digite o CNPJ"
              @change="handleChangeValues"
          /></label>
          <label>
            Razão Social:
            <input
              type="text"
              name="razao_social"
              placeholder="Digite a Razão Social"
              @change="handleChangeValues"
          /></label>
          <label>
            Nome Fantasia:
            <input
              type="text"
              name="nome_fantasia"
              placeholder="Digite o Nome Fantasia"
              @change="handleChangeValues"
          /></label>
          <label>
            Modalidade:
            <input
              type="text"
              name="modalidade"
              placeholder="Digite a Modalidade"
              @change="handleChangeValues"
          /></label>
          <label>
            Representante:
            <input
              type="text"
              name="representante"
              placeholder="Digite o Representante"
              @change="handleChangeValues"
          /></label>
          <label>
            Cargo Representante:
            <input
              type="text"
              name="cargo_representante"
              placeholder="Digite o Cargo Representante"
              @change="handleChangeValues"
            />
          </label>
          <label>
            Data Registro ANS:
            <input
              type="date"
              name="data_registro_ans"
              placeholder="Digite a Data Registro ANS"
              @change="handleChangeValues"
            />
          </label>
        </div>
        <div class="categoria">
          <h1>Endereço</h1>
          <hr />
          <label>
            Logradouro:
            <input
              type="text"
              name="logradouro"
              placeholder="Digite o Logradouro"
              @change="handleChangeValues"
          /></label>
          <label>
            Número:
            <input
              type="text"
              name="numero"
              placeholder="Digite o Número"
              @change="handleChangeValues"
          /></label>
          <label>
            Complemento:
            <input
              type="text"
              name="complemento"
              placeholder="Digite o Complemento"
              @change="handleChangeValues"
          /></label>
          <label>
            Bairro:
            <input
              type="text"
              name="bairro"
              placeholder="Digite o Bairro"
              @change="handleChangeValues"
          /></label>
          <label>
            Cidade:
            <input
              type="text"
              name="cidade"
              placeholder="Digite a Cidade"
              @change="handleChangeValues"
          /></label>
          <label>
            UF:
            <input
              type="text"
              name="uf"
              placeholder="Digite a UF"
              @change="handleChangeValues"
          /></label>
          <label>
            CEP:
            <input
              type="text"
              name="cep"
              placeholder="Digite o CEP"
              @change="handleChangeValues"
          /></label>
        </div>
        <div class="categoria">
          <h1>Contatos</h1>
          <hr />
          <label>
            DDD:
            <input
              type="text"
              name="ddd"
              placeholder="Digite o DDD"
              @change="handleChangeValues"
          /></label>
          <label>
            Telefone:
            <input
              type="tel"
              name="telefone"
              placeholder="Digite o Telefone"
              @change="handleChangeValues"
          /></label>
          <label>
            Fax:
            <input
              type="text"
              name="fax"
              placeholder="Digite o Fax"
              @change="handleChangeValues"
          /></label>
          <label>
            Endereço eletrônico:
            <input
              type="email"
              name="endereco_eletronico"
              placeholder="Digite o Endereço eletrônico"
              @change="handleChangeValues"
            />
          </label>
        </div>
        <input type="submit" class="btn" value="Cadastrar operadora" />
      </form>
    </div>
  </div>
</template>

<script>
import api from "@/services/api";

export default {
  name: "Cadastrar Operadora",
  data() {
    return {
      operadora: [],
    };
  },
  methods: {
    async addOperadora(event) {
      event.preventDefault();

      const data = this.operadora;
      await api.post("cadastrar-operadora", data);
    },

    handleChangeValues(event) {
      this.operadora = {
        ...this.operadora,
        [event.target.name]: event.target.value,
      };
    },
  },
};
</script>

<style scoped>
.container-list {
  display: flex;
  flex-wrap: wrap;
  column-gap: 12px;
  row-gap: 12px;
  justify-content: center;
}

label {
  display: block;
  font-size: 15px;
  color: #333;
  margin: 5px 0px;
}
</style>