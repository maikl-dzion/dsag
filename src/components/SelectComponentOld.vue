<template>

    <div class="inputSelectContainer" >
        <!--<pre>{{itemJson}}</pre>-->
        <table id="edsComboRaion-1300-triggerWrap" class="x-form-trigger-wrap" cellpadding="0"
               cellspacing="0" style="width: 100%; table-layout: fixed;" >
            <tbody>
                <tr>
                    <td id="edsComboRaion-1300-inputCell" class="x-form-trigger-input-cell" style="width: 100%;" >

                        <div class="x-hide-display x-form-data-hidden" role="presentation" ></div>
                        <input type="text" v-model="_selectValue"
                               @focus="open()"
                               class="x-form-field x-form-required-field x-form-text x-trigger-noedit x-form-focus x-field-form-focus x-field-default-form-focus inputSelectTextValue"
                               autocomplete="off" name="raion"
                               data-errorqtip="" style="width: 100%; cursor:pointer; background: #C6DFC6; border:1px grey solid; padding-left:4px;" >
                    </td>

                    <td valign="top" class=" x-trigger-cell x-unselectable" style="width:17px;">
                        <div class="x-trigger-index-0 x-form-trigger x-form-arrow-trigger x-form-trigger-first inputSelectOpenButton"
                             @click="open()" role="button"
                             style="border:1px grey solid; cursor:pointer; background: url(http://bolderfest.ru/img/yeds/select-button.gif)" ></div>
                    </td>
                </tr>

                <tr><td rowspan="2" >

                    <div :id="divListId" class="x-boundlist x-boundlist-floating x-layer x-boundlist-default x-border-box inputSelectOptionContainer"
                          style="margin-top: 2px; z-index: 9999; width: 100%; height: 300px; display: none" tabindex="-1">
                          <div  class="x-boundlist-list-ct x-unselectable" style="overflow: auto; height: 299px;">
                                <ul class="x-list-plain selectDataListBox" >

                                    <li v-for="(item, i) in  items" :key="item[valueName]"
                                        @click="setValue(item)"
                                        role="option"
                                        unselectable="on"
                                        class="x-boundlist-item" >
                                        {{item[valueName]}}
                                    </li>

                                </ul>
                          </div>
                    </div>

                </td></tr>
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

    .inputSelectContainer {
        width:100%;
    }

    .selectDataListBox li:hover {
        background-color: #e4f3ff;
        border: 1px gainsboro solid;
    }
</style>