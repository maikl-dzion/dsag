<template><div>
    <!--<pre>{{renderActionsData}}</pre>-->
    <div class="myFlexClass" style="border:1px grey solid; margin:2px; padding:2px;">

        <div style="width:39%" >
            <v-select
                    @change="sortActions('acts', 'actId')"
                    v-model="actId"
                    :items="prop_actions"
                    item-text="name"
                    item-value="id"
                    dense
                    label="Действию"
            ></v-select>
        </div>

        <div style="width:39%; margin-left:auto" >
            <v-select
                    @change="sortActions('orgs', 'orgId')"
                    v-model="orgId"
                    :items="prop_orgs"
                    item-text="name"
                    item-value="id"
                    dense
                    label="Исполнителю"
            ></v-select>
        </div>

    </div>

    <div style="width:100% ; margin-right:0px; " >
        <table class="performersTable" >

            <tr>
                <th style="width:20%"><div style="width:100%;">
                    Дата / время
                </div></th>
                <!--<th style="width:14%"><div style="width:100%">-->
                    <!--Канал-->
                <!--</div></th>-->
                <th style="width:14%"><div style="width:100%">
                    Дежурный
                </div></th>
                <th style="width:2%"><div style="width:100%">
                    Тип работ
                </div></th>
                <th style="width:20%"><div style="width:100%">
                    Исполнитель
                </div></th>
            </tr>

            <tbody >
                <tr v-for="(item, i) in renderActionsData"
                    @click="showWorkNote(item)" style="cursor:pointer" >

                    <td style="width:40%"><div style="width:100%; text-align:left; ">
                        {{item.date}}
                    </div></td>
                    <td style="width:14%"><div style="width:100%">
                        {{item.operator}}
                    </div></td>
                    <td style="width:14%"><div style="width:100%">
                        {{item.work_name}}
                    </div></td>
                    <!--<td style="width:2%"><div style="width:100%">-->
                        <!--{{item.control}}-->
                    <!--</div></td>-->
                    <td style="width:20%"><div style="width:100%">
                        {{item.perform_name}}
                    </div></td>

                </tr>
            </tbody>

        </table>
    </div>

    <div class="my-divider" ></div>

    <div class="formLabelClass" >Подробное описание произведенных работ</div>
    <div class="myFlexClass" >
        <div style="width:100% ; margin-right:0px; " >
            <textarea class="inputTextClass" style="width:100%; padding:4px;" v-html="workNote" ></textarea>
        </div>
    </div>

</div></template>

<script>
import MessageEditMixin from "../../mixins/MessageEdit";
export default {
    name: "ProtocolActionsTab",
    mixins: [MessageEditMixin],
    props: ['message_id', 'prop_actions', 'prop_orgs'],
    data() {
        return {
            workNote : '',
            orgId : 0,
            actId : 0,
            allItems : [],
            protocolActionData : [],

        }
    },

    computed: {
        // Получаем действия по протоколу
        renderActionsData() {
            //var messageId = this.message_id;
            // this.getProtocolActionsData(messageId).then(this.respProtocolActions);
            let data = this.localStoreInit(this.message_id);
            if(!data) {
                this.loadProtocolActionsData();
            }
            else {
                this.protocolActionData = data;
            }
            return this.protocolActionData;
        },

    },

    created() {
        // Получаем все сервисы
        this.getServices().then(this.responseServices);

    },

    methods: {

        respProtocolActions(resp) {
            var items = resp.result;
            for(var i in items) {

                let value = items[i].work_type;
                value = this.findArr(this.protocolActions, value, 'id', 'name');
                items[i]['work_name'] = value;

                value = items[i].perform_id;
                value = this.findArr(this.performersOrg, value, 'id', 'name');
                items[i]['perform_name'] = value;
            }

            this.localStoreInit(this.message_id, 'set', items);
            this.protocolActionData = items;
        },

        loadProtocolActionsData() {
            var messageId = this.message_id;
            this.getProtocolActionsData(messageId).then(this.respProtocolActions);
        },

        showWorkNote(item) {
           this.workNote = item.work_note;
        },

        sortActions(type, name) {

            let data = this.localStoreInit(this.message_id);
            let id = this[name];
            var items = [];
            var fname = '';
            switch(type) {
                case 'orgs' :
                    fname = 'perform_id';
                    break;
                case 'acts' :
                    fname = 'work_type';
                    break;
            }

            for(var i in data) {
                if(data[i][fname] == id) {
                    items.push(data[i]);
                }
            }

            this.protocolActionData = items;
        },

    }, //--- methods
}
</script>

