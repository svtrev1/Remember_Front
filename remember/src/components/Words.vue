<template>
  <div class="words-container">
    <div class="words">
      <div class="title">{{  categoryName.toUpperCase() }}
        <button v-if="categoryExists" class="add-topic-button" @click="openModal">+</button>
        <button v-if="!categoryExists" class="add-topic-button" @click="addToUserCategories">+</button>
        <button v-if="isPlay" class="add-topic-button" @click="openChooseModal">▶</button>
      </div>
      <ul class="words-list">
        <li v-for="word in words" :key="word.id" @mouseover="showDeleteButton(word.id)" @mouseleave="hideDeleteButton(word.id)">
          <p>{{ word.english }} - {{ word.russian }} </p>
          <span v-if="word.showDeleteButton" class="delete-icon" style="font-size: 10px; color: red; display: block;" @click="deleteNewWord(word.id)">✖</span>
        </li>
        <li v-if="isEmptyList" class="no-words">NO WORDS</li>
      </ul>
    </div>
    <div class="modal-container" v-if="isErrorModalVisible">
      <div class="overlay" @click="closeModal"></div>
      <div v-if="isErrorModalVisible" class="modal">
        <form @submit.prevent="addNewWord">
            <label style="color: white; font-size: 200%">Добавление нового слова</label>
            <p style="font-size: 20px; color: red;">{{ errorMessage }}</p>
            <div class="input-button-container"> 
              <input class="modal-input" type="text" v-model="newWordEnglish" placeholder="Введите слово на английском">
              <input class="modal-input" type="text" v-model="newWordRussian" placeholder="Введите слово на русском" required>
              <button class="button is-primary button_add" type="submit">Добавить</button>
            </div> 
            </form>
        <span @click="closeModal" class="close-icon">✖</span>
      </div>
    </div>

    <div class="modal-container" v-if="isChooseModalVisible">
      <div class="overlay" @click="closeChooseModal"></div>
      <div class="modal1">
        <label style="color: white; font-size: 200%">Выберите режим</label>
        <div class="input-button-container"> 
          <router-link :to="{ name: 'Cards', params: { topicId: topicId}}" class="button_add button-choose">Карточки</router-link>
          <router-link :to="{ name: 'Find', params: { topicId: topicId}}" class="button_add button-choose">Найди перевод</router-link>
          <router-link :to="{ name: 'Write', params: { topicId: topicId}}" class="button_add button-choose">Напиши перевод</router-link>
          <span @click="closeChooseModal" class="close-icon">✖</span>
        </div>
      </div>
    </div>

  </div>
</template>
  
  <script>
  import { onMounted, ref, computed } from 'vue';
  import { useRouter } from 'vue-router';
  import { getWords, getCategoryNameById, checkUserCategory, addWord, copyCategory, deleteWord } from '../api.js';
  
  export default {
    props: ['topicId'],
    setup(props) {
      const words = ref([]);
      const categoryName = ref('');
      const router = useRouter();
      const tempUserId = JSON.parse(localStorage.getItem('user_id'));
      const isErrorModalVisible = ref(false);
      const errorMessage = ref('');
      const newWordRussian = ref('');
      const newWordEnglish = ref ('');
      const isChooseModalVisible = ref(false);
      const isPlay = ref(false);
  
    onMounted(() => {
      checkCategory();
    })

    onMounted(async () => {
      if (props.topicId) {
        categoryName.value = await getCategoryNameById(props.topicId);
        words.value = await getWords(props.topicId);
        if (words.value.length > 3){
          isPlay.value = true;
        }
        else
        {
          isPlay.value = false;
        }
        for (const word of words.value) {
            word.showDeleteButton = false;
        }
      }
    });

    const isEmptyList = computed(() => words.value.length === 0);
    const categoryExists = ref(false);
    const checkCategory = async () => {
      categoryExists.value = await checkUserCategory(props.topicId, tempUserId);
      console.log(categoryExists.value);
    };

    const showDeleteButton = (wordId) => {
        const word = words.value.find(word => word.id === wordId);
        if (word) word.showDeleteButton = true;
        console.log("show");
      };

      const hideDeleteButton = (wordId) => {
        const word = words.value.find(word => word.id === wordId);
        if (word) word.showDeleteButton = false;
        console.log("hide");
      };

    const addToUserCategories = async () => {
      const newCategoryId = await copyCategory(props.topicId, tempUserId);
      categoryExists.value = true;
      router.push('/topics');
    };

    const addNewWord = async () => {
      try {
        if (words.value.length+1 > 3){
          isPlay.value = true;
        }
        else
        {
          isPlay.value = false;
        }
        await addWord(newWordEnglish.value, newWordRussian.value, props.topicId);
        words.value = await getWords(props.topicId);
        closeModal();
        newWordEnglish = ('');
        newWordRussian = ('');
        errorMessage.value = '';
      }
      catch (error) {
        errorMessage.value = error.message;
      }
    }
    const openModal = () => {
      errorMessage.value = '';
        isErrorModalVisible.value = true;
      };

    const closeModal = () => {
      isErrorModalVisible.value = false;
      errorMessage.value = '';
    };
    const openChooseModal = () => {
      isChooseModalVisible.value = true;
    }

    const closeChooseModal = () => {
      isChooseModalVisible.value = false;
    }

    const deleteNewWord = async (wordId) => {
        await deleteWord(wordId);
        const index = words.value.findIndex(word => word.id === wordId);
          if (index !== -1) {
            words.value.splice(index, 1);
          }
        if (words.value.length > 3){
          isPlay.value = true;
        }
        else
        {
          isPlay.value = false;
        }
      };
      return { words, categoryName, isEmptyList, categoryExists, checkCategory, closeModal, openModal, isErrorModalVisible, errorMessage, newWordEnglish, newWordRussian, addNewWord, addToUserCategories, isChooseModalVisible, closeChooseModal, openChooseModal, showDeleteButton, hideDeleteButton, deleteNewWord, isPlay};
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

  /*modal*/

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

  .modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #ed87c1;
  padding: 20px;
  border: 3px solid #d87093;
  width: 46vw;
  height: 36vh;
  text-align: center;
  max-width: 500px;
  }

  .modal1 {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #ed87c1;
  padding: 20px;
  border: 3px solid #d87093;
  width: 46vw;
  height: 30vh;
  text-align: center;
  max-width: 500px;
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
  border-radius: 5px;
  border: 3px solid #d87093;
  height: 62px;
  display: flex;
  justify-content: center;
  align-items: center;
  color:#a04765;
}
.modal-input {
  width: 90%;
  padding: 10px;
  margin: 10px 0;
  border: 3px solid #d87093;
  border-radius: 5px;
  font-size: 18px;
  flex: 1;
  height: 36px;
}

.button_add:hover {
  border-color: #e65d5b;
  color:#d87093;
  text-shadow: 3px 3px 3px white;
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
  flex-direction: column;
  width: 100%;
  box-sizing: border-box;
}

.button-choose {
  width: 90%;
  margin-top: 10px;
  text-decoration: none;
}
.delete-icon {
  position: absolute;
  top: 5px;
  right: 5px;
  font-size: 16px;
  cursor: pointer;
  color: white;
  transition: color 0.3s;
}
li {
  position: relative;
  margin-bottom: 5px;
}

  </style>