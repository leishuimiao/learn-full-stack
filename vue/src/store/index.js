import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
let autoSto;
export default new Vuex.Store({
  state: {
    count: 0,
  },
  mutations: {
    increase(state) {
      state.count += 1;
    },
  },
  actions: {
    auto({ commit, dispatch }) {
      clearTimeout(autoSto);
      commit('increase');
      autoSto = setTimeout(() => {
        dispatch('auto');
      }, 1000);
    },
    pause() {
      clearTimeout(autoSto);
    },
  },
  modules: {
  },
});
