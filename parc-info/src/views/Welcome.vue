<template>
    <div v-if="user">
      <h1>Bienvenu, {{ user.prenom }}!</h1>

      <div class="depot-appareil">
        <h2>Deposez un Appareil</h2>
          <form @submit.prevent="depositEquipment">
          <div>
            <label>Marque:</label>
            <input type="text" v-model="brand" required>
          </div>
          <div>
            <label>Modele:</label>
            <input type="text" v-model="model" required>
          </div>
          <div>
            <label>Etat:</label>
            <select v-model="state" required>
              <option value="en service">En Service</option>
              <option value="en panne">En panne</option>
              <option value="en maintenance">En maintenance</option>
            </select>
          </div>
          <button type="submit">Depot</button>
        </form>
      </div>

      <button @click="logoutSub">Logout</button>
    </div>
  </template>
  
  <script>
  import { mapGetters, mapActions } from 'vuex';
  
  export default {
    computed: {
      ...mapGetters(['user'])
    },
    methods: {
      ...mapActions(['logout']),

      logoutSub() {
        this.logout();
        this.$router.push('/login');
      }
    }
  };
  </script>