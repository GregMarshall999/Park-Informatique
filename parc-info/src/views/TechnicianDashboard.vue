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
            notification: false, 
            socket: io('http://localhost:3000')
        };
    },
    created() {
        this.socket.on("connect", () => {
            this.socketConnect();
        })

        this.socket.on('newEquipmentNotification', () => {
            console.log("added equip")

            this.notification = true;
            setTimeout(() => {
                this.notification = false;
            }, 10000); 
        });
    },
    methods: {
        ...mapActions(['logout', 'socketConnect', 'socketDisconnect']),

        logoutSub() {
            this.socket.on("disconnect", () => {
                this.socketDisconnect();
            });

            this.socket.disconnect();
            this.logout();
            this.$router.push('/login');
      }
    }
}
</script>