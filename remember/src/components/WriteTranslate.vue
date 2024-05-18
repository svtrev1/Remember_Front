<template>
    <div class="write-translation">
      <h2>{{ currentWord && currentWord.russian }}</h2>
      <input type="text" v-model="userTranslation" />
      <button @click="checkTranslation">Далее</button>
      <p v-if="showResult" :class="resultClass">{{ resultMessage }}</p>
    </div>
    <div class="timer">
      <span>{{ minutes }}:{{ seconds }}</span>
    </div>
    <div class="modal-container" v-if="isModalVisible">
      <div class="overlay" @click="closeModal"></div>
      <div class="modal3">
        <p>Вы ответили правильно на {{ correctCount }} из {{ countWord }} вопросов. <br/> Время теста: {{ minutes }}:{{ seconds }}</p>
        <span @click="closeModal" class="close-icon">✖</span>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, computed, onMounted } from 'vue';
  import { getWords } from '../api.js';
  import { useRouter } from 'vue-router';
  
  export default {
    props: ['topicId'],
    setup(props) {
      const words = ref([]);
      const i = ref(1);
      const userTranslation = ref('');
      const showResult = ref(false);
      const resultClass = ref('');
      const resultMessage = ref('');
      const isModalVisible = ref(false);
      const correctCount = ref(0);
      const countWord = ref(0);
      const minutes = ref(0);
    const seconds = ref(0);
    let timerInterval;
    const router = useRouter();
  
      onMounted(async () => {
        words.value = await getWords(props.topicId);
        countWord.value = words.value.length;
        startTimer();
      });

      const startTimer = () => {
      timerInterval = setInterval(() => {
        seconds.value++;
        if(seconds.value === 60) {
          seconds.value = 0;
          minutes.value++;
        }
      }, 1000);
    };
  
      const currentWord = computed(() => {
        return words.value[i.value - 1];
      });
  
      const checkTranslation = () => {
        if (currentWord.value && userTranslation.value.toLowerCase() === currentWord.value.english.toLowerCase()) {
          resultClass.value = 'correct';
          resultMessage.value = 'Правильно';
          correctCount.value++;
        } else {
          resultClass.value = 'incorrect';
          resultMessage.value = `Неправильно. Правильный перевод: ${currentWord.value && currentWord.value.english}`;
        }
        showResult.value = true;
        setTimeout(() => {
          showResult.value = false;
          i.value++;
          if (i.value > words.value.length) {
            isModalVisible.value = true;
            clearInterval(timerInterval);
          } else {
            userTranslation.value = '';
          }
        }, 1000);
      };
  
      const closeModal = () => {
        isModalVisible.value = false;
        router.push('/topics');
      };
  
      return {
        currentWord,
        userTranslation,
        showResult,
        resultClass,
        resultMessage,
        checkTranslation,
        words,
        isModalVisible,
        correctCount,
        countWord,
        closeModal,
        startTimer,
        minutes,
        seconds
      };
    },
  };
  </script>
  
  <style>
.modal3 {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #ed87c1;
  padding: 20px;
  border: 3px solid #d87093;
  width: 46vw;
  text-align: center;
  max-width: 500px;
  height: 120px;
  font-size: 20px;
  color: rgb(255, 255, 255);
}
  </style>
  