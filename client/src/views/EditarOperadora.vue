<template>
  <div class="container-div">
    <div class="links-top">
      <a href="javascript:history.back();">◄ Voltar</a> |
      <h1 class="table-title">Editar Operadora</h1>
    </div>
    <div class="container-form">
      <form @submit="editaOperadora">
        <div class="categoria">
          <h2>Dados da operadora</h2>
          <hr />
          <div class="container-label">
            <label>
              Registro ANS:
              <input
                type="text"
                name="registro_ans"
                placeholder="Digite o Registro ANS"
                :value="operadora.registro_ans"
                @change="handleChangeValues"
            /></label>
            <label>
              CNPJ:
              <input
                type="text"
                name="cnpj"
                placeholder="Digite o CNPJ"
                :value="operadora.cnpj"
                @change="handleChangeValues"
            /></label>
            <label>
              Razão Social:
              <input
                type="text"
                name="razao_social"
                placeholder="Digite a Razão Social"
                :value="operadora.razao_social"
                @change="handleChangeValues"
            /></label>
            <label>
              Nome Fantasia:
              <input
                type="text"
                name="nome_fantasia"
                placeholder="Digite o Nome Fantasia"
                :value="operadora.nome_fantasia"
                @change="handleChangeValues"
            /></label>
            <label>
              Modalidade:
              <input
                type="text"
                name="modalidade"
                placeholder="Digite a Modalidade"
                :value="operadora.modalidade"
                @change="handleChangeValues"
            /></label>
            <label>
              Representante:
              <input
                type="text"
                name="representante"
                placeholder="Digite o Representante"
                :value="operadora.representante"
                @change="handleChangeValues"
            /></label>
            <label>
              Cargo Representante:
              <input
                type="text"
                name="cargo_representante"
                placeholder="Digite o Cargo Representante"
                :value="operadora.cargo_representante"
                @change="handleChangeValues"
              />
            </label>
            <label>
              Data Registro ANS:
              <input
                type="text"
                name="data_registro_ans"
                placeholder="Digite a Data Registro ANS"
                :value="operadora.data_registro_ans"
                @change="handleChangeValues"
              />
            </label>
          </div>
        </div>
        <div class="categoria">
          <h2>Endereço</h2>
          <hr />
          <div class="container-label">
            <label>
              Logradouro:
              <input
                type="text"
                name="logradouro"
                placeholder="Digite o Logradouro"
                :value="operadora.logradouro"
                @change="handleChangeValues"
            /></label>
            <label>
              Número:
              <input
                type="text"
                name="numero"
                placeholder="Digite o Número"
                :value="operadora.numero"
                @change="handleChangeValues"
            /></label>
            <label>
              Complemento:
              <input
                type="text"
                name="complemento"
                placeholder="Digite o Complemento"
                :value="operadora.complemento"
                @change="handleChangeValues"
            /></label>
            <label>
              Bairro:
              <input
                type="text"
                name="bairro"
                placeholder="Digite o Bairro"
                :value="operadora.bairro"
                @change="handleChangeValues"
            /></label>
            <label>
              Cidade:
              <input
                type="text"
                name="cidade"
                placeholder="Digite a Cidade"
                :value="operadora.cidade"
                @change="handleChangeValues"
            /></label>
            <label>
              UF:
              <input
                type="text"
                name="uf"
                placeholder="Digite a UF"
                :value="operadora.uf"
                @change="handleChangeValues"
            /></label>
            <label>
              CEP:
              <input
                type="text"
                name="cep"
                placeholder="Digite o CEP"
                :value="operadora.cep"
                @change="handleChangeValues"
            /></label>
          </div>
        </div>
        <div class="categoria">
          <h2>Contatos</h2>
          <hr />
          <div class="container-label">
            <label>
              DDD:
              <input
                type="text"
                name="ddd"
                placeholder="Digite o DDD"
                :value="operadora.ddd"
                @change="handleChangeValues"
            /></label>
            <label>
              Telefone:
              <input
                type="tel"
                name="telefone"
                placeholder="Digite o Telefone"
                :value="operadora.telefone"
                @change="handleChangeValues"
            /></label>
            <label>
              Fax:
              <input
                type="text"
                name="fax"
                placeholder="Digite o Fax"
                :value="operadora.fax"
                @change="handleChangeValues"
            /></label>
            <label>
              Endereço eletrônico:
              <input
                type="text"
                name="endereco_eletronico"
                placeholder="Digite o Endereço eletrônico"
                :value="operadora.endereco_eletronico"
                @change="handleChangeValues"
              />
            </label>
          </div>
        </div>
        <input type="submit" class="btn" value="Salvar alterações" />
      </form>
    </div>
  </div>
</template>

<script>
import api from "@/services/api";

export default {
  name: "Editar Operadora",
  data() {
    return {
      id: null,
      operadora: [],
    };
  },
  methods: {
    async getDadosOperadora() {
      await api.get(`/operadora/${this.id}`).then((response) => {
        if (response.data[0]) {
          this.operadora = response.data[0];
        } else {
          //se não encontrar o id que está na url, é redirecionado para tela inicial
          this.$router.push(`/`);
        }
      });
    },
    async editaOperadora(event) {
      event.preventDefault();

      const data = this.operadora;
      await api.put(`editar-operadora/${this.id}`, data);
      //após editar, redireciona para os detalhes da operadora
      this.$router.push(`/detalhes/${this.id}`);
    },

    handleChangeValues(event) {
      this.operadora = {
        ...this.operadora,
        [event.target.name]: event.target.value,
      };
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

label {
  width: 330px;
  text-align: right;
  font-size: 14px;
}

input {
  width: 180px;
}

form {
  display: flex;
  flex-wrap: wrap;
  justify-content: right;
  padding: 10px;
}
</style>