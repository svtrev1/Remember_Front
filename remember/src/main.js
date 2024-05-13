import { createApp } from 'vue';
import App from './App.vue';
import { createRouter } from 'vue-router';
import router from './router.js';

const app = createApp(App);
app.use(router);
app.mount('#app');
