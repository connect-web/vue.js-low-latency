<!-- src/views/Home.vue -->
<template>
  <div class="home">
    <div id="stars"></div>
    <div id="stars2"></div>
    <div id="stars3"></div>

    <div id="title">
      <h1>Low Latency</h1>
      <p>Machine Learning & Bot tools</p>

      <div class="button-container">
        <button anim="sheen" id="login" @click="redirectToLogin">Login</button>
        <button anim="sheen" id="register" @click="redirectToRegister">Register</button>
      </div>
    </div>
  </div>
</template>

<script>
import ApiService from "@/services/GlobalStats.js";
import {loadCss, loadScript} from "@/utils/loaders.js";

export default {
  name: 'Home',
  methods: {
    redirectToLogin() {
      // Redirect logic for login
      window.location.href = '/login'; // Replace with appropriate route
    },
    redirectToRegister() {
      // Redirect logic for register
      window.location.href = '/register'; // Replace with appropriate route
    },
    createStars(numStars, elementId, maxSize = 3) {
      const stars = [];
      for (let i = 0; i < numStars; i++) {
        const x = Math.floor(Math.random() * window.innerWidth);
        const y = Math.floor(Math.random() * window.innerHeight);
        const size = Math.floor(Math.random() * maxSize) + 1;
        stars.push(`${x}px ${y}px #FFF`);
      }
      document.getElementById(elementId).style.boxShadow = stars.join(", ");
    },
    // Debounced resize handler
    debouncedResize() {
      clearTimeout(this.resizeTimeout);
      this.resizeTimeout = setTimeout(() => {
        this.createStars(1000, "stars", 1);
        this.createStars(750, "stars2", 2);
        this.createStars(500, "stars3", 3);
      }, 250); // Adjust 250ms delay as needed
    },


  },

  mounted() {
    // Dynamically load external scripts for button animation and redirection
    //loadScript('assets/home/script.js');
    //loadScript('assets/home/redirect.js');
    loadCss("home/stars.css")
    loadCss("home/buttons.css")

    loadScript('home/button-animations.js');

    // Initialize stars for each layer
    this.createStars(1000, "stars", 1);
    this.createStars(750, "stars2", 2);
    this.createStars(500, "stars3", 3);

    // Add resize event listener with debouncing
    window.addEventListener("resize", this.debouncedResize);

  },
  beforeDestroy() {
    // Clean up event listener on component destruction
    window.removeEventListener("resize", this.debouncedResize);
  },


};
</script>

<style scoped>


#title {
  position: absolute;
  top: 30%;
  left: 0;
  right: 0;
  color: #FFF;
  text-align: center;
  font-family: "runescape", sans-serif;
  font-weight: 300;
  font-size: 60px;
  letter-spacing: 10px;
  margin-top: -60px;
  padding-left: 10px;
}
#title span {
  background: -webkit-linear-gradient(#0d7eff, #54a7ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 800;
}

#title p {
  font-size: 0.6em;
  font-family: runescape, sans-serif;
  background: -webkit-linear-gradient(white, #38495a);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: 4px;
}

#title button{
  font-weight: bold;
  font-size: 25px;
}

.button-container{
  display: flex;
  justify-content: center;
  gap: 1em;
}
.button-container button{
  font-size: 2rem;
  width: 10rem;
}
</style>
