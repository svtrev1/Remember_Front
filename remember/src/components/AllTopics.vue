<template>
  <div class="topics-container">
    <div class="title">Все темы:</div>
    <ul class="topics">
    <li v-for="topic in topics" :key="topic.id" class="topic-item">
        <router-link :to="{ name: 'Words', params: { topicId: topic.id }}" class="topic-link">
        <div class="topic-name">{{ topic.name.toUpperCase() }}</div>
        <div class="user-name">({{ users[topic.id] }})</div>
        <div class="word-count">{{ counts[topic.id-1] }} words</div>
      </router-link>
      </li>
    </ul>
  </div>
  </template>
  
  <script>
  import { onMounted, ref} from 'vue';
  import { useRouter } from 'vue-router';
  import { getAllTopics, getWordCount, getUserById } from '../api.js';
  
  export default {
    setup() {
      const topics = ref([]);
      const counts = ref([]);
      const users = ref ({});
      
      const router = useRouter();
      onMounted(async () => {
        topics.value = await getAllTopics(1);
        for (const topic of topics.value) {
            counts.value.push(await getWordCount(topic.id));
            users.value[topic.id] = await getUserById(topic.user_id);
        }
      });
      const selectCategory = (topic) => {
      router.push({ name: 'Words', params: { topicId: topic.id } });
    };

      return { topics, counts, selectCategory, users, getUserById};
    }
  };
  </script>

  
  <style>

.topics-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
  }

  .title {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 40px;
  color: #d87093;
  font-weight: 800;
  text-shadow: 3px 3px 3px white;
  }

  .topics {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
.topic-item {
    text-decoration: none !important;
    font-size: 20px;
    border-radius: 5%;
    border: 3px solid #d87093;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100px;
    height: 150px;
    background-color: #ed87c1;
    color: white;
    margin: 5px;
}
.topic-item:hover {
    border-color: #f0ffff;
}
.topic-link {
  text-decoration: none;
  color: inherit;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.topic-name {
  font-size: 24px;
}

.word-count {
  font-size: 18px;
  margin-top: 5px;
  font-weight: bold;
}

  </style>
