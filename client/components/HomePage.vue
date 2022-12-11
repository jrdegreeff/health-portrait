<template>
  <main>
    <section>
      <header>
        <h1> Welcome to The Future of Healthcare </h1>
      </header>
      <p>
        Keep track of important health information with Health Book. 
        <br>
        Keep track of day-to-day fluctuations of your health with Health Journal. 
        <br>
        Take control of your own health, and let your loved ones help you. 
      </p>
    </section>
    <section>
      <img src = "wold_care.svg" alt="World in Hands SVG"/>
    </section>
  </main>
</template>

<script lang="ts">
  
  export default {
    name: 'HomePage',
    components: {
    },
    mounted() {
      this.$store.commit("setHeader", {
        title: `${this.$store.getters.accountName}'s Health Portrait`,
        enableBack: false,
        headerLinks: {
          "/logs": "Health Journal",
          "/contacts": "Health Book",
          "/account": "Account Settings",
        },
      });
    },
  };
</script>

<style scoped>
h1 {
  text-align: center;
}

p {
  padding-top: 20px;
  line-height: 40px;
  text-align: center;
}

img {
  display: block;
  margin: auto;
  padding-top: 10px;
  height: 200px;
}

</style>
