<template>
    <div id="app">
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <router-link class="navbar-brand link" to="/MyDecks/1">
          <img src="@/assets/logo.png" alt="memorize" class="icon" />memorize
        </router-link>
  
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
  
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <router-link class="link" to="/MyDecks/1">home</router-link>
            </li>
            <!-- Add other links if needed -->
          </ul>
        </div>
      </nav>
    </div>
  </template>
  
  <script>
  export default {
    name: "NavBar",
    data() {
      return {};
    },
  };
  </script>
  
  <style scoped>
  nav {
    background-color: #1f1f1f;
    position: fixed;
    top:0px;
    left:0px;
    right:0px;
  }
  
  .icon {
    width: 20px;
    height: 20px;
  }
  
  /* Center the navbar */
  .navbar {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  
  /* Remove underlines from links */
  .navbar-dark .navbar-nav .nav-link {
    color: #fff;
    text-decoration: none;
  }
  
  /* Change color on hover */
  .navbar-dark .navbar-nav .nav-link:hover {
    color: #ccc;
  }
  </style>
  
  