<template>
     <v-layout row justify-center style="margin:0px; padding:0px; height: 100%; border:0px red solid;" >
        <div style="margin:0px; padding:0px; height: 100%; width: 100%;" >
            <div style="background: #D6D3CE; height: 100%; width: 100%;">

                <div class="v-toolbar__content"
                     style="height: 25px; padding: 5px; background: #08246B; color:white;">АСУ ЕДС.АРМ Дежурного помощника Губернатора</div>

                <div class="v-toolbar__content" style="display:flex; height: 25px; padding: 5px; background: #D6D3CE; border:0px red solid;">
                    <div>
                        <button class="bt-top">Сервис</button>
                        <button class="bt-top">Карточки обращений</button>
                        <button class="bt-top">Экстренные сообщения</button>
                        <button class="bt-top">Документы</button>
                        <button class="bt-top">Справка</button>
                    </div>
                    <div style="margin-left: auto;" ></div>
                </div>

                <div class="workspace-row resizable-y workspace-top"
                    style="line-height: 1.4; display: flex; padding:2px; margin:3px 3px 3px 3px; background: cadetblue; border:0px grey solid;" >

                    <!-- ПОКАЗЫВАЕМ КАТЕГОРИИ -->
                    <div class="float-left resizable-x full-height leftWindow"
                         style="width:18%; background: white; padding:3px; border:0px red solid;" >
                         <CategoryList/>
                    </div>

                    <!-- ПОКАЗЫВАЕМ СПИСОК СООБЩЕНИЙ -->
                    <div class="float-left full-height rightWindow"
                         style="width:82%; background: white; padding:3px 3px 3px 8px; border:0px red solid;">
                        <MessagesList/>
                    </div>

                </div>

                <!-- ПОКАЗЫВАЕМ СООБЩЕНИЕ -->
                <div class="workspace-bottom workspace-row" >
                    <div v-if="messageShowFlag" class="float-left full-height" style="width:100%; padding:10px; margin-bottom:20px; overflow: scroll" >
                         <ShowMessage
                              :item="message"
                              :performers = "performers"
                         ></ShowMessage>
                    </div>
                </div>

            </div>
        </div>

    </v-layout>
</template>

<script>
    import DsagMixin from '../mixins/DsagMixin';
    // import Http from '../services/http';

    import CategoryList from "../components/dsag/CategoryList";
    import MessagesList from "../components/dsag/MessagesList";
    import ShowMessage  from "../components/dsag/ShowMessage";

    export default {
        name: "DsagPage",
        mixins: [DsagMixin],
        data() {
            return {
                message: {},
                performers : [],
                messageShowFlag: false,
            }
        },

        mounted() {
            this.implementWorkspaceResizing();
            this.getEventGlobalBusOn('select-message', this.getMessage);
        },

        methods: {

            getMessage(item) {
                this.getPerformerItems(item.id).then(this.getResponsePerformers);
                this.message = item;
                this.messageShowFlag = true;
            },

            getResponsePerformers(resp) {
                this.performers   = resp.result;
            },

            closeMessage() {
                this.messageShowFlag = false;
                this.message = {};
            },

        }, //--- methods

        components: {
            CategoryList,
            MessagesList,
            ShowMessage,
        },

    }
</script>


<style>

    .v-card__text {
        padding:2px;
    }

    .table-edit-mode {
        margin-top: 0;
        padding-top: 0;
        flex: none;
    }

    .table-edit-mode label {
        margin-bottom: 0 !important;
    }

    .table-edit-mode .v-input__slot {
        margin-bottom: 0 !important;
    }

    .table-edit-mode .v-messages {
        display: none !important;
    }

    .table-edit-mode:after {
        font-size: 16px;
        content: 'Ред.';
    }

    .bt-top {
        margin: 0px 10px 0px 0px;
    }

    .bt-top:hover {
        color: green;
    }

    .btn-control {
        border-radius: 0px;
        background: #D6D3CE;
        padding: 0px 3px 0px 3px;
        margin: 0px 2px 0px 2px;
        font-size: 14px;
    }

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
