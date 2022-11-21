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
    // TODO
  }
};
</script>

<style>
* {
  box-sizing: border-box;
}

body {
  height: 100vh;
  margin: 0;
}
</style>
