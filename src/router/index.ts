import { createRouter, createWebHistory } from 'vue-router'
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import { TokenViewModel } from '../viewmodels/Token'
import axios from '../plugins/axios';
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'main',
      component: () => import("../layouts/Layouts.vue"),
      redirect: "/auth/login",
      children: [
        {
          path: "dashboard",
          component: () => import("../views/dashboard/DashboardView.vue"),
          meta: { requiresAuth: true },
        },
        {
          path: "categories",
          component: () => import("../views/categories/CategoriesView.vue")
        },
        {
          path: "masters",
          // name:"masters",
          component: () => import("../views/masters/MastersView.vue")
        },
        {
          path: 'users',
          component: () => import("../views/users/UsersView.vue")
        },
        {
          path: '/skills',
          name: 'skillsDetails',
          component: () => import('../views/Skills/SkillView.vue'), // Replace with your actual component
        },
        {
          path: '/skills/:id',
          name: 'skillsDetail',
          component: () => import('../views/Skills/SkillView.vue'), // Replace with your actual component
          props: (route) => ({ id: route.query.id }),
        },
        {
          path: '/posts',
          name: 'posts',
          component: () => import("../views/Posts/PostView.vue"),
        },
        {
          path: '/posts/:id',
          name: 'post',
          component: () => import("../views/Posts/PostView.vue"),
          props: true
        },
        {
          path: "settings",
          component: () => import("../views/settings/SettingsView.vue")
        }

      ]
    },
    {
      path: "/auth",
      component: () => import("../layouts/AuthLsyout.vue"),
      redirect: "/auth/login",
      children: [
        {
          path: "login",
          component: () => import("../views/auth/Login.vue")
        }
      ]
    },
  ]
})

router.beforeEach(async (to, from, next) => {
  const isRouteValid = to.matched.length > 0;
  if(isRouteValid){
    const token = Cookies.get('access_token');
    if (to.path !== '/auth/login') {
      if (token) {
        try {
          // Serverdan foydalanuvchi rolini olish
          const response = await axios.get('/api/identity', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          
          if (response.status === 200 && response.data.identityRole === 'Admin') {
            next();
          } else {
            next("/");
          }
        } catch (error) {
          console.error(error);
          next('/auth/login');
        }
      } else {
        next('/auth/login');
      }
    } else {
      Cookies.remove('access_token');
      next();
    }
  }
  else{
    next('/')
  }
});

export default router
