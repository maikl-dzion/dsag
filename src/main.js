import Vue from 'vue';

import Resource from 'vue-resource';
Vue.use(Resource);

import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.css'
Vue.use(Vuetify);

// import VueSweetalert2 from 'vue-sweetalert2';
// Vue.use(VueSweetalert2);

// import VueMaterial from 'vue-material'
// import 'vue-material/dist/vue-material.min.css'
// Vue.use(VueMaterial)

import Store   from './store/store'
import Router  from './routes';
import Plugins from './plugins';
import App     from './app.vue';
Vue.use(Plugins);

window.onerror = function (msg, url, line, col, error) {
    console.log({'title':'WindowError', msg, url, line, col, error});
    console.log('<==' + msg + '==>');
}

Vue.config.errorHandler = function (err, vm, info) {
    console.log({'title':'Vue.config::errorHandler', err, vm, info });
    console.log('<==' + err + '==>');
}

Vue.config.warnHandler = function (msg, vm, trace) {
    console.log({'title':'Vue.config::warnHandler', msg, vm, trace});
    console.log('<==' + msg + '==>');
}

// var errorFlag = true;
// errorHandlerShow();

const EventGlobalBus = new Vue();

new Vue({
    el    : '#app',
    // mixins: [MetaMixin, Http],
    // vuetify: new Vuetify({theme: { dark: true },}),
    data  : {
        EventGlobalBus: EventGlobalBus,
        imgUrl : imgUrl,
    },
    store : Store,
    router: Router,
    render: h => h(App)
});



