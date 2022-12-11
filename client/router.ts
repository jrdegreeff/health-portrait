import Vue from 'vue';
import VueRouter from 'vue-router';
import HomePage from './components/HomePage.vue';
import LoginPage from './components/Login/LoginPage.vue';
import AccountPage from './components/Account/AccountPage.vue';
import UserPage from './components/User/UserPage.vue';
import EntryPage from './components/Entry/EntryPage.vue';
import CreateEntryPage from './components/Entry/CreateEntryPage.vue';
import EditEntryPage from './components/Entry/EditEntryPage.vue';
import TrendsPage from './components/Trends/TrendsPage.vue';
import ContactPage from './components/Medical-Contact/ContactPage.vue';
import MedicationPage from './components/Medication/MedicationPage.vue';
import InsurancePage from './components/Insurance-Card/InsurancePage.vue';
import NotFound from './NotFound.vue';

Vue.use(VueRouter);

const routes = [
  {path: '/', name: 'Home', component: HomePage},
  {path: '/login', name: 'Login', component: LoginPage},
  {path: '/account', name: 'Shared Account', component: AccountPage},
  {path: '/user', name: 'Login Info', component: UserPage},
  {path: '/logs/:type?', name: 'Logs', component: EntryPage, props: true},
  {path: '/newLog', name: 'New Log', component: CreateEntryPage},
  {path: '/editLog/:entryId', name: 'Edit Log', component: EditEntryPage, props: true},
  {path: '/trends/:type?', name: 'Trends', component: TrendsPage, props: true},
  {path: '/contacts', name: 'Contacts', component: ContactPage},
  {path: '/medications', name: 'Medications', component: MedicationPage},
  {path: '/insurance', name: 'Insurance', component: InsurancePage},
  {path: '*', name: 'Not Found', component: NotFound},
];

const router = new VueRouter({routes});

/**
 * Navigation guards to prevent user from accessing wrong pages.
 */
router.beforeEach((to, from, next) => {
  if (to.name === 'Login' && localStorage.vuex && JSON.parse(localStorage.vuex).username) {
    next({name: 'Account'}); // Go to Account page if user navigates to Login and are signed in
    return;
  }

  if (to.name !== 'Login' && !(localStorage.vuex && JSON.parse(localStorage.vuex).username)) {
    next({name: 'Login'}); // Go to Login page if user navigates to any other page and are not signed in
    return;
  }

  if (['Logs', 'Trends'].includes(to.name) && !to.params.type) {
    next({name: to.name, params: {type: 'all'}})
    return;
  }
  
  next();
});

export default router;
