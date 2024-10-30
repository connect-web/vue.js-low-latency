// src/main.js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router' // Ensure the router is imported
import './assets/fonts/fonts.css';



createApp(App)
    .use(router) // Make sure the router is being used
    .mount('#app') // Mount the app to the #app element in index.html
