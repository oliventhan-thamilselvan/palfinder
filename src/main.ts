import './assets/css/style.css'
import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import HomePage from './vues/HomePage.vue'
import CreateAccountPage from './vues/CreateAccountPage.vue'
import LoginPage from './vues/LoginPage.vue'
import RequestChangePasswordPage from './vues/RequestChangePasswordPage.vue'
import Profile from './vues/Profile.vue'
import EditProfile from './vues/EditProfile.vue'
import ContactPage from './vues/ContactPage.vue';


const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/home' },
    { path: '/home', component: HomePage },
    { path: '/create-account', component: CreateAccountPage },
    { path: '/login', component: LoginPage },
    { path: '/request-change-password', component: RequestChangePasswordPage },
    { path: '/profile', component: Profile },
    { path: '/edit-profile', component: EditProfile },
    { path: '/contact', component: ContactPage },
  ]
})


const app = createApp(App)
app.use(router).mount('#app')
