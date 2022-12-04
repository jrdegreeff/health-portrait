import Vue from 'vue';
import VueRouter from 'vue-router';
import HomePage from './components/HomePage.vue';
import AccountPage from './components/Account/AccountPage.vue';
import ContactPage from './components/Medical-Contact/ContactPage.vue';
import LoginPage from './components/Login/LoginPage.vue';
import MedicationsPage from './components/Medications/MedicationsPage.vue'
import NotFound from './NotFound.vue';

Vue.use(VueRouter);

const routes = [
  {path: '/', name: 'Home', component: HomePage},
  {path: '/account', name: 'Account', component: AccountPage},
  {path: '/contacts', name: 'Contacts', component: ContactPage},
  {path: '/login', name: 'Login', component: LoginPage},
  {path: '/medications', name: 'Medications', component: MedicationsPage},
  {path: '*', name: 'Not Found', component: NotFound},
];

const router = new VueRouter({routes});

/**
 * Navigation guards to prevent user from accessing wrong pages.
 */
router.beforeEach((to, from, next) => {
  if (to.name === 'Login' && JSON.parse(localStorage.vuex).username) {
    next({name: 'Account'}); // Go to Account page if user navigates to Login and are signed in
    return;
  }

  if (['Home', 'Account', 'Medications'].includes(to.name) && !JSON.parse(localStorage.vuex).username) {
    next({name: 'Login'}); // Go to Login page if user navigates to Account and are not signed in
    return;
  }
  
  next();
});

export default router;
