<template>
    <div class="workspace-inner full-height" >

        <div class="block-toolbar" style="border: 0px gainsboro solid; padding:2px; background: #D6D3CE;">
            <button class="btn-control"
                    title="Обновить обращения"
                    @click="receiveMessages()" >
                <i class="material-icons">sync</i>Обновить
            </button>

            <button class="btn-control"
                    title="Добавить"
                    @click="addModalOpen">
                <i class="material-icons">add</i> Добавить
            </button>

            <button class="btn-control"
                    title="Удалить"
                    @click="deleteMessage">
                <i class="material-icons">remove</i> Удалить
            </button>

            <button class="btn-control"
                    title="Удалить"
                    @click="quickFilterClear">
                <i class="material-icons">delete</i>Очистить фильтры
            </button>

            <button class="btn-control"
                    title="Удалить"
                    @click="toggleTableFieldsInit">
                <i class="material-icons">sort</i>Настроить поля таблицы
            </button>

            <button class="btn-control"
                    title="Удалить"
                    @click="toggleGlobalFiltersInit">
                <i class="material-icons">search</i>Фильтры
            </button>
        </div>

        <!-- Модальное окно для включения / отключения полей таблицы -->
        <div v-if="setTabFieldsFlag" class="tableFieldsFiltered">
            <ul style="list-style: none;">
                <li v-for="header in headers" style="cursor:pointer; border-bottom:1px ghostwhite solid"
                    :key="header.fieldName"
                    @click="setTableHeaderState(header)">
                    <i v-if="header.state" class="material-icons" style="color:#3f51b5">check_box</i>
                    <i v-else="header.state" class="material-icons"
                       style="color:darkred">indeterminate_check_box</i>{{header.label}}
                </li>
            </ul>
        </div>

        <!-- MESSAGES DATA CONTAINER -->
        <div>
            <table
                v-show="messageList.length" cellspacing="0" cellpadding="0"
                class="table-contrast table-fixed table-interactive" style="font-size: 12px; color: black;">
                <!-- Заголовок таблицы -->
                <thead><tr>
                        <th class="sticky-table-header" style="width: 25px">&nbsp</th> <!-- picture column -->
                        <template v-for="header in headers">
                            <th v-if="header.state"
                                :key="header.fieldName"
                                :style="`width:${header.width}`"
                                class="sticky-table-header resizable-x"
                                @click="sortTableColumn(header.fieldName)">
                                    <span class="col-header">{{header.label}}</span>
                                    <span class="fas fa-filter" hidden></span>
                            </th>
                        </template>
                </tr></thead>

                <!-- Поисковые поля таблицы -->
                <tr>
                    <td class="" style="width: 25px; height: 23px;">
                        <i class="material-icons btn-control" style="margin:0px; padding:0px;">image_search</i>
                    </td>
                    <td v-for="header in headers" :key="header.fieldName" v-if="header.state"
                        style="padding:0px; height: 23px;" >
                         <input class="messagesFilterInput" @input="quickFilteringStart($event, header)" />
                    </td>
                </tr>

                <!-- Данные таблицы -->
                <template v-for="message in showMessagesList">
                    <tr :key="message[idName]" :id="message[idName]"
                        @dblclick="editModalOpen(message)"
                        @click="selectItem(message, $event);"
                        :class="{'tableRowMessage' : true, 'messageActiveControl': message.control}" >

                        <td style="width: 15px !important;">
                            <img :src="getIconSrc('message-icon.bmp')" style="margin:0px;">
                        </td>

                        <template v-for="header in headers" >
                            <td :key="header.fieldName" v-if="header.state" >
                                <span>{{message[header.fieldName]}}</span>
                            </td>
                        </template>
                    </tr>
                </template>

            </table>

            <!-- Если нет данных выводим заголовок таблицы -->
            <div v-show="!messageList.length" class="block-overlay">
                <table class="table-contrast table-fixed table-interactive" style="font-size: 12px; color: black;">
                    <thead><tr>
                        <th class="sticky-table-header" style="width:25px">&nbsp;</th>
                        <th v-for="header in headers" :key="header.fieldName" v-if="header.state" class="sticky-table-header" >
                            <span class="col-header">{{header.label}}</span>
                        </th>
                    </tr></thead>
                </table><h3 style="text-align:center; margin-top: 10%; font-style: italic; font-weight: bold ">Нет данных</h3>

            </div>

        </div><!-- / MESSAGE DATA CONTAINER -->

        <!-- МОДАЛЬНОЕ ОКНО ДЛЯ ДОБАВЛЕНИЯ / РЕДАКТИРОВАНИЯ ДАННЫХ -->
        <template>
            <v-dialog v-model="openDialog" style="">
                <v-card style="margin:0px; padding:0px; border:0px red solid;">
                    <MessageEdit
                        @after_save_event="afterSaveEvent"
                        :item="itemMessage"
                        :perform_data="messagePerformData"
                    ></MessageEdit>
                </v-card>
            </v-dialog>
        </template>

        <!-- МОДАЛЬНОЕ ОКНО ДЛЯ ГЛОБАЛЬНЫХ ФИЛЬТРОВ -->
        <template>
            <div v-if="globalFiltersFlag">
                <div class="globalFilterContainer">
                    <FiltersComponent></FiltersComponent>
                </div>
                <div @click="globalFiltersFlag = false"
                     style="position: fixed; top:2px; left:0px;background: grey; width: 100%; height: 100%; z-index: 9999; opacity: 0.5">
                </div>
            </div>
        </template>

    </div>
