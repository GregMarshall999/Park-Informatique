<template>
    <div>
      <h1>{{ userId ? 'Edit User' : 'Create User' }}</h1>
      <form @submit.prevent="submitForm">
        <div>
          <label>First Name:</label>
          <input type="text" v-model="user.firstname" required>
        </div>
        <div>
          <label>Last Name:</label>
          <input type="text" v-model="user.lastname" required>
        </div>
        <div>
          <label>Email:</label>
          <input type="email" v-model="user.email" required>
        </div>
        <div>
          <label>Username:</label>
          <input type="text" v-model="user.username" required>
        </div>
        <div>
          <label>Password:</label>
          <input type="password" v-model="user.password" required>
        </div>
        <div>
          <label>User Type:</label>
          <select v-model="user.userType" required>
            <option value="client">Client</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button type="submit">{{ userId ? 'Update' : 'Create' }}</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from '../../axios';
  
  export default {
    data() {
      return {
        user: {
          firstname: '',
          lastname: '',
          email: '',
          username: '',
          password: '',
          userType: 'client'
        },
        userId: null
      };
    },
    methods: {
      async fetchUser() {
        if (this.userId) {
          try {
            const response = await axios.get(`/users/${this.userId}`);
            this.user = response.data;
          } catch (error) {
            console.error(error);
          }
        }
      },
      async submitForm() {
        try {
          if (this.userId) {
            await axios.put(`/users/${this.userId}`, this.user);
          } else {
            await axios.post('/users', this.user);
          }
          this.$router.push('/');
        } catch (error) {
          console.error(error);
        }
      }
    },
    created() {
      this.userId = this.$route.params.userId;
      this.fetchUser();
    }
  };
  </script>