import { getCurrentInstance } from 'vue';

const ws = () => {
  const app = getCurrentInstance();
  return app.appContext.config.globalProperties.$ws;
}

const getDefaultState = () => {
  return {
    tryingLogin: false
  };
};

const state = getDefaultState();

const getters = {
  tryingLogin(state) {
    return state.tryingLogin;
  }
};

const mutations = {
  setTryingLogin(state, tryingLogin) {
    state.tryingLogin = tryingLogin;
  }
};

const actions = {
  login({ commit }) {
    commit('setTryingLogin', true);
    console.log('Not works in user.js -> ');
    console.log(ws());
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
