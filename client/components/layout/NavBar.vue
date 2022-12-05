<template>
  <article>
    <nav>
      <section>
      <header><h2>
        <NavLink to="/" name="Health Journal"/>
      </h2></header>
      <ul>
        <li>
          <NavLink to="/" name="Logs"/>
        </li>
        <li>
          <router-link to="/trends">Trends</router-link>
        </li>
      </ul>
      </section>
      <hr/>
      <section>
      <header><h2>
        <NavLink to="/" name="Health Book"/>
      </h2></header>
      <ul>
        <li>
          <NavLink to="/contacts" name="Contacts"/>
        </li>
        <li>
          <NavLink to="/medications" name="Medications"/>
        </li>
        <li>
          <NavLink to="/insurance" name="Insurance"/>
        </li>
      </ul>
      </section>
      <hr/>
      <section>
      <header><h2>
        <NavLink to="/account" name="My Account"/>
      </h2></header>
      </section>
    </nav>
    <div/>
  </article>
</template>

<script lang="ts">
import NavLink from '@/components/common/NavLink.vue';

export default {
  name: 'NavBar',
  components: {NavLink},
};
</script>

<style scoped>
article {
  background-color: var(--primaryGray);
  padding: 1em 2em;
}

nav {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  white-space: nowrap;
}

a.active {
  border-bottom: 1px black solid;
}

h2 {
  font-weight: 600;
}

ul {
  margin: 0;
}

li {
  padding-bottom: 1rem;
  font-size: 1.4rem;
}
</style>