</template>

<script>

    import DsagMixin from '../../mixins/DsagMixin';
    import MessageEdit from '../../components/dsag/MessageEdit';
    import FiltersComponent from '../../components/dsag/FiltersComponent';
    // import Tabs from '../tmp/TabsComponent';
    // import VuetifyDialog from '../components/VuetifyDialog';

    export default {
        name: "MessagesList",
        mixins: [DsagMixin],
        components: {MessageEdit, FiltersComponent},
        data() {
            var headers = [
                {state: true, fieldName: 'id', label: '№', width: '14px'},
                {state: true, fieldName: 'category_name', label: 'Категория', width: '100px'},
                {state: true, fieldName: 'date', label: 'Дата / Время', width: '100px'},
                {state: true, fieldName: 'prop', label: 'Характеристика', width: '120px'},
                {state: true, fieldName: 'phone', label: 'Телефон', width: '65px'},
                {state: true, fieldName: 'addr', label: 'Адрес', width: '65px'},
                {state: true, fieldName: 'district_name', label: 'Район', width: '65px'},
                {state: true, fieldName: 'operator', label: 'Дежурный', width: '65px'},
                {state: true, fieldName: 'control', label: 'Контроль', width: '25px'},
                {state: true, fieldName: 'control_date', label: 'Дата контроля', width: '65px'},
                {state: true, fieldName: 'sender', label: 'Отправитель', width: '65px'},
            ];

            return {
                idName : 'id',
                headers,
                messageList: [],
                saveType: 'edit',
                openDialog: false,
                // filters: {},
                itemMessage: {},
                messagePerformData : [],
                curCategoryId : 0,

                // istrict: [],
                messageFilters: {},

                setTabFieldsFlag: false,
                globalFiltersFlag: false,
            }
        },

        created() {
            // Получаем все сервисы
            this.getServices().then(this.responseServices);

            // получить все сообщения
            this.receiveMessages();

            // Запускаем модальное окно при разработке
            var loc = this.localStoreInit('message_data_list');
            this.editModalOpen(loc[0]);
        },

        computed: {
            showMessagesList() {
                for(var i in this.messageList) {
                    let id = this.messageList[i].district_id;
                    let districtName = '';
                    for(var x in this.districtList) {
                        if(id == this.districtList[x].id) {
                            districtName = this.districtList[x].name;
                            break;
                        }
                    }
                    this.messageList[i].district_name = districtName;
                }
                return this.messageList;
            },
        },

        methods: {

            // Получаем сообщения
            receiveMessages(categoryId = 0) {
                this.getMessagesList(categoryId).then(resp => {
                    const messages = resp.result;
                    this.messageList = messages;
                    this.localStoreInit('message_data_list', 'set', messages);
                });
            },

            toggleTableFieldsInit() {
                this.setTabFieldsFlag = this.toggleParam(this.setTabFieldsFlag);
            },

            toggleGlobalFiltersInit(){
                this.globalFiltersFlag = this.toggleParam(this.globalFiltersFlag);
            },

            // изменяем заголовки таблицы
            setTableHeaderState(header) {
                var fname = header.fieldName;
                var state = header.state;
                (state) ? state = false : state = true;
                for (var i in this.headers) {
                    if (this.headers[i].fieldName == fname)
                        this.headers[i].state = state;
                }
            },

            // сортируем поле таблицы
            sortTableColumn(fieldName) {

            },

            // быстрая фильрация
            quickFilteringStart(event, header) {
                var fieldName = header.fieldName;
                var elem = event.target;
                var searchValue = elem.value;
                this.messageFilters[fieldName] = searchValue;
                this.quickFilteringRender();
            },

            quickFilteringRender() {
                var arr = [];
                var localStoreData = this.localStoreInit('message_data_list');
                var items = Object.assign({}, localStoreData);
                var filters = this.messageFilters;
                for (var fname in filters) {
                    var filterValue = filters[fname];
                    arr = [];
                    for (var i in items) {
                        var item = items[i];
                        if (item[fname]) {
                            if (item[fname].indexOf(filterValue) != -1) {
                                arr.push(item);
                            }
                        }
                    }
                    items = arr;
                }
                this.messageList = arr;
            },

            quickFilterClear() {
                this.messageList = this.localStoreInit('message_data_list');
            },
            //  end быстрая фильтрация

            getIconSrc(icon) {
                let iconUrl = this.$root.imgUrl + '/' + icon;
                return iconUrl;
            },

            // двойной клик -> открываем модальное окно редактирования
            editModalOpen(item) {
                this.saveType   = 'edit';
                this.openDialog = true;
                const messageId = item[this.idName];
                this.itemMessage = item;
                this.getPerformerItems(messageId, resp => {
                    this.messagePerformData = resp.result;
                });
            },

            // открываем модальное окно для добавления нового сообщения
            addModalOpen() {
                this.saveType   = 'add';
                this.openDialog = true;
                this.getServices().then(resp => {
                    var services = resp.result;
                    var newMessage = services['message_model'];
                    for (var fName in newMessage)
                        newMessage[fName] = '';
                    this.itemMessage = newMessage;
                });
            },

            // удаляем сообщение
            deleteMessage() {
                if(!this.itemMessage[this.idName]) {
                    alert('Не выбран елемент для удаления');
                    return false;
                }
                const messageId = this.itemMessage[this.idName];
                const url = '/DsagController/deleteMessage/' + messageId;
                this.makeRequest('get', url).then(resp => {
                    this.receiveMessages();
                    alert('Сообщение успешно удалено');
                });
            },

            // действия после сохранение
            afterSaveEvent(resp) {
                this.saveType   = '';
                this.openDialog = false;
                this.receiveMessages();
                alert('Успешное сохранение');
            },

            // клик по сообщению
            selectItem(message, e) {
                this.itemMessage = message;
                var activeClass = 'trMessageActive';
                elemSelectedAction('.' + activeClass, (el) => {
                    el.classList.remove(activeClass);
                });
                var elem = e.currentTarget;
                elem.classList.add(activeClass);
                this.setEventGlobalBus('select-message', message);
            },

            // кликнули по меню категории
            selectCategoryMessages(categoryItem) {
                let id = categoryItem.id;
                this.curCategoryId = id;
                this.receiveMessages(id);
            },

            implementTableResizing() {
                const MIN_ROW_WIDTH = 20;
                const table = this.$el;
                const afterBegin = '<div style="position: fixed; width: 100%; height: 100%; z-index: 10000; cursor: col-resize"></div>';

                table.querySelectorAll('th.resizable-x').forEach(el => {
                    let dragStripe = document.createElement('div');
                    dragStripe.className = 'drag-stripe-x';

                    dragStripe.onmousedown = e => {
                        document.body.insertAdjacentHTML('afterbegin', afterBegin);

                        const startX = e.pageX,
                            startWidth = el.offsetWidth,
                            tableStartWidth = table.offsetWidth;

                        document.onmousemove = e => {
                            const shift = e.pageX - startX;
                            if (shift < -startWidth + MIN_ROW_WIDTH) return;

                            el.style.width = startWidth + shift + 'px';
                            table.style.width = tableStartWidth + shift + 'px';
                        };

                        document.onmouseup = () => {
                            document.onmousemove = document.onmouseup = null;
                            document.body.removeChild(document.body.firstChild);
                        };
                        return false;
                    };
                    el.appendChild(dragStripe);
                });
            },

        },  // Methods

        mounted() {

            this.implementTableResizing();

            //--- Получаем текущую категорию (кликнули по меню категории)
            this.getEventGlobalBusOn('select-category-messages', this.selectCategoryMessages);

        },  // Mounted()

    }
