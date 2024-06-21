import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import UserList from '../components/CRUD/UtilisateurList.vue';
import UserForm from '../components/CRUD/UtilisateurForm.vue';
import Login from '../views/Login.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/list-user', 
    name: 'ListUser',
    component: UserList
  },
  {
    path: '/create-user',
    name: 'CreateUser',
    component: UserForm
  },
  {
    path: '/edit-user/:userId',
    name: 'EditUser',
    component: UserForm
  }, 
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
