import { getCurrentInstance } from 'vue';

// const okm = new Vue(); // Worked in vue version 2

const ws = () => {
  // Vue version 3
  const app = getCurrentInstance();
  if (app) {
    return app.appContext.config.globalProperties.$ws;
  } else {
    return 'app.Context is null !!!! error !!!!';
  }
}

const getDefaultState = () => {
  return {
    languages: []
  };
};

const state = getDefaultState();

const getters = {
  languages(state) {
    return state.languages;
  }
};

const mutations = {
};

const actions = {
  getLanguages() {
    console.log('Result of request getLanguages() in language.js -> ' + ws());
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
