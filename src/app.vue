<template><v-app >
    <v-content>
        <v-container fluid  class="app-wrapper" >
            <router-view></router-view>
        </v-container>
    </v-content>
</v-app></template>

<script>
export default {
    data() { return { }},
    methods: {

        logout() {
            this.makeRequest('post', 'Auth/logout')
                .then(() => {
                    this.$store.commit('CLEAR_USER_ID');
                    location.hash = '#/login';
                }).catch(err => console.log(err));
        },

    },
}
</script>

<style scoped lang="scss">
  .app-wrapper {
      margin:0px; padding:0px; height: 100%; border:0px green solid;
  }
</style>

<style lang="scss" >
    @import "assets/css/style.css";
    @import "assets/css/app.scss";
    @import "assets/css/resize.css";
    @import "assets/css/media.css";
</style>
