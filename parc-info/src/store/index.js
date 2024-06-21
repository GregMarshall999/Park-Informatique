import { createStore } from 'vuex'

export default createStore({
  state: {
    user: null,
    token: null
  },
  getters: {
    isAuthenticated(state) {
      return !!state.token;
    },
    user(state) {
      return state.user;
    }
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setToken(state, token) {
      state.token = token;
    },
    clearAuth(state) {
      state.user = null;
      state.token = null;
    }
  },
  actions: {
    async login({ commit }, credentials) {
      const response = await axios.post('/auth/login', credentials);
      commit('setUser', response.data.user);
      commit('setToken', response.data.token);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    },
    logout({ commit }) {
      commit('clearAuth');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
    tryAutoLogin({ commit }) {
      const token = localStorage.getItem('token');
      const user = localStorage.getItem('user');
      if (token && user) {
        commit('setToken', token);
        commit('setUser', JSON.parse(user));
      }
    }
  },
  modules: {
  }
})
