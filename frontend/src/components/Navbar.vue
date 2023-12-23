<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <router-link v-if="currentUser" class="navbar-brand link" :to="{ name: 'myDecks', params: { id:  currentUser.id } }">
        <img src="@/assets/logo.png" alt="memorize" class="icon" />memo
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

      <div class="collapse navbar-collapse navbar-nav ml-auto" id="navbarSupportedContent">
          <div class="nav-item">
            <router-link v-if="currentUser" class="navbar-brand link" :to="{ name: 'myDecks', params: { id:  currentUser.id } }">home</router-link>
            </div>
          
          <div v-if="currentUser" >
              <router-link to="/profile" class="link login">
                  {{ currentUser.username }}
              </router-link></div>
          <div v-if="currentUser" >
              <a href @click.prevent="logOut" class="link">
                  log out
              </a>
          </div>
          
          <div v-else>
              <router-link to="/login" class="link login">
                  sign in
              </router-link>
          </div>

          
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
  computed: { // вычисляемые свойства
      currentUser() {
          return this.$store.state.auth.user;
      }
  },
  methods: {
      logOut() {
          this.$store.dispatch('auth/logout');
          window.location.href = '/login'; // // Используем такую конструкцию, а не this.$router.push, так как требуется перезагрузить страницу для обновления локального хранилища
      }
  }
};
</script>

<style scoped>
nav {
  background-color: #1f1f1f;
  position: fixed;
  top:0px;
  left:0px;
  right:0px;
  height: 10%;
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
.collapse{
  display: flex;
  justify-content: space-around;
  width: 20%;
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

