<template>
    <h1>Login</h1>
    <form @submit.prevent="login">
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
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      username: '',
      password: ''
    };
  },
  methods: {
    ...mapActions(['login']),
    async login() {
      try {
        await this.login({ username: this.username, password: this.password });
        this.$router.push('/welcome');
      } catch (error) {
        console.error(error);
        alert('Invalid username or password');
      }
    }
  }
};
</script>