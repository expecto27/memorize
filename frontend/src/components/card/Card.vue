<template>
    <div v-if="this.card">
        <h4>card</h4>
        <div v-if="!submitted">
            <form @submit="updateCard">
                <div class="mb-3">
                    <label for="name" class="form-label">word</label>
                    <input type="text" class="form-control" id="name" name="name" placeholder="enter word" required v-model="card.name">
                </div>
                <div class="mb-3">
                    <label for="translate" class="form-label">translation</label>
                    <input type="text" class="form-control" id="translate" name="translate" placeholder="enter translation" required v-model="card.translate">
                </div>
                <button type="submit" class="btn btn-primary link">update</button>
            </form>
            <div class="links">
                <router-link
                    class="item link"
                    v-on:click="deleteCard()"
                    :to="{ name: 'deck-detail', params: { userId: $route.params.userId, deckId: $route.params.deckId } }"
                >delete card</router-link>

                <router-link
                    class="item link"
                    :to="{ name: 'deck-detail', params: { userId: $route.params.userId, deckId: $route.params.deckId } }"
                >back</router-link>
                
            </div>
        </div>
        <div v-else>
            <h4>Вы успешно обновили карту</h4>
            <router-link
                class="item"
                :to="{ name: 'deck-detail', params: { userId: $route.params.userId, deckId: $route.params.deckId } }"
            >back</router-link>
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
                console.log("Deleting card with ID:", this.card.id);
                http
                    .post("/deleteCard/" + this.card.id)
                    .then(() => {
                        this.$router.push('/deck/' + this.userId +"/" + this.deckId);
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

<style>
</style>