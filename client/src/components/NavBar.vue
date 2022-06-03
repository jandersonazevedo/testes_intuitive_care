<template>
  <nav id="NavBar">
    <router-link to="/"
      ><img src="../assets/logo.png" alt="IntuitiveCare" width="200"
    /></router-link>
  </nav>
</template>

<script>
export default {
  name: "NavBar",
};
</script>

<style scoped>
#NavBar {
  position: relative;
  left: 0px;
  right: 0px;
  top: 0px;
  background-color: #fff;
  display: flex;
  justify-content: center;
  padding: 5px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
}
</style>