<template>
    <div class="app">
      <h4>my deck</h4>
      <div class="word-deck">
        <router-link
          v-for="(card, index) in cards"
          :key="index"
          class="word item"
          :to="{ name: 'update-card', params: { userId: $route.params.userId,
            deckId:$route.params.deckId,
            cardId: card.id
        } }">
          <div class="word-body">
            <p class="word-title name">{{ card.name }}</p>
            <p class="word-title translate">{{ card.translate }}</p>
            <p class="word-title rate">{{ card.rate }}</p>
          </div>
        </router-link>
    </div>
    <div class="links">
    <router-link
      class="item link"
      :to="{ name: 'add-card', params: { deckId: $route.params.deckId, userId:$route.params.userId } }"
    >
      add new card
    </router-link>

    <router-link class="link"
     :to="{ name: 'myDecks', params: { id: $route.params.userId } }">back</router-link></div>
    </div>
    </template>
  
<script>
  import http from "../../http-common"; // подключение объекта, который позволяет отправлять запросы серверу
export default {
  name: "deck-detail", // Имя шаблона
  props: ['userId', 'deckId'],
  data() { // данные компонента (определение переменных)
    return {
      cards: []
    };
  },
  methods: { 
    getCards() {
      http
          .get("/myCards/" + this.deckId)
          .then(response => { 
            this.cards = response.data;
            console.log(this.cards);
          })
          .catch(e => {
            console.log(e);
          });
    }
  },
  mounted() { 
    this.getCards();
  }
}
  </script>
  
  <style>
  .word {
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
  
  .word:hover{
    background-color: #202528;
    color:white;
    transition: all 500ms;
  }
  .item {
    text-decoration: none; /* Убрать подчеркивание при наведении на ссылку */
  }
  
  .word-deck {
    display: flex;
    flex-wrap: space-around; /* Обертывание на новую строку при достижении конца контейнера */
    gap: 5px; /* Расстояние между карточками в ряду */
  }
  </style>