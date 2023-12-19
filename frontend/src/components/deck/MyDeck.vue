<template>
    <div>
      <h4>Мои колоды</h4>
      <ul>
        <li v-for="(deck, index) in decks" :key="index">
        <router-link
            class="item"
            :to="{ name: 'deck-detail', params: { userId: $route.params.id, deckId: deck.id } }"
        >
            {{deck.name}}
        </router-link>
        </li>
      </ul>
    </div>
    <router-link
      class="item"
      :to="{ name: 'addDeck', params: { id: $route.params.id } }"
    >
      Добавить новую колоду
    </router-link>

</template>
  
  <script>
  import http from "../../http-common"; // подключение объекта, который позволяет отправлять запросы серверу
export default {
  name: "deck-detail", // Имя шаблона
  props: ['id'],
  data() { // данные компонента (определение переменных)
    return {
      decks: []
    };
  },
  methods: { 
    getDecks() {
      http
          .get("/myDecks/" + this.id)
          .then(response => { 
            this.decks = response.data;
          })
          .catch(e => {
            console.log(e);
          });
    }
  },
  mounted() { 
    this.getDecks();
  }
}
  </script>
  
  <style>
  
  </style>