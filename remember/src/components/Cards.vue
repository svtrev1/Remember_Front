<template>
<div class="cards">
    <button @click="prevWord" :disabled="currentIndex === 0"><</button>
    <div class="card-container">
        <div class="card" @click="flipCard" :class="{ flipped: isFlipped }">
            <p v-if="!isFlipped && words[currentIndex]">{{ words[currentIndex].russian }}</p>
            <p v-if="isFlipped && words[currentIndex]">{{ words[currentIndex].english }}</p>
        </div>
    </div>
    <button @click="nextWord" :disabled="currentIndex === words.length-1">></button>
</div>
</template>
 
<script>
import { onMounted, ref} from 'vue';
import { getWords, getWordCount } from '../api.js';

export default {
    props: ['topicId'],
    setup(props) {
        const words = ref([]);
        const currentIndex = ref(0);
        const isFlipped = ref(false);
        const count = ref(0);
    
        onMounted(async () => {
            words.value = await getWords(props.topicId);
            count.value = await getWordCount(props.topicId);
        });

        const flipCard = () => {
            isFlipped.value = !isFlipped.value;
        };

        const prevWord = () => {
            if (currentIndex.value > 0)
            {
                currentIndex.value--;
                isFlipped.value = false;
            }
        };

        const nextWord = () => {
            if(currentIndex.value < words.value.length-1) {
                currentIndex.value++;
                isFlipped.value = false;
            }
        }
        return { words, currentIndex, isFlipped, flipCard, prevWord, nextWord};
    },
};
</script>

<style>
.cards {
  display: flex;
  align-items: center;
}

.card {
  width: 200px;
  height: 200px;
  border-radius: 5px;
  border: 3px solid #d87093;
  background-color: #e692c2;
  display: flex;
  color: white;
  font-size: 30px;
  justify-content: center;
  align-items: center;
  transition: transform 0.4s;
}

.flipped {
  transform: rotateY(360deg);
}
button {
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

button:hover {
  background-color: #ee93c7; 
  border-color: #f0ffff;
}

button:disabled {
    opacity: 0.5;
}
</style>