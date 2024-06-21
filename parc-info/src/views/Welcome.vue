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

      <div v-if="equipments" class="appareils">
        <h2>Vos Appareils</h2>
        <table>
          <thead>
            <tr>
              <th>Marque</th>
              <th>Modele</th>
              <th>Etat</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="equipment in equipments" :key="equipment._id">
              <td>{{ equipment.marque }}</td>
              <td>{{ equipment.modele }}</td>
              <td>{{ equipment.etat }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <button @click="logoutSub">Logout</button>
    </div>
  </template>
  
  <script>
  import { mapGetters, mapActions } from 'vuex';
  
  export default {
    data() {
    return {
      brand: '',
      model: '',
      state: 'in service'
    };
  },
    computed: {
      ...mapGetters(['user', 'equipments'])
    },
    methods: {
      ...mapActions(['logout', 'depositEquipment', 'fetchEquipments']),

    async depositEquipment() {
      try {
        const newEquipement = {
          marque: this.brand,
          modele: this.model,
          etat: this.state,
          proprietaireId: this.user._id
        };
        await this.depositEquipment(newEquipement);
        alert('Votre appareil est deposé!');
        
        this.brand = '';
        this.model = '';
        this.state = 'in service';
        await this.fetchEquipments();
      } catch (error) {
        console.error(error);
        alert('Error depositing equipment.');
      }
    },

    logoutSub() {
        this.logout();
        this.$router.push('/login');
      }
    }, 
    created() {
      this.fetchEquipments();
    }
  };
  </script>