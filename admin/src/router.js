import Vue from 'vue';
import Router from 'vue-router';
import Login from './views/Login';

Vue.use(Router);

export default new Router({
  routes: [{
      path: '/',
      redirect: '/main'
    },
    {
      path: '/404',
      name: '404',
      component: () =>
      import('./views/error-page/404'),
    },
    {
      path: '/401',
      name: '401',
      component: () =>
      import('./views/error-page/401'),
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/main',
      component: () =>
        import('./views/Main'), 
      children: [
        {
          path: '/',
          redirect: 'home',
        },
        {
          path: 'home',
          name: 'home',
          component: () => import('./views/content/home'), 
        },
        {
          path: 'situation',
          name: 'situation',
          component: () => import('./views/content/situation'), 
        },
        {
          path: 'edit',
          name: 'edit',
          component: () => import('./views/content/editSeat'), 
        }
      ]
    },
    {
      path: '*',
      component: () =>
      import('./views/error-page/404'),
    },
  ],
});