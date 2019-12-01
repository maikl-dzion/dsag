<template ><div class="formMessageEditBox" @click="dialogListiner($event)" >
<TabsMessageEdit :tab_items="tabItems" style="min-height:90%;" >

     <!--<template slot="pre_slot" >{{getPerformData}}</template>-->

    <!--@@@ Заголовок формы-->
    <template slot="header_info" >
        <div class="formHeader" >
            <div style="margin:0px 15px 0px 5px; color:blue; font-weight: bold">Запись № {{getFormData[idName]}}</div>
            <div style="width:10%; margin:0px 10px 0px 0px; padding:0px;">
                <div class="form-group">
                    <input type="checkbox" class="checkbox" id="yes_edit" v-model="getFormData.control">
                    <label for="yes_edit" style="color:red;">Контроль</label>
                </div>
            </div>
            <div style="display: flex; margin:0px 3px 0px 3px; border: 1px grey solid; padding:0px 2px 2px 2px;">
                <div class="formLabelClass" style="padding:0px 2px 0px 2px"> Снято </div>
                <div style="margin:0px 0px 0px 0px;">
                    <input class="inputTextClass" type="text" style="height:100%; background: darkgrey" disabled /><br/>
                </div>
                <div>
                    <input value="00:00" class="inputTextClass" type="time"
                           style="width:100%; height:100%; background: darkgrey" disabled/>
                </div>
            </div>
            <div style="width:30%; padding:0px 4px 0px 4px; margin:0px 10px 0px auto; background: ghostwhite; color:black">
                {{getFormData.operator}}
            </div>
        </div>
    </template>

    <!-- @@@ Панель адресной информации  -->
    <template slot="address_info" >

        <div class="myFlexClass" >
            <div style="width:30%;" >
                <v-select
                    v-model="getFormData.district_id"
                    :items="districtList"
                    item-text="name"
                    item-value="id"
                    dense
                    label="Район"
                ></v-select>
            </div>
            <!--<div class="formLabelClass" >Район</div>-->
            <!--<select v-model="getFormData.district_id" >-->
                <!--<option v-for="option in district" :value="option.id">-->
                    <!--{{option.name}}-->
                <!--</option>-->
            <!--</select>-->
        </div>

        <div class="myFlexClass" >

            <!-- Заявитель -->
            <fieldset class="fieldsetClass" style="width:55%;">
                <legend class="legendClass" >Заявитель</legend>
                <div class="formLabelClass" >Имя</div>
                <input v-model="getFormData.resident" class="inputTextClass" type="text" />
                <div class="myFlexClass" >
                    <div style="width:60%; margin-right:5px; cursor:pointer" >
                        <v-autocomplete
                                label="Поиск заявителя по БД жителей"
                                v-model="getFormData.resident"
                                :items="residentUsers"
                                item-text="name"
                                item-value="name"
                                clearable
                                hide-details
                                hide-selected
                        ></v-autocomplete>

                        <!--<button @click="findResident" class="customButtonClass btn-control"-->
                                <!--style="width:100%;" >-->
                                <!--<i class="material-icons">account_box</i>-->
                                <!--Поиск заявителя по БД жителей-->
                        <!--</button>-->

                        <!--<search-component-->
                                <!--v-if="findResidentState"-->
                                <!--:items="residentUsers"-->
                                <!--name_id="id"-->
                                <!--name_value="name"-->
                                <!--@emit_select_values="v => { getFormData.resident = v.value }">-->
                        <!--</search-component>-->

                    </div>
                    <button class="customButtonClass" style="width:40%; color:grey;" disabled>
                        Телефоны жителя
                    </button>
                </div>

                <div class="my-divider" ></div>

                <div class="formLabelClass" >Телефон</div>
                <div class="myFlexClass" >
                    <div style="width: 45%;">
                        <input v-model="getFormData.phone" class="inputTextClass" type="text" style="width:100%;"/>
                    </div>
                    <button class="customButtonClass btn-control" style="width:30%; margin:0px 3px 0px 3px;" >Найти адрес</button>
                    <button class="customButtonClass" style="width:25%; color:grey;" disabled>
                        Привязать тел.
                    </button>
                </div>

                <div class="my-divider" ></div>

                <div class="formLabelClass" >Адрес</div>
                <input v-model="getFormData.addr" class="inputTextClass" type="text" style="width:100%;"/>
                <div class="myFlexClass" >

                    <v-autocomplete
                            label="Задать адрес"
                            v-model="getFormData.addr"
                            :items="addressList"
                            item-text="name"
                            item-value="name"
                            clearable
                            hide-details
                            hide-selected
                    ></v-autocomplete>

                    <!--<button @click="findAddress" class="customButtonClass btn-control" style="width:60%;">-->
                        <!--<i class="material-icons" style="">search</i> Задать адрес-->
                    <!--</button>-->

                    <button class="customButtonClass btn-control" style="width:40%;">
                        Копировать адрес <i class="material-icons" style="">arrow_forward</i>
                    </button>
                </div>

                <!--<search-component-->
                        <!--v-if="findAddressState"-->
                        <!--:items="addressList"-->
                        <!--name_id="id"-->
                        <!--name_value="name"-->
                        <!--@emit_select_values="v => { getFormData.addr = v.value }">-->
                <!--</search-component>-->

                <div class="my-divider" ></div>

                <div class="myFlexClass" >
                    <button class="customButtonClass" style="width:60%;color:grey" disabled>Телефоны по адресу</button>
                    <button class="customButtonClass" style="width:40%;color:grey" disabled>Показать на карте</button>
                </div>

                <div class="myFlexClass" >
                    <button class="customButtonClass" style="width:60%;color:grey" disabled>
                        Привязать телефон к адресу
                    </button>
                </div>

            </fieldset>

            <!-- Происшествие -->
            <fieldset class="fieldsetClass" style="margin-left:10px; width:54%;" >
                <legend class="legendClass" >Происшествие</legend>
                <textarea style="min-height: 190px; width:100%;padding:4px;">{{getFormData.prop}}</textarea>

                <div class="formLabelClass"> Адрес </div>
                <input class="inputTextClass" type="text" style="width:100%;"/>
                <div class="myFlexClass" >

                    <button class="customButtonClass btn-control" style="width:60%; margin-right:4px;">
                        <i class="material-icons" style="">arrow_back</i> Копировать адрес
                    </button>

                    <button class="customButtonClass btn-control" style="width:40%;">
                        <i class="material-icons" style="">search</i> Задать адрес
                    </button>

                </div>

                <div class="myFlexClass" >
                    <button class="customButtonClass btn-control" style="width:60%; margin-right:4px;" disabled>
                        Показать на карте
                    </button>
                    <button class="customButtonClass btn-control" style="width:40%;">
                        Нанести значок
                    </button>
                </div>

            </fieldset>

        </div>

    </template>

    <!--@@@ Панель характеристик сообщения  -->
    <template  slot="props_info" >

        <div class="myFlexClass" >
            <div class="myFlexClass" >
                <div class="formLabelClass">Дата обращения</div>
                <div style="margin:0px 4px 0px 4px;" >
                    <input class="inputTextClass" type="text" style="height:25px;"
                           @click="dateState.create = true" v-model="getFormData.date" ><br>
                    <v-date-picker
                        v-if="dateState.create"
                        v-model="getFormData.date"
                        @input="dateState.create = false"
                        no-title scrollable locale="ru"
                        style="margin-top:1px; position:absolute; z-index:999; display: block;" >
                    </v-date-picker>
                </div>

                <div>
                    <input value="14:34" class="inputTextClass" type="time" style="width:100%; height:25px;"/>
                </div>
            </div>

            <div class="myFlexClass" style="margin-left:auto;">
                <div class="formLabelClass"> Дата контроля </div>
                <div style="margin:0px 4px 0px 4px;" >
                    <input class="inputTextClass"  type="text" style="height:25px;"
                           @click="dateState.control = true" v-model="formData.control_date" /><br/>

                    <v-date-picker
                            v-if="dateState.control"
                            v-model="formData.control_date"
                            @input="dateState.control = false"
                            no-title scrollable locale="ru"
                            style="position:absolute;z-index:999; margin-left:-34px; display: block;"
                    ></v-date-picker>
                </div>
            </div>

        </div>

        <div class="my-divider" ></div>

        <!--<div class="formLabelClass" >Категория обращения</div>-->
        <div class="myFlexClass" >

            <div style="width:40%" >
                <v-select
                        v-model="getFormData.cat_id"
                        :items="categoryList"
                        item-text="name_max"
                        item-value="id"
                        dense
                        label="Категория обращения"
                ></v-select>
            </div>

            <!--<select-component-->
                    <!--style="min-width:100px; width:55%;"-->
                    <!--:items="selectCategories"-->
                    <!--:item_id="getFormData.cat_id"-->
                    <!--item_value=""-->
                    <!--name_id="id"-->
                    <!--name_value="name_max"-->
                    <!--@emit_select_values="v => { getFormData.cat_id = v.id }">-->
            <!--</select-component>-->

            <div style="width:40%; margin-left:auto" >
                <button class="customButtonClass btn-control" style="width:100%" >
                    <i class="material-icons">view_list</i> Категории
                </button>
            </div>
        </div>

        <div class="my-divider" ></div>

        <div class="myFlexClass" >
            <div class="formLabelClass" >Характеристика</div>
            <div class="myFlexClass" style="width:55%; margin-left:auto;" >
                <div class="formLabelClass " style="margin-left:auto; margin-right:10px;"> Прикрепленные документы </div>

                <div class="customButtonClass btn-control mini-btn" style="" >
                    <i class="material-icons" style="color:blue">reply</i>
                </div>
                <div class="customButtonClass btn-control mini-btn" >
                    <i class="material-icons" style="color:blue">add</i>
                </div>
                <div class="customButtonClass btn-control mini-btn" >
                    <i class="material-icons" style="color:blue">keyboard_arrow_down</i>
                </div>
                <div class="customButtonClass btn-control mini-btn" >
                    <i class="material-icons" style="color:blue">create</i>
                </div>
            </div>
        </div>

        <div class="myFlexClass" style="margin-top:5px;" >

            <div style="width:90% ; margin-right:10px; " >
                <textarea v-model="getFormData.prop" class="inputTextClass" style="width:100%; padding:4px;" ></textarea>
            </div>

            <div class="customButtonClass btn-control" style="width:10%; cursor:pointer; text-align:center; height: 34px; ">
                <i class="material-icons" style="color:blue">dynamic_feed</i>
            </div>
        </div>

        <div class="my-divider" ></div>

        <div class="myFlexClass" style="margin-top:5px;" >

            <div style="width:90%; margin-right:10px;" >

                <!-- Модальная формы выбора исполнителей -->
                <div v-if="stateFlags.perform" class="performSelectBox"  >
                    <v-card class="mx-auto" style="background: aliceblue; border:1px grey solid; padding:4px;" >
                        <v-card-text >
                            <div style="display: flex;" >
                                <div><h5 style="font-style:italic">Исполнители</h5></div>
                                <div style="margin-left:auto;" >
                                    <i @click="openPerformOrgs" class="material-icons" style="color:red; cursor:pointer">clear</i>
                                </div>
                            </div><hr>

                            <div class="text--primary" >
                                <div v-for="item in performersOrg" class="performOrgList"
                                     @click="addPerformOrg(item)"
                                     style="cursor:pointer; border-bottom:1px grey solid" >
                                     {{item.name}}
                                </div>
                            </div>
                        </v-card-text>
                    </v-card>
                </div>

                <table class="performersTable" >
                    <tr><th style="width:40%"><div style="width:100%;">Исполнитель</div></th>
                        <th style="width:14%"><div style="width:100%" >Дата отправки</div></th>
                        <th style="width:5%" ><div style="width:100%" >Прочтено</div></th>
                        <th style="width:2%" ><div style="width:100%" >К</div></th>
                        <th style="width:20%"><div style="width:100%" >Дата выполнения</div></th>
                    </tr>

                    <tbody >
                    <template v-for="(item, i) in getPerformData" >
                        <tr v-if="getFormData.id == item.mess_id"
                            @click="getPerformItem($event, item)" class="perform-tr" >

                            <td style="width:40%"><div style="width:100%; text-align:left; ">
                                {{item.performName}}
                            </div></td>

                            <td style="width:14%"><div style="width:100%">
                                <!--<input v-model="v.date" class="inputTextClass" type="text" >-->
                                <custom-datepicker
                                    :name="i"
                                    :value="item.date"
                                    @change_date="performDate"
                                ></custom-datepicker>
                                </div></td>

                                <td style="width:5%"><div style="width:100%">
                                    <v-checkbox v-model="item.read" class="globalInputsClass localChexbock" ></v-checkbox>
                                </div></td>

                                <td style="width:2%"><div style="width:100%">
                                    <v-checkbox v-model="item.control" class="globalInputsClass localChexbock" ></v-checkbox>
                                </div></td>

                                <td style="width:20%"><div style="width:100%">
                                    <custom-datepicker
                                        :name="i"
                                        :value="item.date_exec"
                                        @change_date="performDateExec"
                                    ></custom-datepicker>
                            </div></td>

                        </tr>
                    </template>
                    </tbody>
                </table>

            </div>

            <div style="width:10%;" >
                <div @click="openPerformOrgs" class="customButtonClass btn-control"
                     style="width:100%; cursor:pointer; text-align:center; height: 34px; ">
                     <i class="material-icons" style="color:blue">add</i>
                </div>
                <div class="customButtonClass btn-control"
                    style="width:100%; cursor:pointer; text-align:center; height: 34px; ">
                    <i class="material-icons" style="color:blue">playlist_play</i>
                </div>
                <div class="customButtonClass btn-control"
                     style="width:100%; cursor:pointer; text-align:center; height: 34px; ">
                    <i class="material-icons" style="color:red">clear</i>
                </div>
            </div>

        </div>

        <div class="my-divider" ></div>

        <div class="formLabelClass" > Работы выполненые исполнителем </div>
        <div class="myFlexClass" >
            <div style="width:90% ; margin-right:10px; " >
                <textarea class="inputTextClass" style="width:100%; padding:4px;" v-html="doneWorksContent"></textarea>
            </div>

            <div class="customButtonClass btn-control" style="width:10%; cursor:pointer; text-align:center; height: 34px; ">
                <i class="material-icons" style="color:blue">dynamic_feed</i>
            </div>
        </div>

    </template>
    <!--@@@ Панель сервисной информации  -->
    <template  slot="service_info" >
        Не используется
    </template>
    <!--@@@ Панель протокола действий    -->
    <template  slot="protocol_actions" >

        <ProtocolActionsTab
            :prop_actions="protocolActions"
            :prop_orgs="performersOrg"
            :message_id="formData[idName]"
        ></ProtocolActionsTab>

        <!--<div class="myFlexClass" style="border:1px grey solid; margin:2px; padding:2px;">-->

            <!--<div style="width:100px;font-weight: bold;">-->
                <!--Фильтр по ...-->
            <!--</div>-->

            <!--v-model="getFormData.district_id"-->
            <!--<div style="width:39%" >-->
                <!--<v-select-->
                        <!--:items="protocolActions"-->
                        <!--item-text="name"-->
                        <!--item-value="id"-->
                        <!--dense-->
                        <!--label="Действию"-->
                <!--&gt;</v-select>-->
            <!--</div>-->

            <!--<div style="width:39%; margin-left:auto" >-->
                <!--<v-select-->
                        <!--:items="performersOrg"-->
                        <!--item-text="name"-->
                        <!--item-value="id"-->
                        <!--dense-->
                        <!--label="Исполнителю"-->
                <!--&gt;</v-select>-->
            <!--</div>-->

            <!--<div class="formLabelClass">Действию:</div>-->
            <!--<select-component-->
                    <!--style="width:38%; margin:0px 10px 0px 5px;"-->
                    <!--:items="protocolActions"-->
                    <!--item_id="0"-->
                    <!--name_id="id"-->
                    <!--name_value="name"-->
                    <!--@emit_select_values="v => { }">-->
            <!--</select-component>-->

            <!--<div class="formLabelClass">Исполнителю:</div>-->
            <!--<select-component-->
                    <!--style="width:38%; margin:0px 2px 0px 5px;"-->
                    <!--:items="performersOrg"-->
                    <!--item_id="0"-->
                    <!--name_id="id"-->
                    <!--name_value="name"-->
                    <!--@emit_select_values="v => {}">-->
            <!--</select-component>-->

        <!--</div>-->

        <!--<div style="width:100% ; margin-right:0px; " >-->
            <!--<table class="performersTable" >-->

                <!--<tr>-->
                    <!--<th style="width:20%"><div style="width:100%;">-->
                        <!--Дата / время-->
                    <!--</div></th>-->
                    <!--<th style="width:14%"><div style="width:100%">-->
                        <!--Канал-->
                    <!--</div></th>-->
                    <!--<th style="width:14%"><div style="width:100%">-->
                        <!--Дежурный-->
                    <!--</div></th>-->
                    <!--<th style="width:2%"><div style="width:100%">-->
                        <!--Тип работ-->
                    <!--</div></th>-->
                    <!--<th style="width:20%"><div style="width:100%">-->
                        <!--Исполнитель-->
                    <!--</div></th>-->
                <!--</tr>-->

                <!--<tbody >-->
                    <!--<tr v-for="(item, i) in getPerformData" >-->
                        <!--<td style="width:40%"><div style="width:100%; text-align:left; ">-->
                            <!--{{item.performName}}-->
                        <!--</div></td>-->
                        <!--<td style="width:14%"><div style="width:100%">-->
                            <!--{{item.date}}-->
                        <!--</div></td>-->
                        <!--<td style="width:14%"><div style="width:100%">-->
                            <!--{{item.read}}-->
                        <!--</div></td>-->
                        <!--<td style="width:2%"><div style="width:100%">-->
                            <!--{{item.control}}-->
                        <!--</div></td>-->
                        <!--<td style="width:20%"><div style="width:100%">-->
                            <!--{{item.date_exec}}-->
                        <!--</div></td>-->
                    <!--</tr>-->
                <!--</tbody>-->

            <!--</table>-->
        <!--</div>-->

        <!--<div class="my-divider" ></div>-->

        <!--<div class="formLabelClass" >Подробное описание произведенных работ</div>-->
        <!--<div class="myFlexClass" >-->
            <!--<div style="width:100% ; margin-right:0px; " >-->
                <!--<textarea class="inputTextClass" style="width:100%; padding:4px;" ></textarea>-->
            <!--</div>-->
        <!--</div>-->

    </template>

    <!--@@@ Кнопки сохранения / отмены  -->
    <template  slot="actions_button" >
        <div style="display: flex" >
            <v-btn @click.stop="mx_toggleDialog('showEditTreeItemDialog', false)">Отменить изменения</v-btn>
            <v-btn @click.stop="mx_toggleDialog('showEditTreeItemDialog', false)">Создать документ</v-btn>
            <v-btn @click="save" type="submit" form="update-item-form" color="teal" dark>Сохранить</v-btn>
            <v-btn @click.stop="mx_toggleDialog('showEditTreeItemDialog', false)">Отмена</v-btn>
        </div>
    </template>

