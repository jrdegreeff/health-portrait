import Vue from 'vue';
import VueRouter from 'vue-router';
import HomePage from './components/HomePage.vue';
import AccountPage from './components/Account/AccountPage.vue';
import ContactPage from './components/Medical-Contact/ContactPage.vue';
import LoginPage from './components/Login/LoginPage.vue';
import EntryPage from './components/Entry/EntryPage.vue';
import CreateEntryPage from './components/Entry/CreateEntryPage.vue';
import EditEntryPage from './components/Entry/EditEntryPage.vue';
import InsurancePage from './components/Insurance-Card/InsurancePage.vue'
import MedicationPage from './components/Medication/MedicationPage.vue'
import NotFound from './NotFound.vue';
import TrendsPage from './components/Trends/TrendsPage.vue';

Vue.use(VueRouter);

const routes = [
  {path: '/', name: 'Home', component: HomePage},
  {path: '/account', name: 'Account', component: AccountPage},
  {path: '/contacts', name: 'Contacts', component: ContactPage},
  {path: '/login', name: 'Login', component: LoginPage},
  {path: '/logs/:type', name: 'Logs', component: EntryPage, props: true},
  {path: '/newLog', name: 'New Log', component: CreateEntryPage},
  {path: '/editLog/:entryId', name: 'Edit Log', component: EditEntryPage, props: true},
  {path: '/insurance', name: 'Insurance', component: InsurancePage},
  {path: '/medications', name: 'Medications', component: MedicationPage},
  {path: '/trends/:type', name: 'Trends', component: TrendsPage, props: true},
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
  
  next();
});

export default router;
