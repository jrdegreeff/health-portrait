import Vue from 'vue';
import VueRouter from 'vue-router';
import HomePage from './components/HomePage.vue';
import AccountPage from './components/Account/AccountPage.vue';
import LoginPage from './components/Login/LoginPage.vue';
import EntryPage from './components/Entry/EntryPage.vue';
import CreateEntryPage from './components/Entry/CreateEntryPage.vue';
import EditEntryPage from './components/Entry/EditEntryPage.vue';
import NotFound from './NotFound.vue';

Vue.use(VueRouter);

const routes = [
  {path: '/', name: 'Home', component: HomePage},
  {path: '/account', name: 'Account', component: AccountPage},
  {path: '/login', name: 'Login', component: LoginPage},
  {path: '/logs', name: 'Logs', component: EntryPage},
  {path: '/newLog', name: 'New Log', component: CreateEntryPage},
  {path: '/editLog/:entryId', name: 'Edit Log', component: EditEntryPage, props: true},
  {path: '*', name: 'Not Found', component: NotFound}
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

  if (['Home', 'Account'].includes(to.name) && !JSON.parse(localStorage.vuex).username) {
    next({name: 'Login'}); // Go to Login page if user navigates to Account and are not signed in
    return;
  }
  
  next();
});

export default router;
