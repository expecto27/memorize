<template>
    <div class="center-content app">
      <h4>my decks</h4>
      <div class="card-deck">
        <router-link
          v-for="(deck, index) in decks"
          :key="index"
          class="card item"
          :to="{ name: 'deck-detail', params: { userId: $route.params.id, deckId: deck.id } }"
        >
          <div class="card-body">
            <h5 class="card-title">{{ deck.name }}</h5>
          </div>
        </router-link>
      </div>
      <router-link
        class="item link"
        :to="{ name: 'addDeck', params: { id: $route.params.id } }"
      >
        add new deck
      </router-link>
    </div>
  </template>
  
  <script>
  import http from "../../http-common";
  
  export default {
    name: "deck-detail",
    props: ["id"],
    data() {
      return {
        decks: [],
      };
    },
    computed: { // вычисляемые свойства
        currentUser() {
            return this.$store.state.auth.user;
        }
    },
    methods: {
      getDecks() {
        http
          .get("/myDecks/" + this.id)
          .then((response) => {
            this.decks = response.data;
          })
          .catch((e) => {
            console.log(e);
          });
      },
    },
    mounted() {
      this.getDecks();
    },
  };
  </script>
  
  <style scoped>
  .card {
    width: 25%; /* Set the desired width */
    height: 25%; /* Set the desired height */
    margin-right: 10px;
    margin-bottom: 10px;
    cursor: pointer;
    border: 3px solid grey;
    border-radius: 10px;
    overflow: hidden;
    background-color: grey;
    color: #1f1f1f;
  }
  
  .card:hover{
    background-color: #202528;
    color:white;
    transition: all 500ms;
  }
  .item {
    text-decoration: none; /* Убрать подчеркивание при наведении на ссылку */
  }
  
  .card-deck {
    display: flex;
    flex-wrap: space-around; /* Обертывание на новую строку при достижении конца контейнера */
    gap: 5px; /* Расстояние между карточками в ряду */
  }

  </style>
  