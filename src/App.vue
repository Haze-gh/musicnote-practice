<template>
  <div>
    <H5 />
  </div>
</template>

<script>
import H5 from "./pages/H5.vue";

export default {
  name: "App",
  components: {
    H5,
  },
  data() {
    return {
      password: '',
      unlock: false,
    }
  },
  created() {
    const pas = window.sessionStorage.getItem("password");
    if (pas == 'haze') {
      this.unlock = true;
    }
  },
  methods: {
    inputChange() {
      if (this.password == "haze") {
        this.unlock = true;
        window.sessionStorage.setItem("password", "haze");
      }
    }
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
