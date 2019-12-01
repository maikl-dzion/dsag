<template>
    <div class="inputSelectContainer" >
        <!--<pre>{{itemJson}}</pre>-->
        <table class="x-form-trigger-wrap" cellpadding="0" cellspacing="0" style="width: 100%; table-layout: fixed;" >
            <tbody>
                <tr>
                    <td class="x-form-trigger-input-cell" style="width: 100%;" >

                        <div class="x-hide-display x-form-data-hidden" role="presentation" ></div>
                        <input type="text" v-model="_selectValue"
                               @focus="open()"
                               class="x-form-field1 x-form-required-field1 x-form-text1 x-trigger-noedit1
                                      x-form-focus1 x-field-form-focus1 x-field-default-form-focus1 inputSelectTextValue"
                               autocomplete="off" name="raion"
                               data-errorqtip="" style="width: 100%; cursor:pointer; background: #C6DFC6; border:1px grey solid; padding-left:4px;" >
                    </td>

                    <td valign="top" class=" x-trigger-cell x-unselectable" style="width:17px;">
                        <div @click="open()" class="x-form-trigger1 inputSelectOpenButton" role="button" style="border:1px grey solid; cursor:pointer; background: url(http://bolderfest.ru/img/yeds/select-button.gif)" ></div>
                    </td>
                </tr>

                <!------ start -------->
                <!----- DataList ------>
                <tr><td rowspan="2" >
                    <div :id="divListId" class="x-boundlist1
                                                x-boundlist-floating1
                                                x-layer1
                                                x-boundlist-default1
                                                x-border-box1
                                                inputSelectOptionContainer"
                          style="z-index: 9999; width: 100%; height: 300px; display: none" tabindex="-1">
                          <div class="x-boundlist-list-ct1 x-unselectable1" style="overflow: auto; height: 299px;">
                                <ul class="x-list-plain1 selectDataListBox" style="text-align: left;">
                                    <li v-for="(item, i) in  items" :key="item[valueName]"
                                        @click="setValue(item)"
                                        role="option"
                                        unselectable="on"
                                        class="x-boundlist-item1" >
                                        {{item[valueName]}}
                                    </li>
                                </ul>
                          </div>
                    </div>
                </td></tr>
                <!------ DataList ----->
                <!------ /end --------->

            </tbody>
        </table>

    </div>
</template>

<script>
    export default {
        name: "SelectComponent",
        props: ['items', 'label',
                'item_id', 'item_value', 
                'name_id', 'name_value'],

        data: function () {
            var idName = 'id';
            var valueName = 'name';
            var itemJson =  { id : '', value : '' };
            // var params = this.v1;
            if(this.item_id) itemJson.id = this.item_id;
            if(this.item_value) itemJson.value = this.item_value;

            if(this.name_id) idName = this.name_id;
            if(this.name_value) valueName = this.name_value;

            return {
                divListId : '',
                selectedValue : '',
                selectedId : '',
                idName,
                valueName,
                itemJson
            }
        },

        created() {
             this.divListId = 'select-list-id-' + this.getRandomNum(); 
        },

        computed: {

            _selectValue() {

                for(var i in this.items) {
                    var curId = this.items[i][this.idName];
                    if(curId == this.item_id) {
                        var curValue = this.items[i][this.valueName];
                        this.selectedValue = curValue;
                        this.selectedId = this.item_id
                    }
                }

                this.itemJson.id = this.selectedId;
                this.itemJson.value = this.selectedValue;

                return this.selectedValue;
            },
        },

        methods: {

            getRandomNum(){
                //var id = Math.random() + Math.random() + Math.random();
                var rand = Math.floor((Math.random() * 999) + 1);
                return rand;
            },

            open() {
                // const selectClassName  = 'inputSelectOptionContainer';
                const selector = '#' + this.divListId;
                var selectElem = document.querySelector(selector);
                selectElem.style.display = 'block';
            },

            setValue(item) {
                this.itemJson.value = item[this.valueName];
                this.itemJson.id    = item[this.idName];
                this.$emit('emit_select_values', this.itemJson);
            },
        },
    }
</script>

<style scoped>

    .x-boundlist-floating1 {
        border-top-width: 0;
    }

    .x-boundlist1 {
        border-width: 1px;
        border-style: solid;
        border-color: #98c0f4;
        background: white;
    }
    .x-layer1 {
        position: absolute!important;
        overflow: hidden;
        zoom: 1;
    }
    .x-border-box1, .x-border-box1 * {
        box-sizing: border-box;
        -moz-box-sizing: border-box;
        -ms-box-sizing: border-box;
        -webkit-box-sizing: border-box;
    }

    .x-form-trigger-wrap1 {
        vertical-align: top;
        border-collapse: separate;
    }
    table {
        border-collapse: collapse;
    }

    .x-boundlist-item1 {
        padding: 0 3px;
        line-height: 20px;
        cursor: pointer;
        cursor: hand;
        position: relative;
        zoom: 1;
        border-width: 1px;
        border-style: dotted;
        border-color: white;
    }

    .x-form-trigger1 {
        height: 23px;
    }

    .x-form-trigger1 {
        width: 17px;
        border-width: 0 0 1px;
        border-color: #b5b8c8;
        border-style: solid;
    }
    .x-form-trigger1 {
        cursor: pointer;
        overflow: hidden;
        background-repeat: no-repeat;
    }


    .x-list-plain1 {
        list-style-type: none;
        margin: 0;
        padding: 0;
    }

    .inputSelectContainer {
        width:100%;
    }

    .selectDataListBox li:hover {
        background-color: #e4f3ff;
        border: 1px gainsboro solid;
    }


</style>