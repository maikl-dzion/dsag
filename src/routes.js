import Vue from 'vue';
import Router from 'vue-router';

// import MainDsagPage from './pages/MainDsagPage';
import DsagPage from './pages/DsagPage';

Vue.use(Router);

// роуты приложения
const routes = [
   {
        path: siteUrl + '',
        name: 'Главная',
        component: DsagPage,
    },

    {
        path: siteUrl + 'dsag-page',
        name: 'DSAG',
        component: DsagPage,
    },
];

export default new Router({
    // mode: 'history',
    routes: routes,
    activeClass: 'active'
});
