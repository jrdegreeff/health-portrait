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
  beforeCreate() {
    // Sync stored username to current session
    fetch('/api/accounts/session', {
      credentials: 'same-origin' // Sends express-session credentials with request
    }).then(res => res.json()).then(async res => {
      await this.$store.dispatch('loadAccount', res);
    });

    // Clear alerts on page refresh
    this.$store.state.alerts = {};
  }
};
</script>

<style>
* {
  box-sizing: border-box;
}

:root {
  --primaryGray: #d9d9d9;
  --lightPrimaryGray: #e3e3e3;
  --secondaryGray: #d9d9d9aa;
  --lightSecondaryGray: #e3e3e3aa;
  --darkGray: #4f4f4f;
  --warning: #A61721;
  --success: #2D8757;
}

body {
  font-family: 'Inter', sans-serif;
  font-size: 1.2rem;
  height: 100vh;
  display: flex;
  flex-direction: column;
  margin: 0;
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

a {
  text-decoration: none;
  color: black;
}

a:hover {
  color: var(--darkGray);
  cursor: pointer;
}

button {
  border: 1px solid black;
  border-radius: 1rem;
  padding: 0.5rem 2rem;
}

button:hover {
  cursor: pointer;
}

button.btn-primary {
  background-color: var(--primaryGray);
}

button.btn-primary:hover {
  background-color: var(--lightPrimaryGray);
}

button.btn-secondary {
  background-color: var(--secondaryGray);
}

button.btn-secondary:hover {
  background-color: var(--lightSecondaryGray);
}

button.btn-tertiary {
  background-color: white;
}

button.btn-tertiary:hover {
  background-color: var(--lightSecondaryGray);
}

fieldset {
  border: 1px solid black;
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

input, textarea {
  border-radius: 0.5rem;
  border: 1px solid black;
  padding: 0.5rem;
  margin: 0.5rem;
}

small {
  color: #aaaaaa;
}
</style>
