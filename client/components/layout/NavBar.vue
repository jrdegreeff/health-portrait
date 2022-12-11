<template>
  <article>
    <nav>
      <section>
        <header><h2>
          <NavLink to="/" name="Home" :activatable="false"/>
        </h2></header>
      </section>
      <hr/>
      <section>
      <header><h2>
        <NavLink to="/logs" name="Health Journal" :activatable="false"/>
      </h2></header>
      <ul>
        <li>
          <NavLink to="/logs" name="Logs"/>
        </li>
        <li>
          <NavLink to="/trends" name="Trends"/>
        </li>
      </ul>
      </section>
      <hr/>
      <section>
      <header><h2>
        <NavLink to="/contacts" name="Health Book" :activatable="false"/>
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
        <NavLink to="/account" name="Account Settings" :activatable="false"/>
      </h2></header>
      <ul>
        <li>
          <NavLink to="/account" name="Shared Account"/>
        </li>
        <li>
          <NavLink to="/user" :name="$store.getters.username"/>
        </li>
      </ul>
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
  background-color: var(--primary);
  padding: 1em 2em;
}

nav {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  white-space: nowrap;
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
