<template>
    <div class="col-md-5">
        <h4 class="mx-auto mt-4">sign in</h4>
        <form name="form" @submit="handleLogin">
            <div class="form-group">
                <input type="text" class="form-control" name="username" placeholder="Логин" v-model="user.username" required/>
            </div>
            <div class="form-group">
                <input type="password" class="form-control" name="password" placeholder="Пароль" v-model="user.password" required/>
            </div>
            <div class="form-group">
                <button class="btn btn-primary" :disabled="loading">
                    <span v-show="loading" class="spinner-border spinner-border-sm"></span>
                    <span>Войти</span>
                </button>
            </div>
            <router-link to="/register">
                Зарегистрироваться
            </router-link>
            <div class="form-group">
                <div v-if="message" class="alert alert-danger" role="alert">{{message}}</div>
            </div>
        </form>
    </div>
</template>
<script>
    export default {
        name: 'LoginUser',
        data() {
            return {
                user: {
                    username: "",
                    password: ""
                },
                loading: false,
                message: ''
            };
        },
        computed: { // вычисляемые свойства
            loggedIn() {
                return this.$store.state.auth.status.loggedIn; // $store - локальное хранилище
            },
            currentUser() {
                return this.$store.state.auth.user;
            }
        },
        created() {
            if (this.loggedIn) {
                // Авторизация прошла успешно, переходим к главной странице.
                // Используем такую конструкцию, а не this.$router.push, так как требуется перезагрузить страницу для обновления локального хранилища
                window.location.href = '/MyDecks/' + this.currentUser.id;
            }
        },
        methods: {
            handleLogin(e) {
                e.preventDefault();
                this.loading = true;
                this.$store.dispatch("auth/login", this.user) // обращаемся к методу login, который определён в auth.service.js
                    .then(() => {
                        window.location.href = '/MyDecks/' + this.currentUser.id; // авторизация прошла успешно, переходим к главной странице. Используем такую конструкцию, а не this.$router.push, так как требуется перезагрузить страницу для обновления локального хранилища
                    })
                    .catch(e => {
                            this.loading = false;
                            this.message = e.response.data.message;
                        }
                    );
            }
        }
    };
</script>