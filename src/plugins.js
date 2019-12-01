import CategoryTree     from "./components/dsag/CategoryTree";
import SelectComponent  from "./components/SelectComponent";
import SearchComponent  from "./components/SearchComponent";
import CustomDatepicker from "./components/DatepickerComponent";

// import TabsPanelVuetify from "./components/TabsPanelVuetify";
// import ModalComponent  from "./components/ModalComponent";
// import {Datepicker, Timepicker, DatetimePicker} from '@livelybone/vue-datepicker';

const MyPlugin = {

    install(Vue, options) {

        Vue.component('category-tree'      , CategoryTree);
        Vue.component('select-component'   , SelectComponent);
        Vue.component('search-component'   , SearchComponent);
        Vue.component('custom-datepicker'  , CustomDatepicker);
        // Vue.component('tabs-panel-vuetify' , TabsPanelVuetify);

        // Vue.component('modal-component', ModalComponent);
        // Vue.component('select-component', SelectComponent);

        //---- Глобальная примесь
        Vue.mixin({
            data: function() {
               return {

               }
            },
            methods: {

            },
        }); // --- mixixn
    } // --- install
}; // --- MyPlugin

export default MyPlugin;
