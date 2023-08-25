import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from "@/views/auth/Login.vue"


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'main',
      component: ()=> import("../layouts/Layouts.vue"),
      redirect:"/auth/login",
      children: [
        {
          path: "dashboard",
          component: ()=> import("../views/dashboard/DashboardView.vue")
        },
        {
          path: "categories",
          component: ()=> import("../views/categories/CategoriesView.vue")
        },
        {
          path: "masters",
          component: ()=> import("../views/masters/MastersView.vue")
        },
        {
          path: 'users',
          component: ()=> import("../views/users/UsersView.vue")
        },
        {
          path: 'skills',
          component: ()=> import("../views/skills/SkillView.vue")
        },
        {
          path: 'posts',
          component: ()=>import("../views/Posts/PostView.vue")
        },
        {
          path: "settings",
          component: ()=> import("../views/settings/SettingsView.vue")
        }

      ]
    },
    {
      path: "/auth",
      component: ()=> import("../layouts/AuthLsyout.vue"),
      redirect: "/auth/login",
      children: [
        {
          path: "login",
          component: ()=>import("../views/auth/Login.vue")
        }
      ]
    },
  ]
})

export default router
