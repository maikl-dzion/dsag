<template><li>

    <table class="table-fixed">
        <tr class="tree-branch"
            :id="item[idName]"
            @click="selectItem" >

            <td v-for="(row, fieldName) in headers" :key="fieldName"
                :style="`width:${row.width}`"
                :class="'categoryItem ' + fieldName" style="border:0px red solid" >
                <span class="branch-name"  >
                        <span :class="{'has-children': hasChildren, open: isOpenedByDefault}"
                              @click.stop="toggleChildren">
                              <div style="margin-left:25px;" ></div>
                        </span>
                        <span :title="item[nameTitle]" v-text="item[nameTitle]" ></span>
                </span>
            </td>

        </tr>
    </table>

    <!-- БЛОК ПОКАЗА ДОЧЕРНИХ ТИПОВ -->
    <div class="js-item-children"
         v-show="isOpenedByDefault"
         v-if="item[childName]">
         <ul class="menu-tree-ul" style="margin-left:20px; list-style:none">
            <category-tree
                v-for="row in item[childName]"
                :key="row[idName]"
                :item="row"
                :headers="headers"
            ></category-tree>
         </ul>
    </div>

</li></template>

<script>

    import DsagMixin from "../../mixins/DsagMixin";

    export default {
        props: ["item", "headers"],
        mixins: [DsagMixin],
        data() {
            return {
                idName : 'id',
                nameTitle : 'name_max',
                childName : 'children',
                showChildren : false,
            };
        },

        created() {
            if(this.item[this.idName] == 1)
                this.showChildren = true;
        },

        computed: {

            hasChildren() {
                return Object.keys(this.item.children).length;
            },


            itemIconSrc() {
                let iconUrl = this.$root.imgUrl;
                let icon = iconUrl + "/category.ico";
                return icon;
            },

            isOpenedByDefault() {
                return this.showChildren && !this.isMovedItem;
            },

            isMovedItem() {
                return !!this.context &&
                    this.context.source === 'group' &&
                    this.context.dest === 'group' &&
                    this.item.id_guid === this.context.item.id_guid;
            },

            isMovedItemParent() {
                return !!this.context &&
                    this.context.source === 'group' &&
                    this.context.dest === 'group' &&
                    this.item.id_guid === this.context.item.id_parent_guid;
            },
            isCurrentOwner() {
                return !!this.context &&
                    this.context.source === 'type' &&
                    this.context.dest === 'group' &&
                    this.item.id_guid === this.mx_routes[this.route]['selectedGroupId'];
            },

            isDisabled() {
                return this.isMovedItem || this.isMovedItemParent || this.isCurrentOwner;
            },

        },

        methods: {

            toggleChildren() {
                if (!this.hasChildren || this.isMovedItem) return;
                this.showChildren  = !this.showChildren;
            },

            selectItem(e) {
                const categoryItem = this.item;
                this.setEventGlobalBus('select-category-messages', categoryItem);
                this.selectHtmlElem(e.target.closest('.tree-branch'), '.tree');
            },

        },

    }
</script>


<style scoped >

    .tree-branch {
        cursor: pointer;
    }

    .tree-branch:hover {
        background: ghostwhite;
    }

    .branch-name {
        overflow: hidden;
        display: flex;
        white-space: nowrap;
    }

    .branch-name img {
        width: 1.5rem;
        height: 1.5rem;
        margin: 0 8px 0 20px;
    }

    .has-children {
        position: relative;
    }

    .has-children:before {
        position: absolute;
        top: -3px;
        left: 5px;
        font-size: .9rem;
        color: #555;
        font-weight: 500;
        font-family: 'Font Awesome 5 Free';
        content: "\f0fe";
    }

    .has-children.open:before {
        content: '\f146'
    }

    .selected .has-children:before {
        color: #222;
    }

    [contenteditable="true"] {
        cursor: text;
        padding-right: 6px;
    }

    [contenteditable="true"]:focus {
        outline: none;
        background-color: #3a3a3a;
        color: #fff;
    }

    .disabled {
        opacity: 0.4;
        cursor: not-allowed;
    }
</style>
