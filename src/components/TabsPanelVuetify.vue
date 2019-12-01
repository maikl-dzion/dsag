<template>
    <v-card color="basil" >

        <v-card-title class="text-center justify-center py-6">
            <h1 class="font-weight-bold display-3 basil--text">Редактирование</h1>
        </v-card-title>

        <v-tabs v-model="tab"
                background-color="transparent" color="basil" grow >
                <v-tab  v-for="item in tabItems"
                        :key="item.name" >{{item.title}}
                </v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab">
            <v-tab-item
                 v-for="item in tabItems"
                 :key="item.name" >
                  <v-card flat color="basil" >
                        <v-card-text>
                            <slot :name="item.name" >
                                {{text}}
                            </slot>
                        </v-card-text>
                  </v-card>
            </v-tab-item>
        </v-tabs-items>

    </v-card>
</template>

<script>
    export default {
        props : ['tab_items'],
        data () {
            return {
                tab: null,
                text: '',
                // tabItems: [
                //     { name : 'address_info'    , title : 'Адрес'},
                //     { name : 'message_props'   , title : 'Характеристики'},
                //     { name : 'protocol_actions', title : 'Протокол действий'},
                // ],
            }
        },

        computed: {
            tabItems() {
               return this.tab_items;
            },
        },

        methods: {},
    }
</script>

<style scoped>
    /* Helper classes */
    .basil {
        background-color: #FFFBE6 !important;
    }
    .basil--text {
        color: #356859 !important;
    }
</style>