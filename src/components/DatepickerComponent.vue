<template><div class="customDatepickerClass">

    <input  v-model="_date"
            @click="open"
            @input="changeDate"
            @change="changeDate"
            class="inputTextClass inputTextClass"  type="text" /><br/>
    <v-date-picker
            v-if="showState"
            v-model="_date"
            @input="showState = false"
            @change="changeDate"
            no-title scrollable locale="ru"
            style="position:absolute; z-index:999; margin:2px 0px 0px 0px; left:0px;"
    ></v-date-picker>

</div></template>

<script>
    export default {
        props: ["value", "name"],
        data: () => ({
            _date: '',
            showState: false,
        }),

        created() {
            this._date = this.value;
        },

        computed: {
            dateValue() {
                return this._date;
            }
        },

        methods: {

            open() {
                this.showState = !this.showState;
            },

            changeDate() {
                // const date = this.dateConvert(this._date);
                const date = this._date;
                var param = { value : date, name : this.name };
                this.$emit('change_date', param);
            },

            dateConvert(date) {
                if (!date) return null;
                const [year, month, day] = date.split("-");
                return `${day}.${month}.${year}`;
            },
        },
    }
</script>

<style lang="scss" scoped>

    .customDatepickerClass {}

    .globalInputsClass {
        margin:0px;
        padding: 0px;
        border: 0px red solid;
    }

    .inputTextClass {
        border: 1px grey solid;
        width: 100%;
        background: #c6dfc6;
        padding: 2px;
        box-shadow: inset 2px 2px 5px rgba(154, 147, 140, 0.5), 1px 1px 5px rgba(255, 255, 255, 1);
    }

</style>


