import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    strict: true, /* remove in final build*/
    state: {
        userId: localStorage.getItem('userId'),
        userState: {
            routes: {
                Objects: {}
            }
        },
        iconsUrl: '',
        rootId: '',
        editedType: {},
        context: {},
        dialogs: {
            showGrpModal: false,
            showSelectPictDialog: false,
            showUpdateModeDialog: false,
            showEditTreeItemDialog: false,
            showEditTypeDialog: false,
            showRenumberDialog: false,
            showPickItemPage: false,
        }
    },

    mutations: {

        SET_USER_ID(state, uid) {
            localStorage.setItem('userId', uid);
            state.userId = uid;
        },

        CLEAR_USER_ID(state) {
            localStorage.removeItem('userId');
            state.userId = null;
        },

        SET_ICONS_URL(state, url) {
            state.iconsUrl = url;
        },

        SET_ROOT_ID(state, id) {
            state.rootId = id;
        },

        SET_USER_DATA(state, {route, prop, val}) {
            Vue.set(state.userState.routes[route], prop, val);
            localStorage.setItem(prop, val);
        },

        SET_EDITED_TYPE(state, type) {
            state.editedType = type;
        },

        SET_CONTEXT(state, context) {
            state.context = context;
        },

        TOGGLE_DIALOG(state, {name, show}) {
            Vue.set(state.dialogs, name, show);
        }

    },


});

