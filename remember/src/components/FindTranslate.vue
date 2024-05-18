<template>
  <div class="find-container">
    <h1>Выбери правильный ответ:</h1>
    <h2>{{ currentWord }}</h2>
    <div class="choices">
      <button v-for="(choice, index) in choices" :key="index" :data-choice="choice" @click="checkAnswer(choice)">{{ choice }}</button>
    </div>
    <div class="timer">
      <span>{{ minutes }}:{{ seconds }}</span>
    </div>
  </div>
  <div class="modal-container" v-if="isModalVisible">
    <div class="overlay" @click="closeModal"></div>
    <div class="modal2">
      <p>Вы ответили правильно на {{ correctCount }} из {{ countWord }} вопросов. <br/> Время теста: {{ minutes }}:{{ seconds }}</p>
      <span @click="closeModal" class="close-icon">✖</span>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { getWords, getWordCount } from '../api';
import { useRouter } from 'vue-router';

export default {
  props: ['topicId'],
  setup(props) {
    const currentWord = ref({});
    const words = ref([]);
    const countWord = ref(0);
    const correctCount = ref(0);
    const isModalVisible = ref(false);
    const minutes = ref(0);
    const seconds = ref(0);
    let timerInterval;
    const i = ref(0);
    const choices = ref([]);
    const router = useRouter();
    

    onMounted(async () => {
      words.value = await getWords(props.topicId);
      countWord.value = await getWordCount(props.topicId);
      startTimer();
      generateChoices();
    });

    const generateChoices = () => {
      const correctIndex = Math.floor(Math.random() * 4);
      choices.value = [
        ...getRandomWords(correctIndex)
      ];
      choices.value.splice(correctIndex, 0, words.value[i.value].russian);
      currentWord.value = words.value[i.value].english;
      i.value++;
    };

    const getRandomWords = (correctIndex) => {
      const randomWords = [];
      let j = 0;
      while (randomWords.length < 3) {
        const randomIndex = Math.floor(Math.random() * words.value.length);
        if (randomIndex !== i.value && randomIndex !== correctIndex && !randomWords.includes(words.value[randomIndex].russian)) {
          randomWords.push(words.value[randomIndex].russian);
          j++;
        }
      }
      return randomWords;
    };

    const startTimer = () => {
      timerInterval = setInterval(() => {
        seconds.value++;
        if(seconds.value === 60) {
          seconds.value = 0;
          minutes.value++;
        }
      }, 1000);
    };

    const checkAnswer = (choice) => {
  if (choice === words.value[i.value - 1].russian) {
    correctCount.value++;
    const correctButton = document.querySelector(`button[data-choice="${choice}"]`);
    correctButton.classList.add('correct');
    const incorrectButton = document.querySelector('.choices button.incorrect');
    if (incorrectButton) {
      incorrectButton.classList.remove('incorrect');
    }
    setTimeout(() => {
      correctButton.classList.remove('correct');
      if (i.value === countWord.value) {
        isModalVisible.value = true;
        clearInterval(timerInterval);
      } else {
        generateChoices();
      }
    }, 1000);
  } else {
    const incorrectButton = document.querySelector(`button[data-choice="${choice}"]`);
    incorrectButton.classList.add('incorrect');
    const correctRussian = words.value[i.value - 1].russian;
    const correctButton = document.querySelector(`button[data-choice="${correctRussian}"]`);
    correctButton.classList.add('correct');
    setTimeout(() => {
      incorrectButton.classList.remove('incorrect');
      correctButton.classList.remove('correct');
      if (i.value === countWord.value) {
        isModalVisible.value = true;
        clearInterval(timerInterval);
      } else {
        generateChoices();
      }
    }, 1000);
  }
};


    

    const closeModal = () => {
      isModalVisible.value = false;
      router.push('/topics');
    };

    return {
      words,
      isModalVisible,
      seconds,
      minutes,
      currentWord,
      choices,
      startTimer,
      closeModal,
      checkAnswer,
      setInterval,
      countWord,
      correctCount
    };
  },
};
</script>

<style>
.choices button.correct {
  background-color: green;
}
.choices button.incorrect {
  background-color: red;
}
.find-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 50vh;
  background-color: #f0a6d0;
  border-radius: 10px;
  border: 3px solid #e383b9;
  padding: 10px;
}

h1 {
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #333;
}

h2 {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #333;
}

.choices {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}

.choices button {
  font-size: 18px;
  font-weight: bold;
  padding: 10px 20px;
  margin-bottom: 10px;
  background-color: #e383b9;
  border: 1px solid #333;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.choices button:hover {
  background-color: #e973b6;
}

.timer {
  font-size: 20px;
  font-weight: bold;
  color: #fff;
  text-shadow: .1em 0 #000, -.1em 0 #000, 0 .1em #000, 0 -.1em #000;

}

.modal-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.modal2 {
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

.close-icon {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 24px;
  font-weight: bold;
  cursor: pointer;
}

.close-icon:hover {
  color: red;
}

</style>

