<template>
<v-card color="basil" >

    <!--<v-card-title class="text-center justify-center py-6">-->
        <!--<slot name="header_info" >-->
            <!--header_info-->
        <!--</slot>-->
        <!--<div class="font-weight-bold display-3 basil&#45;&#45;text">Редактирование</div>-->
    <!--</v-card-title>-->

    <v-card-title class="headline grey lighten-2" primary-title
                  style="margin:0px; padding:0px 0px 0px 4px; background: #08246B !important; color:white;">
                  <h6 class="text-xs-center" style="padding:1px 1px 0px 10px"> Карточка обращения </h6>
    </v-card-title>

    <v-card-text><pre><slot name="pre_slot"></slot></pre></v-card-text>

    <v-card-text>
         <slot name="header_info">

         </slot>
    </v-card-text>

    <v-tabs v-model="tab"
            background-color="deep-purple accent-4" color="basil"
            centered dark  grow >
            <template v-for="(item, i) in tabItems" >
                <v-tab :key="item.name" class="tabs-action-button"
                       :href="'#' + tabName + i" >
                    {{item.title}}
                </v-tab>
            </template>
    </v-tabs>

    <v-tabs-items v-model="tab"  >
        <template v-for="(item, i) in tabItems" >
        <v-tab-item :key="item.name" class="tabs-content-box"
                :value="tabName + i" >
                <v-card flat color="basil" class="PanelsContainer" >
                    <v-card-text class="TabsPanelList" >
                        <slot :name="item.name" >
                            {{defaultText}}
                        </slot>
                        <!--<div class="PanelsContainer" >-->
                            <!--<div class="TabsPanelList" >-->
                            <!--<slot :name="item.name" >-->
                                <!--{{defaultText}}-->
                            <!--</slot>-->
                        <!--</div></div>-->
                    </v-card-text>
                </v-card>
        </v-tab-item>
        </template>
    </v-tabs-items>

    <v-card-actions>
        <slot name="actions_button">

        </slot>
    </v-card-actions>

</v-card>
</template>

<script>
    export default {
        props : ['tab_items'],
        data () {
            const tabName = 'tab-panel-';
            const firstTab = tabName + '0';
            return {
                tabName,
                tab: firstTab,
                defaultText: 'def',
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
        /*background-color: #FFFBE6 !important;*/
        background: rgb(214, 211, 206);
    }
    .basil--text {
        color: #356859 !important;
    }

    .tabs-action-button {

    }

    .tabs-content-box {
       text-align: center;
       padding:3px;
       border: 1px grey solid;
    }

    .v-tabs__item {
        border: 1px gainsboro solid !important;
    }

    .PanelsContainer {
        min-height: 150px;
    }

    .TabsPanelList {
        border: 0px grey solid;
        margin-top: 0px;
        color: black;
        padding: 3px;
        /*border-style:groove;*/
    }
</style>