<template>
    <div
      @click="goToWords"
      class="topic"
    >
      <div class="topic-content">
        <p>{{ topic.name }}</p>
        <span>{{ topic.words.length }} words</span>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: ['topic'],
    methods: {
      goToWords() {
        // Логика перехода в слова темы
      }
    }
  }
  </script>
  
  <style>
  .topic {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 150px;
    height: 200px;
    margin: 10px;
    padding: 20px;
    border: 2px solid #FFC0CB;
    border-radius: 10px;
    background-color: #FFFFFF80;
    cursor: pointer;
  
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(255, 192, 203, 0.25);
  }
  
  .topic-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }
  
  .topic-content p {
    font-size: 20px;
    font-weight: bold;
  }
  
  .topic-content span {
    margin-left: 10px;
    font-size: 16px;
    color: #FFC0CB;
  }
  </style>