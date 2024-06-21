<template>
    <div>
      <h1>Welcome, {{ user.firstname }} {{ user.lastname }}!</h1>
      <button @click="logout">Logout</button>
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
      logout() {
        this.logout();
        this.$router.push('/login');
      }
    }
  };
  </script>