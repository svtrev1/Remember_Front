<template>
  <div class="topics-container">
    <div class="title">Твои темы, {{ username }}:
      <button class="add-topic-button" @click="openModal">+</button>
    </div>
    <ul class="topics">
    <li v-for="topic in topics" :key="topic.id" class="topic-item" @mouseover="showDeleteButton(topic.id)" @mouseleave="hideDeleteButton(topic.id)">
      <span v-if="topic.showDeleteButton" class="delete-icon" @click="deleteNewTopic(topic.id)">✖</span>
        <router-link :to="{ name: 'Words', params: { topicId: topic.id }}" class="topic-link">
        <div class="topic-name">{{ topic.name.toUpperCase() }}</div>
        <div class="word-count">{{ counts[topic.id] }} words</div>
      </router-link>

      </li>
    </ul>
    <div class="modal-container" v-if="isErrorModalVisible">
      <div class="overlay" @click="closeModal"></div>
      <div v-if="isErrorModalVisible" class="modal">
        <form @submit.prevent="addNewTopic">
            <label style="color: white; font-size: 200%">Добавление новой темы</label>
            <p style="font-size: 20px; color: red;">{{ errorMessage }}</p>
            <div class="input-button-container"> 
              <input class="modal-input" type="text" v-model="newTopicName" placeholder="Введите название темы" required>
              <button class="button is-primary button_add" type="submit">Добавить</button>
            </div> 
            </form>
        <span @click="closeModal" class="close-icon">✖</span>
      </div>
    </div>
  </div>
  </template>
  
  <script>
  import { onMounted, reactive, ref} from 'vue';
  import { getTopics, getWordCount, deleteTopic, addTopic, getUserById } from '../api.js';
  
  export default {
    setup() {
      const topics = ref([]);
      const counts = reactive([]);
      const tempUserId = JSON.parse(localStorage.getItem('user_id'));
      const newTopicName = ref('');
      const isErrorModalVisible = ref(false);
      const errorMessage = ref('');
      const username = ref('');

      onMounted(async () => {
        topics.value = await getTopics(tempUserId);
        for (const topic of topics.value) {
            counts[topic.id] = await getWordCount(topic.id);
            topic.showDeleteButton = false;
        }
        username.value = await getUserById(tempUserId);
      });

      const addNewTopic = async () => {
        try {
          await addTopic(tempUserId, newTopicName.value);
          topics.value = await getTopics(tempUserId);
          for (const topic of topics.value) {
              counts[topic.id] = await getWordCount(topic.id);
              topic.showDeleteButton = false;
          }
          closeModal();
        }
        catch (error) {
          errorMessage.value = error.message;
        }
      };
      const openModal = () => {
        isErrorModalVisible.value = true;
      };

      const closeModal = () => {
        isErrorModalVisible.value = false;
        errorMessage.value = '';
      };

      const showDeleteButton = (topicId) => {
        const topic = topics.value.find(topic => topic.id === topicId);
        if (topic) topic.showDeleteButton = true;
      };

      const hideDeleteButton = (topicId) => {
        const topic = topics.value.find(topic => topic.id === topicId);
        if (topic) topic.showDeleteButton = false;
      };

      const deleteNewTopic = async (topicId) => {
        await deleteTopic(topicId);
        const index = topics.value.findIndex(topic => topic.id === topicId);
          if (index !== -1) {
            topics.value.splice(index, 1);
          }
      };

      return { topics, counts, deleteNewTopic, showDeleteButton, hideDeleteButton, closeModal, openModal, addNewTopic, newTopicName, errorMessage, isErrorModalVisible, username};
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

.close-icon {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 24px;
  cursor: pointer;
  color: white;
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
  transition: color 0.3s;
}

.topic-item:hover .delete-icon {
  display: block;
}

.add-topic-button {
  margin-right: 20px; 
  font-size: 20px;
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
  font-size: 40px;
  color: #d87093;
  font-weight: 800;
  text-shadow: 3px 3px 3px white;
}

.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #ed87c1;
  padding: 20px;
  border: 3px solid #d87093;
  width: 46vw;
  height: 40vh;
  text-align: center;
  max-width: 500px;
}

.modal-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999; 
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6); 
}

.button_add {
  font-size: 20px;
  background-color: white;
  border-radius: 0 5px 5px 0;
  border-top: 3px solid #d87093;
  border-right: 3px solid #d87093;
  border-bottom: 3px solid #d87093;
  border-left: 1px solid grey;
  height: 62px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal-input {
  width: 90%;
  padding: 10px;
  margin: 10px 0;
  border-bottom: 3px solid #d87093;
  border-top: 3px solid #d87093;
  border-left: 3px solid #d87093;
  border-right: 0;
  border-radius: 5px 0 0px 5px;
  font-size: 18px;
  flex: 1;
  height: 36px;
}

.button_add:hover {
  background-color: white; 
  border-color: #ed87c1;
}
.modal form {
  display: flex;
  flex-direction: column; 
  align-items: center; 
}

.modal-input:focus {
  outline: none;
  border-color: #d87093;
}

.input-button-container {
  display: flex;
  align-items: center;
}
  </style>
