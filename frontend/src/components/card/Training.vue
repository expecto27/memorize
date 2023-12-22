<template>
  <div class="app" v-if="this.needCards[this.index] && currentUser == $route.params.userId">
    <div class="pool">
      <div class="card-container">
        <div class="card1" v-if="!flag" @click="showTranslate">
          <div class="side front">
            {{ this.needCards[this.index].name }}
          </div>
          <div class="side back">
            Translation
          </div>
        </div>
        <div v-else class="card1 show" @click="showTranslate">
          <div class="side front">
            {{ this.needCards[this.index].name }}
          </div>
          <div class="side back">
            {{ this.needCards[this.index].translate }}
          </div>
        </div>
      </div>
      <div v-if="flag" class="links bar">
        <div class="link" @click="miss">
          I don't know
        </div>

        <div class="link" @click="success">
          I know
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import http from "../../http-common";
export default {
  name: "training-deck",
  props: ['userId', 'deckId'],
  data() {
    return {
      cards: [],
      needCards: [],
      flag: false,
      index: 0
    };
  },
  computed: { // вычисляемые свойства
        currentUser() {
            return this.$store.state.auth.user.id;
        }
    },
  methods: {
    success() {
      if (this.index + 1 == this.needCards.length) {
        window.location.href = '/deck/' + this.userId + "/" + this.deckId;
      }
      var card = this.needCards[this.index];
      card.rate += (100 - card.rate) * 0.01;
      if (card.rate > 100) {
        card.rate = 100;
      }
      this.updateCard(card);
      this.index++;
      this.flag = false;
    },
    miss() {
      if (this.index + 1 == this.needCards.length) {
        window.location.href = '/deck/' + this.userId + "/" + this.deckId;
      }
      var card = this.needCards[this.index];
      card.rate -= (100 - card.rate) * 0.03;
      if (card.rate < 0) {
        card.rate = 0;
      }
      this.updateCard(card);
      this.index++;
      this.flag = false;
    },
    updateCard(card) {
      var data = {
        name: card.name,
        translate: card.translate,
        rate: card.rate
      };
      http
        .post("/updateCard/" + card.id, data)
        .then(() => {})
        .catch(e => {
          console.log(e);
        });
      this.submitted = true;
    },
    getCards() {
      http
        .get("/myCards/" + this.deckId)
        .then(response => {
          this.cards = response.data;
          this.getNeedCard(this.cards);
        })
        .catch(e => {
          console.log(e);
        });
    },
    getNeedCard(cards) {
      const sortedCards = cards
        .sort((a, b) => a.rate - b.rate);

      const lowestRateCards = sortedCards.slice(0, 3);

      const randomCards = this.getRandomCards(sortedCards, 2);

      this.needCards = randomCards.concat(lowestRateCards)
      console.log(this.needCards);
    },
    getRandomCards(cards, count) {
      count = Math.min(count, cards.length);
      const shuffledCards = cards.slice().sort(() => Math.random() - 0.5);
      return shuffledCards.slice(0, count);
    },
    showTranslate() {
      this.flag = true
    }
  },
  mounted() {
    this.getCards();
  }
}
</script>

<style>
  .pool {
    margin-top: 20vh;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .card-container {
    margin-bottom: 20px;
    perspective: 1000px;
    transform-style: preserve-3d;
  }

  .card1 {
    width: 200px;
    height: 300px;
    will-change: transform;
    transition: transform 0.6s linear; /* Adjust the transition speed */
    cursor: pointer;
    perspective: 600px; /* Adjust the perspective */
    transform-style: preserve-3d;
  }

  .card1:hover {
    transform: rotateY(-180deg);
  }

  .side {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    border: 1px solid #3498db;
    border-radius: 5px;
    color: #3498db;
  }

  .front {
    transform: perspective(600px) rotateY(0deg);
  }

  .back {
    transform: perspective(600px) rotateY(180deg);
    background-color: #f1f1f1;
    color: #333333;
  }

  .links {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }

  .link {
    cursor: pointer;
    padding: 10px;
  }
</style>
