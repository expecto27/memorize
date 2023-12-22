import { createWebHistory, createRouter } from "vue-router";
// импорт компонентов
import myDeck from "./components/deck/MyDeck";
import AddDeck from "./components/deck/AddDeck";
import Deck from "./components/deck/Deck";

import Card from "./components/card/Card.vue";
import AddCard from "./components/card/AddCard.vue";
import Training from './components/card/Training';

import Login from "./components/authorization/Login";
import Profile from "./components/authorization/Profile";
import Register from "./components/authorization/Register";

// определяем маршруты
const routes = [
    {
        path: "/myDecks/:id", // указание маршрута, по которому будем переходить к списку учебных дисциплин
        name: "myDecks", // имя маршрута
        alias: "/decks", // указание дополнительного маршрута
        props: true,
        component: myDeck, // компонент, на основании которого будет отрисовываться страница
        meta: {
            title: "my decks"
        }
    },
    {
        path: "/addDeck/:id",
        name: "addDeck",
        props: true,
        component: AddDeck,
        meta: {
            title: "add deck"
        }
    },
    {
        path: '/deck/:userId/:deckId',
        name: 'deck-detail',
        props: true,
        component: Deck,
        meta: {
          title: 'my deck',
        },
    },
    {
        path: '/card/:userId/:deckId/:cardId',
        name: 'update-card',
        props: true,
        component: Card,
        meta: {
          title: 'update dard',
        },
    },
    {
        path: '/newCard/:userId/:deckId',
        name: 'add-card',
        props: true,
        component: AddCard,
        meta: {
          title: 'add card',
        },
    },
    {
        path: "/login",
        name: "login-user",
        component: Login,
        meta: {
            title: "sign in"
        }
    },
    {
        path: "/register",
        name: "register-user",
        component: Register,
        meta: {
            title: "sign up"
        }
    },
    {
        path: "/profile",
        name: "profile-user",
        component: Profile,
        meta: {
            title: "Профиль пользователя",
            requiredAuth: true
        }
    },
    {
        path: "/training/:userId/:deckId",
        name: "training-deck",
        props: true,
        component: Training,
        meta: {
            title: "Training"
        }
    }
];

const router = createRouter({
    history: createWebHistory(), // указываем, что будет создаваться история посещений веб-страниц
    routes, // подключаем маршрутизацию
});
import store from "./store/index";
// указание заголовка компонентам (тега title), заголовки определены в meta
router.beforeEach(async (to, from, next) => {
    // для тех маршрутов, для которых не определены компоненты, подключается только App.vue
    // поэтому устанавливаем заголовком по умолчанию название "Главная страница"
    document.title = to.meta.title || 'Главная страница';

    // проверяем наличие токена и срок его действия
    const auth = await store.getters["auth/isTokenActive"];
    if (auth) {
        return next();
    }
    // если токена нет или его срок действия истёк, а страница доступна только авторизованному пользователю,
    // то переходим на страницу входа в систему (ссылка на /login)
    else if (!auth && to.meta.requiredAuth) {
        const user = JSON.parse(localStorage.getItem("user"));
        await store.dispatch("auth/refreshToken", user)
            .then(() => {
                return next();
            })
            .catch(() => {
                return next({path: "/login"});
            });
        return next({ path: "/login" });
    }
    return next();
});

export default router;