import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import UserList from '../components/CRUD/UtilisateurList.vue';
import UserForm from '../components/CRUD/UtilisateurForm.vue';

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
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
