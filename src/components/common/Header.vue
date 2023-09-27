<script lang="ts">
  import ThemeSwicher from './ThemeSwicher.vue';
  import LanguageSwitcher from './LanguageSwitcher.vue';
  import { defineComponent } from "vue";
  import Cookies from 'js-cookie';
  import jwtDecode from 'jwt-decode';
  import FlowbiteSetup from '@/FlowbiteSetup.vue';
  export default defineComponent({
    components:{
      LanguageSwitcher,
      ThemeSwicher,
      FlowbiteSetup
    },
    data(){
      return{
        phone : "",
        firstName: "",
        lastName: ""
      }
    },
    watch: { 
      id:"load"
    },
    methods: {
        load() {
            const token = Cookies.get('access_token');
            const payload = jwtDecode(token);
            this.phone = payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/mobilephone"]
            this.firstName = payload['FirstName']
            this.lastName = payload['LastName']
        },
        exit(){
            Cookies.remove('access_token')
        }
    },
    mounted(){
      this.load()
    }
  })
  
</script>
<template>  
<FlowbiteSetup></FlowbiteSetup>
<nav class="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
  <div class="px-3 py-3 lg:px-5 lg:pl-3">
    <div class="flex items-center justify-between">
      <div class="flex items-center justify-start">
        <button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" class="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
            <span class="sr-only">Open sidebar</span>
            <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
               <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
            </svg>
         </button>
        <a class="flex ml-2 md:mr-24">
          <img src="../../assets/logo.png" class="h-8 mr-3" alt="FlowBite Logo" />
          <span class="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">Profex</span>
        </a>
      </div>
      <div class="flex items-center">
        <LanguageSwitcher></LanguageSwitcher>
        <ThemeSwicher></ThemeSwicher>
          <div class="flex items-center ml-3">
            <div class="relative">
              <button type="button" class="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" aria-expanded="false" data-dropdown-toggle="dropdown-user">
                <span class="top-0 left-7 absolute  w-3.5 h-3.5 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full"></span>
                <img class="w-8 h-8 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" aria-expanded="false" data-dropdown-toggle="dropdown-user" alt="profile image">
              </button>
            </div>
            <div class="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600" id="dropdown-user">
              <div class="px-4 py-3" role="none">
                <p class="text-sm text-gray-900 dark:text-white" role="none">
                  {{ firstName }} {{ lastName }}
                </p>
                <p class="text-sm font-medium text-gray-900 truncate dark:text-gray-300" role="none">
                  {{ phone }}
                </p>
              </div>
              <ul class="py-1" role="none">
                <li>
                  <RouterLink to="/">
                    <a @click="exit" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">{{ $t('exit') }}</a>
                  </RouterLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
    </div>
  </div>
</nav>
</template>