<style scoped>

    .formHeader {
        height: 28px; display: flex; margin: 0px 0px 3px 0px; padding: 2px 2px 2px 4px; border: 0px solid grey;
    }

    .performersTable {
        width: 100%;
    }

    .performersTable td,
    .performersTable th {
        border: 1px grey solid;
        text-align: center;
        padding: 2px;
        font-size: 12px;
        margin: 0px;
        padding: 2px;
        color: black;
    }

    .performersTable td {
        padding: 0px 2px 0px 2px;
        background: #c6dfc6;
    }

    .performersTable td:hover {
        background: lightgrey;
    }

    .performOrgList {
    }

    .performOrgList:hover {
        color: darkblue;
    }

    .perform-tr {
    }

    .perform-tr:hover {
        background: green;
    }

    .formLabelClass {
        font-style: italic;
        color: #1867c0;
        text-align: left;
        font-size:13px;
    }

    .globalInputsClass {
        margin: 0px;
        padding: 0px;
        border: 0px red solid;
    }

    .localChexbock {
        height: 26px;
        width: 26px;
    }

    /*.myInpClass div{*/
    /*margin:0px !important;*/
    /*padding: 0px !important;*/
    /*}*/

    .inputTextClass {
        border: 1px grey solid;
        width: 100%;
        background: #c6dfc6;
        padding: 2px;
        box-shadow: inset 2px 2px 5px rgba(154, 147, 140, 0.5),
        1px 1px 5px rgba(255, 255, 255, 1);
    }

    .customButtonClass {
        border: 1px grey solid;
        padding: 4px;
        margin: 0px;
        color: black;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    }

    .v-card__text {
        padding: 4px;
    }

    .v-dialog__content {
        align-items: normal;
    }

    .buttonsContainer {
        display: flex;
    }

    .tabsActionButton {
        cursor: pointer !important;
        margin: 0px !important;
        /* border-radius: 0px !important; */
        color: black !important;
        background: white;
        width: 25%;
        border: 1px grey solid;
        border-bottom: 0px grey solid;
        /* border-radius: 0px 12px 0px 0px !important; */
        font-size: 12px;
        font-weight: bold;
        text-align: center;
    }

    .tabsActionButton:hover {
        background: gainsboro;
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

    .form-group label {
        /*override bootstrap material*/
        top: 0;
        font-size: 1rem;
        font-weight: 500;
        color: inherit;
    }

    .m-header div {
        border: 1px grey solid;
        margin: 0.5px;
        padding: 2px 4px 2px 4px;
        width: 20%;
        color: black;
        text-align: center;
        background: white;
        font-weight: bold;
    }

    .fieldsetClass {
        border:1px grey solid; padding:10px;
    }

    .legendClass {
        font-size:16px; color:black; padding:0px 10px 0px 10px; width: 80px;
    }

    .mini-btn {
        cursor:pointer; padding:0px; height:28px; margin:0px 0px 0px 2px;
    }

    .performSelectBox {
        width:50%;
        position:absolute;
        top: 4%;
        left:50%;
        background: none;
        border:0px grey solid;
        padding:0px;
        min-height: 200px;
        z-index:333;
    }

</style>