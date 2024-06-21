<template>
    <div>
      <h1>Users</h1>
      <button @click="createUser">Create User</button>
      <ul>
        <li v-for="user in users" :key="user._id">
          {{ user.firstname }} {{ user.lastname }} - {{ user.username }}
          <button @click="editUser(user._id)">Edit</button>
          <button @click="deleteUser(user._id)">Delete</button>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import axios from '../../axios';
  
  export default {
    data() {
      return {
        users: []
      };
    },
    methods: {
      async fetchUsers() {
        try {
          const response = await axios.get('/utilisateur');
          this.users = response.data;
        } catch (error) {
          console.error(error);
        }
      },
      createUser() {
        this.$router.push('/create-user');
      },
      editUser(userId) {
        this.$router.push(`/edit-user/${userId}`);
      },
      async deleteUser(userId) {
        try {
          await axios.delete(`/users/${userId}`);
          this.fetchUsers();
        } catch (error) {
          console.error(error);
        }
      }
    },
    created() {
      this.fetchUsers();
    }
  };
  </script>