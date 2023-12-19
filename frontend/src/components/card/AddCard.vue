<template>
    <div>
        <h4>Добавление новой карты</h4>
        <div v-if="!submitted">
            <!--В @submit указывается обработчик, который выполнится после нажатия на кнопку "Добавить"
            Обработчик addDiscipline определён в script-->
            <form @submit="addCard">
                <!--v-model - директива для связывания данных с элементами.
                Связь происходит при помощи переменных, которые определены в data()-->
                <input type="text" name="name" id="name" placeholder="Введите слово" required v-model="card.name">
                <input type="text" name="translate" id="translate" placeholder="Введите перевод" required v-model="card.translate">
                <input type="submit" value="Добавить">
            </form>
            <div>
                <router-link
            class="item"
            :to="{ name: 'deck-detail', params: { userId: $route.params.userId, deckId: $route.params.deckId } }">
            Вернуться к колоде</router-link>
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