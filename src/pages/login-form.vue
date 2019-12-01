<template>
    <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4 mt-5>
            <v-card class="elevation-8">
                <v-toolbar dark class="content-center" color="indigo">
                    <v-toolbar-title>Авторизация</v-toolbar-title>
                    <v-spacer></v-spacer>
                </v-toolbar>
                <v-alert type="error" dismissible v-model="alert">
                    {{ error }}
                </v-alert>
                <v-card-text>
                    <form @submit.prevent="handleSignIn" id="form">
                        <v-text-field prepend-icon="person" name="login" label="Логин"
                                      type="text" v-model="login" required color="indigo">
                        </v-text-field>
                        <v-text-field prepend-icon="lock" name="pwd" label="Пароль"
                                      type="password" v-model="pwd" required color="indigo">
                        </v-text-field>
                        <v-spacer></v-spacer>
                        <p class="content-center mt-3">
                            <v-btn dark type="submit" color="indigo">Войти</v-btn>
                        </p>
                    </form>
                </v-card-text>
            </v-card>
        </v-flex>
    </v-layout>

</template>

<script>

    import Http from "../services/http";
    import MetaMixin from "../mixins/metaMixin";

    export default {
        name: "Auth",
        mixins: [Http, MetaMixin],
        data: function () {
            return {
                login: 'am',
                pwd: '1',
                error: '',
                alert: false
            }
        },

        methods: {

            handleSignIn() {
                const data = {
                  login: this.login,
                  pwd: this.pwd
                };

                this.makeRequest('post', 'Auth/authorization/', {data})
                  .then(resp => {
                    location.hash="#/"; // COMEBACK: redirect to some 'next' url
                    this.$store.commit('SET_USER_ID', resp.auth.userInfo.id);
                    this.swalSuccess({
                      title:`Успешный вход в систему`,
                      text: `Пользователь: ${resp.auth.userInfo.fio}`
                      });
                  })
                  .catch(err => {
                    if (err.status === 403) {
                      this.error = 'Указан неверный логин или пароль!';
                      this.alert = true;
                    }
                  })
            }
        }
    }
</script>

<style scoped>
    .content-center {
        display: flex;
        justify-content: center;
    }
</style>
