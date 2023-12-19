<template>
    <div v-if="this.card">
        <h4>Карта</h4>
        <div v-if="!submitted">
            <form @submit="updateCard">
                <input type="text" name="name" id="name" placeholder="Введите слово" required v-model="card.name">
                <input type="text" name="name" id="name" placeholder="Введите перевод" required v-model="card.translate">
                <input type="submit" value="Обновить">
            </form>
            <button v-on:click="deleteCard()">Удалить</button>
        </div>
        <div v-else>
            <h4>Вы успешно обновили карту</h4>
            <router-link
                class="item"
                :to="{ name: 'deck-detail', params: { userId: $route.params.userId, deckId: $route.params.deckId } }"
            >Вернуться к колоде</router-link>
        </div>
    </div>
    <div v-else>
        <br>
        <p>Выберите карту</p>
    </div>
</template>

<script>
    import http from "../../http-common";
    export default {
        name: "update-card",
        props: ['userId', 'deckId', 'cardId'],
        data() {
            return {
                card: null,
                submitted: false
            };
        },
        methods: {
            getCard() {
                http
                    .get("/card/" + this.cardId) // обращаемся к серверу для получения данных учебной дисциплины, id взят из входных параметров (props)
                    .then(response => { // запрос выполнен успешно
                        this.card = response.data;
                    })
                    .catch(e => { // запрос выполнен с ошибкой
                        console.log(e);
                    });
            },
            updateCard(e) {
                e.preventDefault(); // запрет отправки формы, так как обрабатывать будем с помощью методов axios
                var data = {
                    name: this.card.name,
                    translate: this.card.translate
                };

                http
                    .post("/updateCard/" + this.card.id, data)
                    .then(() => { 
                        
                    })
                    .catch(e => {
                        console.log(e);
                    });
                this.submitted = true;
            },
            deleteCard() {
                http
                    .post("/deleteCard/" + this.card.id)
                    .then(() => {
                        this.$router.push('/listDisciplines');
                    })
                    .catch(e => {
                        console.log(e);
                    });
            }
        },
        mounted() { // загружаем данные учебной дисциплины
            this.getCard();
        }
    }
</script>