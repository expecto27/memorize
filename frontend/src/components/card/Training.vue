<template>
    <div class="app" v-if="this.needCards[this.index]">
        <div class="pool">
            <div class="game">
                {{ this.needCards[this.index].name }}
            </div>
            <div v-if="!flag" class="game show link" @click="showTranslate">
                show translate
            </div>
            <div v-else class="game show"> {{ this.needCards[this.index].translate }} </div>
            <div v-if="flag">
                <div class="links bar">
                    <div class="link" @click="miss">
                        I don't know
                    </div>
                    <div class="link" @click="succes">
                        I know
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import http from "../../http-common";
    export default {
        name: "training-deck",
        props: ['userId', 'deckId'],
        data() {
            return {
                cards: [],
                needCards: [],
                flag: false,
                index: 0
            };
        },
        methods: {
            succes(){
                if(this.index + 1 == this.needCards.length){
                    window.location.href = '/deck/' + this.userId + "/" + this.deckId;
                }
                var card = this.needCards[this.index];
                card.rate 

                this.index++;
                this.flag = false;

            },
            miss(){
                if(this.index + 1 == this.needCards.length){
                    window.location.href = '/deck/' + this.userId + "/" + this.deckId;
                }
                this.index++;
                this.flag = false;
            },
            updateCard(card) {
                var data = {
                    name: card.name,
                    translate: card.translate,
                    rate: card.rate
                };
                http
                    .post("/updateCard/" + card.id, data)
                    .then(() => { 
                        
                    })
                    .catch(e => {
                        console.log(e);
                    });
                this.submitted = true;
            },
            getCards() {
                http
                    .get("/cards/")
                    .then(response => { // запрос выполнен успешно
                        this.cards = response.data;
                        this.getNeedCard(this.cards);
                    })
                    .catch(e => { // запрос выполнен с ошибкой
                        console.log(e);
                    });
            },
            getNeedCard(cards) {
                const sortedCards = cards
                    .sort((a, b) => a.rate - b.rate);
                
                const lowestRateCards = sortedCards.slice(0, 3);
                
                const randomCards = this.getRandomCards(sortedCards, 2);
                
                this.needCards = randomCards.concat(lowestRateCards)
                    console.log(this.needCards);
            },
            getRandomCards(cards, count) {
                count = Math.min(count, cards.length);
                const shuffledCards = cards.slice().sort(() => Math.random() - 0.5);
                return shuffledCards.slice(0, count);
            },
            showTranslate(){
                this.flag = true
            }
        },
        mounted() { // загружаем данные учебной дисциплины
            this.getCards();
        }
    }
</script>

<style>
.pool{
    margin-top: 40%;
}
.game{
    text-align: center;
}
.show{
    margin-top: 20px;
}
.bar{
    margin-top: 20px;
}
</style>