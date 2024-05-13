<template>
  <div class="topics-container">
    <div class="title">Твои темы:
      <button class="add-topic-button" @click="openModal">+</button>
    </div>
    <ul class="topics">
    <li v-for="topic in topics" :key="topic.id" class="topic-item" @mouseover="showDeleteButton(topic.id)" @mouseleave="hideDeleteButton(topic.id)">
      <span v-if="topic.showDeleteButton" class="delete-icon" @click="deleteNewTopic(topic.id)">✖</span>
        <router-link :to="{ name: 'Words', params: { topicId: topic.id }}" class="topic-link">
        <div class="topic-name">{{ topic.name.toUpperCase() }}</div>
        <div class="word-count">{{ counts[topic.id-1] }} words</div>
      </router-link>
      </li>
    </ul>
  </div>
  </template>
  
  <script>
  import { onMounted, ref} from 'vue';
  import { useRouter } from 'vue-router';
  import { getTopics, getWordCount, deleteTopic } from '../api.js';
  
  export default {
    setup() {
      const topics = ref([]);
      const counts = ref([]);
      const router = useRouter();
      const tempUserId = JSON.parse(localStorage.getItem('user_id'));
      onMounted(async () => {
        topics.value = await getTopics(tempUserId);
        for (const topic of topics.value) {
            counts.value.push(await getWordCount(topic.id));
            topic.showDeleteButton = false;
        }
      });
      // const addNewTopic = () => {

      // };

      const showDeleteButton = (topicId) => {
        const topic = topics.value.find(topic => topic.id === topicId);
        if (topic) topic.showDeleteButton = true;
        console.log(" show delete button");
      };

      const hideDeleteButton = (topicId) => {
        const topic = topics.value.find(topic => topic.id === topicId);
        if (topic) topic.showDeleteButton = false;
        console.log("hide delete button");
      };

      const deleteNewTopic = async (topicId) => {
        await deleteTopic(topicId);
        const index = topics.value.findIndex(topic => topic.id === topicId);
          if (index !== -1) {
            topics.value.splice(index, 1);
          }
      };

      return { topics, counts, deleteNewTopic, showDeleteButton, hideDeleteButton};
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
  .topics {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    padding: 0;
  }
.topic-item {
    position: relative;
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
    background-color: #ee93c7 
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

.delete-icon {
  position: absolute;
  top: 5px;
  right: 5px;
  font-size: 16px;
  cursor: pointer;
  display: none;
  color: white;
}

.topic-item:hover .delete-icon {
  display: block;
}
.delete-icon {
  transition: color 0.3s;
}

.add-topic-button {
  margin-right: 20px; 
  font-size: 20px;
  background-color: #4CAF50; 
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 20px;
  border: 3px solid #d87093;
  background-color: #ed87c1;
}

.add-topic-button:hover {
  background-color: #ee93c7; 
  border-color: #f0ffff;
}

.title {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 36px;
}
  </style>
