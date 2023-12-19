<template>
    <div>
        <h4>Добавление новой колоды</h4>
        <div v-if="!submitted">
            <!--В @submit указывается обработчик, который выполнится после нажатия на кнопку "Добавить"
            Обработчик addDiscipline определён в script-->
            <form @submit="addDeck">
                <!--v-model - директива для связывания данных с элементами.
                Связь происходит при помощи переменных, которые определены в data()-->
                <input type="text" name="name" id="name" placeholder="Название колоды" required v-model="deck.name">
                <input type="submit" value="Добавить">
            </form>
            <div>
                <router-link :to="{ name: 'myDecks', params: { id: $route.params.id } }">Вернуться к моим колодам</router-link>
            </div>
        </div>
        <div v-else>
            <h4>Вы успешно добавили колоду</h4>
            <div>
                <!--В v-on:click указывается обработчик, который выполниться после нажатия на кнопку "Добавить новую учебную дисциплину"
                Обработчик newDiscipline определён в script-->
                <button v-on:click="newDeck">Добавить еще одну колоду</button>
            </div>
            <div>
                <router-link :to="{ name: 'myDecks', params: { id: $route.params.id } }">Вернуться к моим колодам</router-link>
            </div>
        </div>
    </div>
</template>

<script>
    import http from "../../http-common";
    export default {
        name: "addDeck",
        props: ['id'],
        data() {
            return {
                deck: {
                    id: null,
                    name: ""
                },
                submitted: false
            };
        },
        methods: {
            addDeck(e) {
                e.preventDefault(); // запрет отправки формы, так как обрабатывать будем с помощью методов axios
                var data = {
                    name: this.deck.name,
                    id: this.$route.params.id
                };
                // Либо var data = this.user;
                http
                    .post("/addDeck", data)
                    .then(response => { // запрос выполнился успешно
                        this.deck.id = response.data.id;
                    })
                    .catch(e => { // при выполнении запроса возникли ошибки
                        console.log(e);
                    });
                this.submitted = true;
            },
            newDeck() {
                this.submitted = false;
                this.deck = {
                    id: null,
                    name: ""
                };
            }
        }
    }
</script>