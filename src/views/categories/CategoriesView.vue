<script lang="ts">
import { defineComponent} from 'vue';
import { CategoryViewModel } from '@/viewmodels/CategoryViewModels';
import CategoryCreateModalComponent from '@/components/categories/CategoryCreateModalComponent.vue';
import CategorySkeletonComponent from "@/components/categories/CategorySkeletonComponent.vue";
import CategoryViewComponent from "@/components/categories/CategoryViewComponent.vue";
import axios from '@/plugins/axios'
import { useI18n } from 'vue-i18n';
import {getCookie} from "@/helpers/CookieHelper";


export default defineComponent({
    components:{
        CategoryViewComponent, 
        CategorySkeletonComponent,
        CategoryCreateModalComponent,
    },
    methods:{
        async getDataAsync(){
            this.isLoaded = false;
            const token = getCookie("access_token");
            var response = await axios.get<CategoryViewModel[]>("/api/common/categories");
            this.isLoaded=true;
            console.log(response.data);
            this.categoriesList = response.data;
        }

    },
    data() {
        return {
            categoriesList: [] as CategoryViewModel[],
            defaultSkeletons: 4 as Number,
            isLoaded: false as Boolean,
        }
    },
    setup(){
        const { t } = useI18n();
    },
    async mounted() {
        await this.getDataAsync();
    },
});
</script>

<template>

<!--begin:: BreadCrumb-->
<nav class="flex justify-between mb-5" aria-label="Breadcrumb">
      <ol class="inline-flex items-center space-x-1 md:space-x-3">
        <li class="inline-flex items-center">
          <a href="#"
            class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
              viewBox="0 0 20 20">
              <path
                d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
            </svg>
            <!-- {{ $t('home') }} -->
          </a>
        </li>
        <li>
          <div class="flex items-center">
            <svg class="w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
              viewBox="0 0 6 10">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="m1 9 4-4-4-4" />
            </svg>
            <a
              class="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white">{{
                $t('categories') }}</a>
          </div>
        </li>
      </ol>

    <!--end:: BreadCrumb-->
   
    <CategoryCreateModalComponent></CategoryCreateModalComponent>
</nav>
  <!--begin:: Categories Skeletons-->
    <ul v-show="isLoaded==false">
        <template v-for="element in defaultSkeletons">
            <CategorySkeletonComponent
                class="mt-2 mb-3">
            </CategorySkeletonComponent>
        </template>
    </ul>
    <!--end:: Categories Skeletons-->

    <!--begin:: Categories-->

    <ul v-show="isLoaded==true">
        <template v-for="element in categoriesList">
            <CategoryViewComponent
                :name=element.name
                :description=element.description
                :createdAt=element.createdAt
                :updatedAt=element.updatedAt
                :id=element.id
                class="mt-2 mb-3">
            </CategoryViewComponent>
        </template>
    </ul>
    <!--end:: Categories-->


</template>
