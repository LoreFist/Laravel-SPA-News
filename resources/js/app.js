require('./bootstrap');

window.Vue = require('vue');
import VueRouter from 'vue-router';
window.moment = require('moment');


Vue.component('pagination', require('laravel-vue-pagination'));

window.Vue.use(VueRouter);
window.Vue.use('vue-moment');

import NewsIndex from './components/NewsIndex.vue';
import NewsCreate from './components/NewsCreate.vue';
import NewsEdit from './components/NewsEdit.vue';
import Category from './components/Category.vue';

const routes = [
    {path: '/', component: NewsIndex, name: 'NewsIndex'},
    {path: '/news/create', component: NewsCreate, name: 'createNews'},
    {path: '/news/edit/:id', component: NewsEdit, name: 'editNews'},
    {path: '/category/show/:id', component: Category, name: 'category', props: true},
]

const router = new VueRouter({routes})

const app = new Vue({router}).$mount('#app')