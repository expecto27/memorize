<template>
    <div v-if="this.deck && currentUser == $route.params.userId" class="app">
      <div class="links title">
        <div>my deck ({{ calculateAverage(cards)  }}%performance)</div>
        <div> <router-link class="link" :to="{ name: 'myDecks', params: { id: $route.params.userId } }">back</router-link></div>
      </div>
      
      <form @submit="updateDeck">
        <div class="mb-3">
            <label for="name" class="form-label">{{deck.name}}</label>
            <input type="text" class="form-control" id="name" name="name" placeholder="change name" required v-model="deck.name">
            </div>
        <button type="submit" class="btn btn-primary link">update</button>
    </form>
    <div class="training">
    <router-link
    class="link"
    :to="{ name: 'training-deck', params: { userId: $route.params.userId, deckId: $route.params.deckId } }"
  >
    start
  </router-link>
</div>
      <h4>my cards ({{getCardCount()}}cards)</h4>
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
            <p class="word-title rate">{{ card.rate }}%</p>
          </div>
        </router-link>
      </div>
      <div class="links">
        <router-link
          class="item link"
          :to="{ name: 'add-card', params: { deckId: $route.params.deckId, userId:$route.params.userId } }"
        >add new card</router-link>
  
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
        cards: [],
        deck: null
      };
    },
    computed: { // вычисляемые свойства
        currentUser() {
            return this.$store.state.auth.user.id;
        }
    },
    methods: {
      calculateAverage(array) {
        if (!Array.isArray(array) || array.length === 0) {
          return 0;
        }
        const sum = array.reduce((accumulator, currentValue) => accumulator + currentValue.rate, 0);
        const average = sum / array.length;

        return average;
      },


      getCardCount(){
        return this.cards.length;
      },
      getDeck() {
            http
                .get("/deck/" + this.deckId) // обращаемся к серверу для получения данных учебной дисциплины, id взят из входных параметров (props)
                .then(response => { // запрос выполнен успешно
                    this.deck = response.data;
                })
                .catch(e => { // запрос выполнен с ошибкой
                    console.log(e);
                });
        },
        updateDeck(e) {
            e.preventDefault(); // запрет отправки формы, так как обрабатывать будем с помощью методов axios
            var data = {
                name: this.deck.name
            };

            http
                .post("/updateDeck/" + this.deck.id, data)
                .then(() => { 
                    
                })
                .catch(e => {
                    console.log(e);
                });
            this.submitted = true;
        },
        deleteDeck() {
            console.log("Deleting deck with ID:", this.deck.id);
            http
                .post("/deleteDeck/" + this.deck.id)
                .then(() => {
                    this.$router.push('/myDeck/' + this.userId);
                })
                .catch(e => {
                    console.log(e);
                });
        },
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
      this.getDeck();
    }
  };
  </script>
  
  <style>
  .word {
    text-align: center;
    width: 29%;
    height: 25%;
    margin-left: 10px;
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
    flex-wrap: wrap;
    gap: 5px;
  }
  .training{
    display: flex;
    justify-content: center;
    margin-top: 10%;
  }
  .title{
    margin-bottom: 20px;
  }

  .links{
    display: flex;
    justify-content: space-between;
  }
  </style>
  