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
        <th>Razão Social</th>
        <th>CNPJ</th>
        <th>Nome Fantasia</th>
        <th>Modalidade</th>
      </thead>
      <tbody></tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "Table",
  props: {
    title: String,
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