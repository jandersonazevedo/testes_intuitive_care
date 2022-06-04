<template>
  <nav>
    <NavBar />
    <router-view />
  </nav>
</template>

<script>
import NavBar from "./components/NavBar.vue";

export default {
  name: "App",
  components: {
    NavBar,
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}

body {
  background-color: #e5e5e5;
  font-family: Roboto;
}

input {
  border-radius: 4px;
  transition: 0.2s;
  font-size: 13.5px;
  border: 1px solid #7e819b;
  padding: 5px;
}

button,
a,
input[type="submit"],
select {
  text-decoration: none;
  background-color: #7e819b;
  color: #eaecff;
  font-size: 13.5px;
  padding: 5px;
  border: 1px solid #7e819b;
  border-radius: 4px;
  cursor: pointer;
  transition: 0.2s;
}

button:hover,
a:hover,
input[type="submit"]:hover,
select:hover {
  background-color: #676a88;
  border: 1px solid #676a88;
}

.btn-detalhes {
  background-color: #7681d3;
  border: 1px solid #7681d3;
}

.btn-detalhes:hover {
  background-color: #535b9e;
  border: 1px solid #535b9e;
}

.btn-editar {
  background-color: #b99e00;
  border: 1px solid #b99e00;
}

.btn-editar:hover {
  background-color: #978101;
  border: 1px solid #978101;
}

.btn-deletar {
  background-color: #b93400;
  border: 1px solid #b93400;
}

.btn-deletar:hover {
  background-color: #882700;
  border: 1px solid #882700;
}

.btn-acoes {
  display: flex;
  column-gap: 10px;
  row-gap: 10px;
  flex-wrap: nowrap;
}

.container-div {
  background-color: #fff;
  min-height: 250px;
  max-width: 100vw;
  margin: 20px 20px 15px 20px;
  padding: 12px;
  border-radius: 4px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
}

.top-container {
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  margin-bottom: 10px;
}

.table-title {
  grid-area: h1;
  font-size: 20px;
  font-weight: 400;
  color: #5161f1;
}

</style>
