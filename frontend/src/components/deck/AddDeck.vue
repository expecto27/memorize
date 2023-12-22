<template>
    <div v-if="currentUser == $route.params.id">
        <h4>addition new deck</h4>
        <div v-if="!submitted">
            <!--В @submit указывается обработчик, который выполнится после нажатия на кнопку "Добавить"
            Обработчик addDiscipline определён в script-->
            <form @submit="addDeck">
                <!--v-model - директива для связывания данных с элементами.
                Связь происходит при помощи переменных, которые определены в data()-->
                <input class="form-control" type="text" name="name" id="name" placeholder="name" required v-model="deck.name">
                <button type="submit" class="btn btn-primary link">add</button>
            </form>
            <div>
                <router-link class="link" :to="{ name: 'myDecks', params: { id: $route.params.id } }">back</router-link>
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
        computed: { // вычисляемые свойства
            currentUser() {
                return this.$store.state.auth.user.id;
            }
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

<style>
</style>