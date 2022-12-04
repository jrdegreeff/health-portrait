<template>
  <article>
    <nav>
      <section>
        <header>
          <h2>
            <router-link to="/">
              Health Journal
            </router-link>
          </h2>
        </header>
        <ul>
          <li>
            <router-link to="/">
              Logs
            </router-link>
          </li>
          <li>
            <router-link to="/">
              Trends
            </router-link>
          </li>
        </ul>
      </section>
      <hr>
      <section>
        <header>
          <h2>
            <router-link to="/">
              Health Book
            </router-link>
          </h2>
        </header>
        <ul>
          <li>
            <router-link to="/contacts">
              Contacts
            </router-link>
          </li>
          <li>
            <router-link to="/medications">
              Medications
            </router-link>
          </li>
          <li>
            <router-link to="/insurance">
              Insurance
            </router-link>
          </li>
        </ul>
      </section>
      <hr>
      <section>
        <header>
          <h2>
            <router-link to="/account">
              My Account
            </router-link>
          </h2>
        </header>
      </section>
    </nav>
    <div />
  </article>
</template>

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
