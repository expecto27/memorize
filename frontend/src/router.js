import { createWebHistory, createRouter } from "vue-router";
// импорт компонентов
import myDeck from "./components/deck/MyDeck";

// определяем маршруты
const routes = [
    {
        path: "/myDecks/:id", // указание маршрута, по которому будем переходить к списку учебных дисциплин
        name: "deck", // имя маршрута
        alias: "/decks", // указание дополнительного маршрута
        props: true,
        component: myDeck, // компонент, на основании которого будет отрисовываться страница
        meta: {
            title: "Мои колоды"
        }
    }
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