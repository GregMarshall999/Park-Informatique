<template>
    <h1>Technician Dashboard</h1>

    <button @click="logoutSub">Logout</button>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    methods: {
        ...mapActions(['logout']),

        logoutSub() {
        this.logout();
        this.$router.push('/login');
      }
    }
}
</script>