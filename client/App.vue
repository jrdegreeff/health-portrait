<template>
  <div id="app">
    <NavBar />
    <div id="content">
      <AlertBox />
      <Header />
      <!-- https://stackoverflow.com/questions/40404787/best-practice-for-reacting-to-params-changes-with-vue-router -->
      <router-view :key="$route.fullPath" />
    </div>
  </div>
</template>

<script lang="ts">
import NavBar from '@/components/layout/NavBar.vue';
import AlertBox from '@/components/layout/AlertBox.vue';
import Header from '@/components/layout/Header.vue';

export default {
  name: 'App',
  components: {NavBar, AlertBox, Header},
  async beforeCreate() {
    // Sync stored account info to current session
    const res = await this.$helpers.fetch('/api/accounts/session', {});
    await this.$store.dispatch('loadAccount', res);

    // Clear alerts on page refresh
    this.$store.commit('clearAlerts');
  }
};
</script>

<style>
* {
  box-sizing: border-box;
}

:root {
  --primary: #e8f3db;
  --lightPrimary: #f3f9ed;
  --darkPrimary: #c5e1a5;
  --secondary: #d9d9d9;
  --lightSecondary: #e3e3e3;
  --darkSecondary: #cecece;
  
  --light: #ffffff;
  --lightGray: #dddddd; 
  --gray: #888888;
  --darkGray: #444444;
  --dark: #000000;

  --error: #a61721;
  --success: #2d8757;
}

body {
  font-family: 'Inter', sans-serif;
  font-size: 1.2rem;

  background-color: var(--light);
  color: var(--dark);

  height: 100vh;
  margin: 0;

  display: flex;
  flex-direction: column;
}

#app {
  flex-grow: 1;
  display: flex;
}

#content {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

#content > header > * {
  padding: 2em;
}

#content > main {
  flex-grow: 1;
  padding: 2em;
}

/* TODO: responsive CSS */

section + hr {
  margin: 1rem 0;
  width: calc(100% + 2rem);
  transform: translateX(-1rem);
}

section > header {
  margin-bottom: 1rem;
}

section > header:last-child {
  margin-bottom: 0;
}

header > h1,
header > h2,
header > h3,
header > h4,
header > h5,
header > h6 {
  margin: 0;
}

hr {
  background-color: var(--darkPrimary);
  border: none;
  height: 2px;
}

a {
  color: var(--dark);
  text-decoration: none;
}

a:hover {
  color: var(--darkGray);
}

button {
  border: 1px solid var(--dark);
  border-radius: 1rem;
  padding: 0.5rem 2rem;
}

button:hover {
  cursor: pointer;
}

button.btn-primary {
  background-color: var(--primary);
}

button.btn-primary:hover {
  background-color: var(--lightPrimary);
}

button.btn-secondary {
  background-color: var(--secondary);
}

button.btn-secondary:hover {
  background-color: var(--lightSecondary);
}

fieldset {
  border: 1px solid var(--dark);
  margin: 1rem 0 0 0;
}

fieldset > legend {
  font-weight: bold;
}

fieldset > span {
  display: block;
}

fieldset > article + button {
  margin-top: 1rem;
}

label {
  margin-right: 1rem;
}

label + small {
  margin-left: -0.5rem;
}

input, textarea, select {
  border-radius: 0.5rem;
  border: 1px solid var(--dark);
  padding: 0.5rem;
  margin: 0.5rem;
}

input.error, textarea.error, select.error {
  border-color: var(--error);
}

small {
  color: var(--gray);
  margin-right: 1rem;
}

small.error {
  color: var(--error);
}
</style>
