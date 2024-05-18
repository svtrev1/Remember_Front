import { createRouter, createWebHistory } from 'vue-router';
import Topics from './components/Topics.vue';
import Words from './components/Words.vue';
import AllTopics from './components/AllTopics.vue';
import Cards from './components/Cards.vue';
import WriteTranslate from './components/WriteTranslate.vue';
import FindTranslate from './components/FindTranslate.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/topics', component: Topics },
    { path: '/words/:topicId', name: 'Words', component: Words, props: true },
    { path: '/alltopics', component: AllTopics },
    { path: '/cards/:topicId', name: 'Cards', component: Cards, props: true},
    { path: '/write/:topicId', name: 'Write', component: WriteTranslate, props: true},
    { path: '/find/:topicId', name: 'Find', component: FindTranslate, props: true}
  ]
});

export default router;