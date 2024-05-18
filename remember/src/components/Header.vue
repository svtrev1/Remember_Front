<template>
    <header class="header">
      <div class="header-content">
            <router-link to="/alltopics" class="header_a">R E M E M B E R</router-link>
            <router-link to="/topics" class="profile_icon"><i class="pi pi-user"></i></router-link>
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
  color: #d87093;
  border-top: 2px solid #d87093;
  border-bottom: 2px solid #d87093;
  padding: 10px;
  letter-spacing: 2px;
  transition: all .25s;
  font-weight: bold;
  text-shadow: 4px 4px 4px white;
}

.header_a:hover{
  letter-spacing: 15px;
}

.profile_icon {
  position: absolute;
  right: 30px;
  width: 35px;
  height: 35px;
  font-size: 28px;
  background-color: #d87093;
  border: 3px solid #d87093;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.profile_icon i {
    background-color: #d87093;
    border-radius: 50%;
    padding-bottom: 5px;
    color: white;
}
  </style>