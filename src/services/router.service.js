import Vue from 'vue';
import Router from 'vue-router';
import Items from '@/components/items/ItemsPage';
import Item from '@/components/item/ItemPage';
import Config from '@/components/config/ConfigPage';
import LoginPage from '@/components/auth/LoginPage';

Vue.use(Router);

const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Items',
            component: Items
        },
        {
            path: '/item/:id',
            name: 'Item',
            component: Item
        },
        {
            path: '/config',
            name: 'Config',
            component: Config
        },
        {
            path: '/login',
            component: LoginPage
        },
        {
            path: '*',
            redirect: '/'
        }
    ]
});

router.beforeEach((to, from, next) => {
    const publicPages = ['/login'];
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = localStorage.getItem('user');

    if (authRequired && !loggedIn) {
        return next({
            path: '/login',
            query: {returnUrl: to.path}
        });
    }

    next();
});

export default router;
