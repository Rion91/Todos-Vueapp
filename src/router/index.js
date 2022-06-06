import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/HomeView.vue'
import Register from "@/views/Register";
import Login from "@/views/Login";
import AddTodos from "@/views/AddTodos";
import EditTodos from '@/views/EditTodos';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/add-todos',
    name: 'AddTodos',
    component: AddTodos
  },
  {
    path: '/edit-todos/:id',
    name: 'EditTodos',
    component: EditTodos,
    props: true
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

const authProtectedRoutes = ['home'];

router.beforeEach((to, from, next)=> {
  if (authProtectedRoutes.includes(to.name) && !localStorage.getItem('jwtToken')) {
    next({name: 'login'})
  }
  next()
})



export default router
