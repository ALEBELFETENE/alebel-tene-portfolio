// src/main.js
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';

// Import Tailwind CSS
import './input.css'; // This file must contain your Tailwind directives

// Optional global styles
// import './style.css'; // Uncomment if you have custom global styles

// Create Vue app
const app = createApp(App);

// Install Pinia store
const pinia = createPinia();
app.use(pinia);

// Install Vue Router
app.use(router);

// Mount app
app.mount('#app');
