

<template>
  <div id="app" class="app">
  <div class="page-container">
      <Header/>
    <main class="page-main">
      <Topics/>
    </main>
      <Footer/>
  </div>
</div>
</template>

<script>
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
import Topics from './components/Topics.vue';

export default {
  components: {
    Header,
    Footer,
    Topics
  }
};
</script>

<style>
.page-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-image: url('./assets/background.jpg');
  background-size: cover;
  background-position: center;

}

.page-main {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  

}


</style>

