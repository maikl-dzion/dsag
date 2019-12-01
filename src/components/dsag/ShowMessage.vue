<template ><div>

    <v-tabs v-model="tabSwitch" background-color="transparent" style="margin:0px; padding:0px;" >
        <v-tab>Назначенные исполнители</v-tab>
        <v-tab>Содержание обращения</v-tab>
    </v-tabs>

    <v-tabs-items v-model="tabSwitch" style="margin:0px; padding:0px;" >

        <v-tab-item style="margin:0px; padding:0px;" ><v-card flat style="margin:0px; padding:0px;" ><v-card-text >

            <table class="performersTable" >
                <tr>

                    <th style="width:30%"><div style="width:100%;">
                        Исполнитель
                    </div></th>
                    <th style="width:6%"><div style="width:100%">
                        Плановый срок
                    </div></th>
                    <th style="width:10%"><div style="width:100%">
                        Дата исполнения
                    </div></th>
                    <th style="width:30%"><div style="width:100%">
                        Выполненные работы
                    </div></th>

                </tr>

                <tbody >
                <tr v-for="(v) in performItems" :key="v.performName" >
                    <td style="width:30%"><div style="width:100%; text-align:left; ">
                        {{v.performName}}
                    </div></td>
                    <td style="width:6%"><div style="width:100%">
                        {{v.term}}
                    </div></td>
                    <td style="width:10%"><div style="width:100%">
                        {{v.date_exec}}
                    </div></td>
                    <td style="width:30%"><div style="width:100%" v-text="v.done_works"></div></td>
                </tr>
                </tbody>
            </table>

        </v-card-text></v-card>

        </v-tab-item>
        <v-tab-item><v-card flat>

            <v-card-text style="border-top:1px gainsboro solid; padding:10px 4px;" >{{message.prop}}</v-card-text>

        </v-card></v-tab-item>

    </v-tabs-items>

</div></template>

<script>

    import DsagMixin from '../../mixins/DsagMixin';

    export default {
        props : ['item', 'performers'],
        mixins: [DsagMixin],
        name  : "ShowMessage",
        data() {
            return {
                message   : {},
                tabSwitch : null,
                // performers : [],
            }
        },

        computed: {

           getMessage() {
               this.message = this.item;
               return this.message;
           },

           performItems() {
               return this.performers;
           },
        },

        methods : {

        },   // methods

        mounted() {}
    }
</script>

<style scoped>

    .performersTable {
        width: 100%;
    }

    .performersTable td,
    .performersTable th {
        border: 1px grey solid;
        text-align: center;
        font-size: 12px;
        margin: 0px;
        padding: 2px;
        color: black;
    }

</style>