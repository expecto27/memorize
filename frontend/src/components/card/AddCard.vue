<template>
    <div>
        <h4>new card</h4>
        <div v-if="!submitted">
            <!--В @submit указывается обработчик, который выполнится после нажатия на кнопку "Добавить"
            Обработчик addDiscipline определён в script-->
            <form @submit.prevent="addCard">
                <div class="mb-3">
                    <label for="name" class="form-label">word</label>
                    <input type="text" class="form-control" id="name" name="name" placeholder="enter word" required v-model="card.name">
                </div>
                <div class="mb-3">
                    <label for="translate" class="form-label">translation</label>
                    <input type="text" class="form-control" id="translate" name="translate" placeholder="enter translation" required v-model="card.translate">
                </div>
                <button type="submit" class="btn btn-primary link">add</button>
            </form>
            <div class="link">
                <router-link
                 class="item link"
                :to="{ name: 'deck-detail', params: { userId: $route.params.userId, deckId: $route.params.deckId } }">
                back</router-link>
            </div>
        </div>
        <div v-else>
            <h4>Вы успешно добавили карту</h4>
            <div>
                <!--В v-on:click указывается обработчик, который выполниться после нажатия на кнопку "Добавить новую учебную дисциплину"
                Обработчик newDiscipline определён в script-->
                <button v-on:click="newCard">Добавить еще одну карту</button>
            </div>
            
        </div>
    </div>
</template>

<script>
    import http from "../../http-common";
    export default {
        name: "add-card",
        props: ['userId', 'deckId'],
        data() {
            return {
                card: {
                    deck_id: null,
                    name: "",
                    translate: "",
                    rate: 0
                },
                submitted: false
            };
        },
        methods: {
            addCard(e) {
                e.preventDefault(); // запрет отправки формы, так как обрабатывать будем с помощью методов axios
                var data = {
                    name: this.card.name,
                    translate : this.card.translate,
                    deck_id: this.deckId
                };
                
                http
                    .post("/addCard/", data)
                    .then(response => { // запрос выполнился успешно
                        this.card.id = response.data.id;
                    })
                    .catch(e => { // при выполнении запроса возникли ошибки
                        console.log(e);
                    });
                this.submitted = true;
            },
            newCard() {
                this.submitted = false;
                this.card = {
                    deck_id: null,
                    name: "",
                    translate: "",
                    rate: 0
                };
            }
        }
    }
</script>
<style>
form {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    background-color: #1f1f1f;
}

.mb-3 {
    margin-bottom: 15px;
}

.form-label {
    font-weight: bold;
    display: block;
    margin-bottom: 5px;
}

.form-control {
    width: 100%;
    padding: 8px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
}

button {
    background-color: #1f1f1f;
    border: none;
    font-size: 20px;
    cursor: pointer;
    border-radius: 4px;
}

</style>
