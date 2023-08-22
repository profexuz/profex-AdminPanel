<script lang="ts">
import { defineComponent} from 'vue';
import { CategoryViewModel } from '@/viewmodels/CategoryViewModels';
import IconCreate from '@/components/icons/interface/IconCreate.vue';
import CategorySkeletonComponent from "@/components/categories/CategorySkeletonComponent.vue";
import CategoryViewComponent from "@/components/categories/CategoryViewComponent.vue";
import axios from '@/plugins/axios'
import { useI18n } from 'vue-i18n';


export default defineComponent({
    components:{
        CategoryViewComponent, CategorySkeletonComponent,
        IconCreate
    },
    methods:{
        async getDataAsync(){
            this.isLoaded = false;
            var response = await axios.get<CategoryViewModel[]>("/api/common/category");
            this.isLoaded=true;
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
<nav class="flex mb-5" aria-label="Breadcrumb">
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
    </nav>
    <!--end:: BreadCrumb-->
    <div class="flex w-100 justify-end">
        <button data-modal-target="defaultModal" data-modal-toggle="defaultModal" type="button" class="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
            <div class="flex flex-wrap items-center">
                <IconCreate></IconCreate>
                <p class="mx-2">{{ $t("create") }}</p>
            </div>
        </button>
    </div>



  <!-- Main modal -->
    <div id="defaultModal" tabindex="-1" aria-hidden="true" class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
        <div class="relative w-full max-w-2xl max-h-full">
            <!-- Modal content -->
            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <!-- Modal header -->
                <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                    <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                        Category Create
                    </h3>
                    <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="defaultModal">
                        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                        <span class="sr-only">Close modal</span>
                    </button>
                </div>
                <!-- Modal body -->
                <div class="p-6 space-y-6">
                    <form>
                        <div class="mb-6">
                            <label  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                            <input type="text"  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                        </div>
                        <div class="mb-6">
                            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                            <textarea id="message" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" ></textarea>
                        </div>

                    </form>
                </div>
                <!-- Modal footer -->
                <div class="flex justify-end p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                    <button data-modal-hide="defaultModal" type="button" class="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Create</button>
                </div>
            </div>
        </div>
    </div>

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
