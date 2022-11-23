<template>
  <div id="app">
    <!-- https://stackoverflow.com/questions/40404787/best-practice-for-reacting-to-params-changes-with-vue-router -->
    <router-view :key="$route.fullPath" />
  </div>
</template>

<script lang="ts">
export default {
  name: 'App',
  beforeCreate() {
    // Sync stored username to current session
    fetch('/api/accounts/session', {
      credentials: 'same-origin' // Sends express-session credentials with request
    }).then(res => res.json()).then(async res => {
      await this.$store.commit('setUsername', res.account ? res.account.username : null);
    });
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
}

body {
  height: 100vh;
  font-family: 'Inter', sans-serif;
  margin: 0;
  font-size: 1.1rem;
  padding: 2rem;
}

h1 {
  margin-top: 0rem;
}

@media (max-width: 30rem) {
  main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
  }
}

.sidenav {
  height: 100%; 
  width: 30%; 
  position: fixed; 
  z-index: 1; 
  top: 0; 
  left: 0;
  background-color: var(--primaryGray); 
  overflow-x: hidden; 
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2rem;
  padding: 1rem 1rem 1rem 3rem;
}

.sidenav h1 {
  font-weight: 600;
}

.sidenav a {
  text-decoration: none;
  color: black;
}

.navGroup ul {
  margin: 0rem !important;
}

.navGroup li {
  padding-bottom: 1rem;
  text-align: left;
  font-size: 1.4rem;
}

.navItem {
  color: black;
}

.navItem:hover {
  color: var(--darkGray);
  cursor: pointer;
}

.content {
  margin-left: 32% !important;
  width: 66%;
}

@media (max-width: 60rem) {
  .main, #app {
    display: flex;
    justify-content: center;
    margin: 1rem;
  }

  .content {
    width: 90%;
    text-align: center;
    margin: auto !important;
  }
}

@media (min-width: 60rem) {

}

.btn {
  border: 1px solid black;
  border-radius: 1rem;
  padding: 0.5rem 2rem;
  margin: 1rem;
}

.btn:hover {
  cursor: pointer;
}

.btnPrimary {
  background-color: var(--primaryGray);
}

.btnPrimary:hover {
  background-color: var(--lightPrimaryGray);
}

.btnSecondary {
  background-color: var(--secondaryGray);
  border: none;
  padding: 1rem 2rem;
}

.btnSecondary:hover {
  background-color: var(--lightSecondaryGray);
}

.btnTertiary {
  background-color: white;
  border-radius: 15px;
  padding: 0.5rem 0.7rem;
}

.btnTertiary:hover {
  background-color: var(--lightSecondaryGray);
}

fieldset {
  border: 1px solid black;
}

legend {
  font-weight: bold;
}

label {
  margin-right: 1rem;
}

input {
  border-radius: 0.5rem;
  border: 1px solid black;
  padding: 0.5rem;
  margin: 0.5rem;
}

.alerts {
  position: absolute;
  z-index: 99;
  bottom: 0;
  top: 100%;
  left: 50%;
  transform: translate(-50%, 10%);
  width: 100%;
  text-align: center;
}

.alerts article {
  border-radius: 5px;
  padding: 10px 20px;
  color: #fff;
}

.alerts p {
  margin: 0;
}

.alerts .error {
  background-color: rgb(166, 23, 33);
}

.alerts .success {
  background-color: rgb(45, 135, 87);
}

</style>
