<template>
    <div>
      <h4>Мои колоды</h4>
      <ul>
        <li v-for="(deck, index) in decks" :key="index">
            {{deck.name}}
          </li>
      </ul>
    </div>
  </template>
  
  <script>
  import http from "../../http-common"; // подключение объекта, который позволяет отправлять запросы серверу
export default {
  name: "MyDecks", // Имя шаблона
  props: ['id'],
  data() { // данные компонента (определение переменных)
    return {
      decks: []
    };
  },
  methods: { // методы компонента
    getDecks() {
      http
          .get("/myDecks/" + this.id) // обращаемся к серверу для получения списка учебных дисциплин
          .then(response => { // запрос выполнен успешно
            this.decks = response.data;
          })
          .catch(e => { // запрос выполнен с ошибкой
            console.log(e);
          });
    }
  },
  mounted() { // загружаем данные учебных дисциплин. Обработчик mounted() вызывается после монтирования экземпляра шаблона
    this.getDecks();
  }
}
  </script>
  
  <style>
  
  </style>