<template>
    <div v-if="user">
      <h1>Welcome, {{ user.firstname }} {{ user.lastname }}!</h1>
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