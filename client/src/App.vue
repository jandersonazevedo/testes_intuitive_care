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
  background-color: #E5E5E5;
  font-family: Roboto, Oxygen, Ubuntu, Cantarell;
}

.container-list {
  background-color: #fff;
  min-height: 250px;
  max-width: 95vw;
  margin: 25px auto;
  padding: 12px;
  border-radius: 4px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
}
</style>