</TabsMessageEdit>
</div>
</template>

<script>

import MessageEditMixin from "../../mixins/MessageEdit";
import TabsMessageEdit from "../../components/TabsMessageEdit";
import ProtocolActionsTab from "../../components/dsag/ProtocolActionsTab";

// import PropsInfo from "../../components/dsag/PropsInfo";
// import SearchComponent from "../../components/dsag/SearchComponent";
// import CustomDatepicker from "../../components/DatepickerComponent";
// import TabsTest from "../../components/tmp/TabsTest";

export default {
    name: "MessageEdit",
    props: ["item", "perform_data", "show"],
    mixins: [MessageEditMixin],
    components: {
        TabsMessageEdit,
        ProtocolActionsTab,
        // PropsInfo,
        // SearchComponent,
        // CustomDatepicker
    },
    data() {
        return {
            idName : 'id',
            formData: {},
            performData : [],
            tabItems: [
                {name: 'address_info', title: 'Адрес'},
                {name: 'props_info', title: 'Характеристики'},
                {name: 'service_info', title: 'Служебная информация'},
                {name: 'protocol_actions', title: 'Протокол действий'},
            ],
        };
    },

    computed: {

        // Получаем текущее сообщение
        getFormData() {
            this.formData = this.item;
            return this.formData;
        },

        // Получаем список исполняющих орагнизаций и выполненных работ
        getPerformData() {
            this.performData = this.perform_data;
            return this.performData;
        },

        // _formData() {
        //     this.formData = this.item;
        //     return this.formData;
        // },

        computedDateMessage() {
            return this.formatDate(this.formData.date);
        },

        computedDateControl() {
            return this.formatDate(this.formData.control_date);
        }

    },

    created() {
        // Получаем все сервисы
        this.getServices().then(this.responseServices);

        // Получаем категории
        this.getCategoryList('not-form').then(this.responseCategory);
    },

    methods: {

    },

    mounted() {
        // setTimeout(resp => {}, 10);
    }

};
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

