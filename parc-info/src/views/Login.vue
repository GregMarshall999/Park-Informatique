<template>
    <h1>Login</h1>
    <form @submit.prevent="loginSub">
      <div>
        <label>Username:</label>
        <input type="text" v-model="username" required>
      </div>
      <div>
        <label>Password:</label>
        <input type="password" v-model="password" required>
      </div>
      <button type="submit">Login</button>
    </form>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  data() {
    return {
      username: '',
      password: ''
    };
  },
  computed: {
    ...mapGetters(['user'])
  },
  methods: {
    ...mapActions(['login']),
    
    async loginSub() {
      try {
        await this.login({ nom_utilisateur: this.username, motdepasse: this.password });

        switch(this.user.typeUtilisateur) {
          case "client": this.$router.push('/welcome'); break;
          case "technicien": this.$router.push('/technician'); break;
        }
        
      } catch (error) {
        console.error(error);
        alert('Invalid username or password');
      }
    }
  }
};
</script>