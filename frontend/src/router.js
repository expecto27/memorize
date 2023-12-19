import { createWebHistory, createRouter } from "vue-router";
// импорт компонентов
import myDeck from "./components/deck/MyDeck";
import AddDeck from "./components/deck/AddDeck";
import Deck from "./components/deck/Deck";

import Card from "./components/card/Card.vue";
// определяем маршруты
const routes = [
    {
        path: "/myDecks/:id", // указание маршрута, по которому будем переходить к списку учебных дисциплин
        name: "myDecks", // имя маршрута
        alias: "/decks", // указание дополнительного маршрута
        props: true,
        component: myDeck, // компонент, на основании которого будет отрисовываться страница
        meta: {
            title: "Мои колоды"
        }
    },
    {
        path: "/addDeck/:id",
        name: "addDeck",
        props: true,
        component: AddDeck,
        meta: {
            title: "Добавление колоды"
        }
    },
    {
        path: '/deck/:userId/:deckId',
        name: 'deck-detail',
        props: true,
        component: Deck,
        meta: {
          title: 'Моя колода',
        },
    },
    {
        path: '/card/:userId/:deckId/:cardId',
        name: 'update-card',
        props: true,
        component: Card,
        meta: {
          title: 'Моя колода',
        },
    },
];

const router = createRouter({
    history: createWebHistory(), // указываем, что будет создаваться история посещений веб-страниц
    routes, // подключаем маршрутизацию
});

// указание заголовка компонентам (тега title), заголовки определены в meta
router.beforeEach((to, from, next) => {
    // для тех маршрутов, для которых не определены компоненты, подключается только App.vue
    // поэтому устанавливаем заголовком по умолчанию название "Главная страница"
    document.title = to.meta.title || 'Главная страница';
    next();
});

export default router;