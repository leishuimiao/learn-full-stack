<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <h1>{{ $store.state.count }}</h1>
    <div>
      <button @click="$store.commit('increase')">increase</button>
      <button @click="$store.dispatch('auto')">auto</button>
      <button @click="$store.dispatch('pause')">pause</button>
    </div>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';

export default {
  name: 'Home',
  components: {
    HelloWorld,
  },
};
</script>
