import { createStore } from 'vuex'
import axios from '../axios';

export default createStore({
  state: {
    user: null,
    token: null, 
    equipments: []
  },
  getters: {
    isAuthenticated(state) {
      return !!state.token;
    },
    user(state) {
      return state.user;
    },
    equipments(state) {
      return state.equipments;
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
    }, 
    setEquipments(state, equipments) {
      state.equipments = equipments;
    },
    addEquipment(state, equipment) {
      state.equipments.push(equipment);
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
    }, 
    async depositEquipment({ commit, state }, equipment) {
      const response = await axios.post('/appareil', equipment, {
        headers: {
          Authorization: `Bearer ${state.token}`
        }
      });
      commit('addEquipment', response.data);
    }, 
    async fetchEquipments({ commit, state }) {
      const response = await axios.get(`/appareil/owner/${state.user.id}`, {
        headers: {
          Authorization: `Bearer ${state.token}`
        }
      });
      commit('setEquipments', response.data);
    }
  },
  modules: {
  }
})
