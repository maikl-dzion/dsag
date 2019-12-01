<template><div class="workspace-inner full-height"
        style="padding-top:5px; background: #D6EFD6; color: black;">

    <ul class="tree" style="border:0px red solid;" >
        <category-tree
            v-for="row in categoryList"
            :key="row[idName]"
            :item="row"
            :headers="headers">
        </category-tree>
    </ul>

</div></template>

<script>

    import DsagMixin from '../../mixins/DsagMixin';

    export default {
        name: "CategoryList",
        mixins: [DsagMixin],
        data() {
            return {
                idName : 'id',
                categoryList : {},
                headers: {
                    name_max  : {
                        label: 'Наименование группы',
                        width : '480px',
                        cells: []
                    },
                }
            }
        },

        created() {
            this.getCategoryList().then(resp => {
                this.categoryList = resp.result;
            });
        },

        methods: {

        },  // Methods

    }
</script>
