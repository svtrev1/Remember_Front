<template>
    <div class="words">
      <h2>{{ categoryName.toUpperCase() }}</h2>
      <ul class="words-list">
        <li v-for="word in words" :key="word.id">{{ word.english }} - {{ word.russian }}</li>
        <li v-if="isEmptyList" class="no-words">NO WORDS</li>
      </ul>
    </div>
  </template>
  
  <script>
  import { onMounted, ref, computed } from 'vue';
  import { useRouter } from 'vue-router';
  import { getWords, getCategoryNameById, getTopics } from '../api.js';
  
  export default {
    props: ['topicId'],
    setup(props) {
      const words = ref([]);
      const categoryName = ref('');
      const router = useRouter();
  
    onMounted(async () => {
      if (props.topicId) {
        categoryName.value = await getCategoryNameById(props.topicId);
        words.value = await getWords(props.topicId);
      }
    });

    const isEmptyList = computed(() => words.value.length === 0);

      return { words, categoryName, isEmptyList };
    }
  };
  </script>
  <style>
  .words {
    font-family: Arial, sans-serif;
    margin: 20px;
  }
  
  h2 {
    color: #d87093;
  }
  
  .words-list {
    list-style-type: none;
    padding: 0;
  }
  
  li {
    margin-bottom: 5px;
  }
  
  .no-words {
    color: #ed87c1;
  }
  
  
  </style>