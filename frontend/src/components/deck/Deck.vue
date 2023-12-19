<template>
    <div>
      <h4>Моя колода</h4>
      <ul>
        <li v-for="(card, index) in cards" :key="index">
            {{card.name}}<br>
            {{card.translate}}<br>
            {{card.rate}}%
            <div>
                <router-link class="item" :to="{ name: 'update-card', params: { userId: $route.params.userId,
                    deckId:$route.params.deckId,
                     cardId: card.id
                   } }">Изменить</router-link>
            </div>
        </li>
        
      </ul>
    </div>
    <router-link
      class="item"
      :to="{ name: 'addDeck', params: { id: $route.params.deckId } }"
    >
      Добавить новую карту
    </router-link>

    <router-link :to="{ name: 'myDecks', params: { id: $route.params.userId } }">Вернуться к моим колодам</router-link>
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
  
  </style>