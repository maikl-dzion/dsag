<template>
    <div class="inputSelectContainer" >
        <!--<pre>{{itemJson}}</pre>-->
        <table class="x-form-trigger-wrap1" cellpadding="0" cellspacing="0" style="width: 100%; table-layout: fixed;" >
            <tr>
                <td class="x-form-trigger-input-cell" style="width: 100%;" >

                    <div class="x-hide-display x-form-data-hidden" role="presentation" ></div>
                    <input type="text" v-model="itemJson.value"
                           class="inputSelectTextValue"
                           autocomplete="off" name="raion"
                           data-errorqtip="" style="width: 100%; cursor:pointer; background: #C6DFC6; border:1px grey solid;" >
                </td>
            </tr>

            <tr><td>
                <div  class="x-boundlist1 x-boundlist-floating1
                             x-layer x-boundlist-default1 x-border-box1
                             inputSelectOptionContainer"
                      style="position: absolute;z-index: 9999; width: 100%; height: 300px; display: block" tabindex="-1">
                      <div class="x-boundlist-list-ct1 x-unselectable1" style="overflow: auto; height: 299px;">
                            <ul class="x-list-plain1 selectDataListBox" >
                                <li v-for="(item, i) in  items"
                                    @click="setValue(item)" class="x-boundlist-item1" >
                                    {{item[valueName]}}
                                </li>
                            </ul>
                      </div>
                </div>
            </td></tr>
        </table>

    </div>
</template>

<script>
    export default {
        name: "SearchComponent",
        props: ['name_id', 'name_value', 'type', 'items'],

        data: function () {
            var idName = 'id';
            var valueName = 'name';
            var itemJson =  { id : '', value : '' };

            if(this.name_id) idName = this.name_id;
            if(this.name_value) valueName = this.name_value;

            return {
                selectedValue : '',
                selectedId : '',
                idName,
                valueName,
                itemJson
            }
        },

        computed: {

        },

        methods: {

            open() {
                const selectClassName  = 'inputSelectOptionContainer';
                var selectElem = document.querySelector('.' + selectClassName);
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