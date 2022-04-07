<template>
  <div id="app">
    <div id="nav">
      <span>link方式跳转: </span>
      <router-link class="test-link" to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/tab">Tab</router-link>
    </div>
    <div class="nav">
      <span>function方式跳转: </span>
      <a @click="forward('/')">Home</a> |
      <a @click="forward('/about')">About</a>
    </div>
    <div><router-view :key="$router.current" /></div>
  </div>
</template>

<script>

export default {
  methods: {
    forward(path) {
      this.$router.push(path);
    },
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

#nav {
  padding: 30px;
}

#nav a, .nav a {
  font-weight: bold;
  color: #2c3e50;
  cursor: pointer;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
