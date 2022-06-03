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
  font-family: Roboto, Oxygen, Ubuntu, Cantarell;
}

.container-list {
  background-color: #fff;
  min-height: 250px;
  max-width: 100vw;
  margin: 25px;
  padding: 12px;
  border-radius: 4px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
}

a {
  text-decoration: none;
}

button,
.btn {
  background-color: #555;
  color: #e5e5e5;
  padding: 5px;
  border: 1px solid #555;
  border-radius: 4px;
  cursor: pointer;
  transition: 0.1s;
  font-size: 13px;
}

button:hover,
.btn:hover {
  background-color: #777;
  border: 1px solid #777;
  color: #fff;
}

.btn-editar {
  background-color: #b07800;
  border: 1px solid #b08700;
}

.btn-editar:hover {
  background-color: #cf8e00;
  border: 1px solid #cf8e00;
}

.btn-deletar {
  background-color: #b01000;
  border: 1px solid #b01000;
}

.btn-deletar:hover {
  background-color: #b83b30;
  border: 1px solid #b83b30;
}

input {
  padding: 5px;
}
</style>
