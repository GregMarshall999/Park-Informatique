import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import UserList from '../components/CRUD/UtilisateurList.vue';
import UserForm from '../components/CRUD/UtilisateurForm.vue';
import Login from '../views/Login.vue';
import Welcome from '../views/Welcome.vue';
import store from '../store';
import TechnicianDashboard from '../views/TechnicianDashboard.vue';

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
  },
  {
    path: '/welcome',
    name: 'Welcome',
    component: Welcome,
    meta: { requiresAuth: true, roles: ['client'] }
  },
  {
    path: '/technician',
    name: 'TechnicianDashboard',
    component: TechnicianDashboard,
    meta: { requiresAuth: true, roles: ['technicien'] }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})


router.beforeEach((to, _, next) => {
  const isAuthenticated = store.getters.isAuthenticated;
  const user = store.getters.user;

  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login');
  } else if (to.meta.roles && to.meta.roles.length > 0 && !to.meta.roles.includes(user.typeUtilisateur)) {
    next('/login');
  } else {
    next();
  }
});

export default router
