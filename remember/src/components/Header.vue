<template>
    <header class="header">
      <div class="header-content">
            <router-link to="/alltopics" class="header_a">R E M E M B E R</router-link>
      </div>
    </header>
  </template>
  
  <style>
  .header {
    background-color: rgba(255,255,255,0.4);
    color: #fff;
    height: 60px;
    display: flex;
    justify-content: center;
  }
  .header-content {
    max-width: 1200px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

  }
.header_a{
  display: block;
  font-size: 24px;
  font-family: sans-serif;
  text-decoration: none;
  color: #333;
  border-top: 2px solid #333;
  border-bottom: 2px solid #333;
  padding: 10px;
  letter-spacing: 2px;
  transition: all .25s;
}

.header_a:hover{
  letter-spacing: 15px;
}
  </style>