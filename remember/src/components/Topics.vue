<template>
    <ul class="topics">
      <li v-for="topic in topics" :key="topic.id" class="topic-item">
        {{ topic.name }} ({{ topic.id }}) - {{ counts[topic.id-1] }} слов
      </li>
    </ul>
  </template>
  
  <script>
  import { onMounted, ref} from 'vue';
  import { getTopics, getWordCount } from '../api.js';
  
  export default {
    setup() {
      const topics = ref([]);
      const counts = ref([]);

      onMounted(async () => {
        topics.value = await getTopics(1);
        for (const topic of topics.value) {
            counts.value.push(await getWordCount(topic.id));
        }
      });
  
      return { topics, counts};
    }
  };
  </script>

  
  <style>
  .topics {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
.topic-item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 150px;
  background-color: #ed87c1;
  color: white;
  margin: 5px;
}

  </style>