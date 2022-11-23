<template>
  <nav>
    <section>
    <header><h2>
      <router-link to="/">Health Journal</router-link>
    </h2></header>
    <ul>
      <li>
        <router-link to="/">Logs</router-link>
      </li>
      <li>
        <router-link to="/">Trends</router-link>
      </li>
    </ul>
    </section>
    <hr/>
    <section>
    <header><h2>
      <router-link to="/">Health Book</router-link>
    </h2></header>
    <ul>
      <li>
        <router-link to="/">Contacts</router-link>
      </li>
      <li>
        <router-link to="/">Medications</router-link>
      </li>
      <li>
        <router-link to="/">Insurance</router-link>
      </li>
    </ul>
    </section>
    <hr/>
    <section>
    <header><h2>
      <router-link to="/account">My Account</router-link>
    </h2></header>
    </section>
  </nav>
</template>

<style scoped>
nav {
  background-color: var(--primaryGray);
  padding: 1em 2em;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

h2 {
  font-weight: 600;
}

a {
  text-decoration: none;
  color: black;
}

a:hover {
  color: var(--darkGray);
  cursor: pointer;
}

ul {
  margin: 0;
}

li {
  padding-bottom: 1rem;
  font-size: 1.4rem;
}
</style>
