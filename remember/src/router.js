import { createRouter, createWebHistory } from 'vue-router';
import Topics from './components/Topics.vue';
import Words from './components/Words.vue';
import AllTopics from './components/AllTopics.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/topics', component: Topics },
    { path: '/words/:topicId', name: 'Words', component: Words, props: true },
    { path: '/alltopics', component: AllTopics }
  ]
});

export default router;