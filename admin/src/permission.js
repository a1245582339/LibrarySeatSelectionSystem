import router from './router'
import {
    getToken,
    removeToken
} from './utils/auth'
import store from './store'
import message from 'iview/src/components/message'
import Vue from 'vue'


const whiteList = ['/login', '/register'] // 不重定向白名单

router.beforeEach((to, from, next) => {
    if (getToken() && getToken() != 'undefined') {
        if (to.path === '/login') {
            next({
                path: '/main'
            })
        } else {
            store.commit('SET_TOKEN', getToken())
            store.dispatch('GET_INFO').then(() => {
                next()
            }).catch(err => {
                message.error('token失效');
                removeToken()
                next({
                    path: '/login'
                });
            })
        }
    } else {
        if (whiteList.indexOf(to.path) !== -1) {
            next();
        } else {
            next({path: '/login'});
        }
    }
})