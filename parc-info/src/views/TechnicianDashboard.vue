<template>
    <h1>Technician Dashboard</h1>

    <p v-if="notification">Un nouvel appareil a été déposé</p>

    <button @click="logoutSub">Logout</button>
</template>

<script>
import { mapActions } from 'vuex';
import io from 'socket.io-client';

export default {
    data() {
        return {
            notification: false
        };
    },
    created() {
        const socket = io('http://localhost:3000'); 
        socket.on('newEquipmentNotification', () => {
            this.notification = true;
            setTimeout(() => {
                this.notification = false;
            }, 3000); 
        });
    },
    methods: {
        ...mapActions(['logout']),

        logoutSub() {
        this.logout();
        this.$router.push('/login');
      }
    }
}
</script>