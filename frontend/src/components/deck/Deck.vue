<template>
    <div class="app">
      <h4>my cards</h4>
      <div class="word-deck">
        <router-link
          v-for="(card, index) in cards"
          :key="index"
          class="word item"
          :to="{ name: 'update-card', params: { userId: $route.params.userId, deckId:$route.params.deckId, cardId: card.id } }"
          :style="{ borderColor: getBorderColor(card.rate) }"
        >
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
  
        <router-link class="link" :to="{ name: 'myDecks', params: { id: $route.params.userId } }">back</router-link>
      </div>
    </div>
  </template>
  
  <script>
  import http from "../../http-common";
  
  export default {
    name: "deck-detail",
    props: ["userId", "deckId"],
    data() {
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
          })
          .catch(e => {
            console.log(e);
          });
      },
      getBorderColor(rate) {
        // Calculate border color based on the rate value
        const red = Math.round(255 - (rate / 100) * 255);
        const green = Math.round((rate / 100) * 255);
        return `rgb(${red}, ${green}, 0)`;
      }
    },
    mounted() {
      this.getCards();
    }
  };
  </script>
  
  <style>
  .word {
    text-align: center;
    width: 30%;
    height: 25%;
    margin-right: 10px;
    margin-bottom: 10px;
    cursor: pointer;
    border: 3px solid;
    border-radius: 10px;
    overflow: hidden;
    color: grey;
    background-color: #202528;
  }
  
  .word:hover {
    background-color: #202528;
    color: white;
    transition: all 500ms;
  }
  
  .item {
    text-decoration: none;
  }
  .word-deck {
    display: flex;
    flex-wrap: space-around;
    gap: 5px;
  }
  </style>
  