<template>
  <div id="app">

    <router-view /> <!-- This is where your pages (Home, Profile) will be rendered -->
  </div>
</template>

<script>

import {useRoute} from "vue-router";
import {onMounted, watch} from "vue";

export default {
  name: 'App',
  components: {

  },
  setup() {
    const route = useRoute()

    const loadCSS = () => {
      if (route.meta.requiresProfileCSS) {
        import('./assets/profile/style.css')
      }
    }

    onMounted(() => {
      loadCSS() // Load CSS when the app is first mounted
    })

    watch(route, () => {
      loadCSS() // Load CSS when the route changes
    })
  }
}
</script>

<style>
/* Basic styling for the home page */
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;

}
</style>