</script>

<style scoped >

    .globalFilterContainer {
        position: fixed; z-index: 9999999;
        border:0px red solid; margin:0px auto 0px auto; top: 10%;
        left: 10%; right: 10%; background: white; padding:10px;
    }

    .trMessageControlField {
        background: #FFD7D6 !important;
    }

    .trMessageActive {
        background: rgba(0, 128, 128, .43) !important;
    }

    .table-contrast tbody tr:nth-child(even) {
        background-color: none;
    }

    /** Строка данных таблицы **/
    .tableRowMessage {

    }

    .tableRowMessage:hover {
       color:red;
       cursor:pointer;
    }

    .messageActiveControl {
        background: #FFD7D6;
    }

    .v-dialog__content {
        align-items: baseline;
    }

    .col-header {
        cursor: pointer;
        position: relative;
        padding-left: 9px;
        opacity: .7;
        user-select: none;
    }

    .col-header.filtered {
        opacity: 1;
    }

    .col-header.filtered:after {
        content: '';
        position: absolute;
        left: -2px;
        top: 50%;
        margin-top: -2px;
        height: 0;
        width: 0;
    }

    .col-header.filtered.asc:after {
        border-right: 4px solid transparent;
        border-left: 4px solid transparent;
        border-bottom: 4px solid rgba(0, 0, 0, .87);
    }

    .col-header.filtered.desc:after {
        border-right: 4px solid transparent;
        border-left: 4px solid transparent;
        border-top: 4px solid rgba(0, 0, 0, .87);
    }

    .col-filter-form {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #fff;
        z-index: 200;

        input {
            height: 100%;
            padding-left: 3px;
            padding-right: 3px;
            background-color: #fff;
        }
    }

    th {
        text-align: center;
        cursor: pointer;

        .far {
            color: teal;
            vertical-align: bottom;
            cursor: pointer;
        }
    }

    .fa-filter {
        position: absolute;
        left: 4px;
        bottom: 0;
        color: #cc0000;
        font-size: 8px;
        z-index: 150;
    }

    .table-contrast td, .table-contrast th {
        border: 1px grey solid;
    }

    .table-contrast tr:hover {
        background: #ededed;
    }

    .tableFieldsFiltered {
        position: fixed;
        z-index: 9999999;
        background: white;
        margin: 5px 0px 0px 3px;
        padding: 0px 10px;
        width: 160px;
        box-shadow: 1px 1px 13px 1px rgba(0, 0, 0, 0.61);
        -webkit-box-shadow: 1px 1px 13px 1px rgba(0, 0, 0, 0.61);
        -moz-box-shadow: 1px 1px 13px 1px rgba(0, 0, 0, 0.61);
    }

    .messagesFilterInput {
        width:100%; height: 23px; border: 1px grey solid;
        background: #c6dfc6; padding: 2px;
        box-shadow: inset 2px 2px 5px rgba(154, 147, 140, 0.5), 1px 1px 5px rgba(255, 255, 255, 1);
    }

</style>
