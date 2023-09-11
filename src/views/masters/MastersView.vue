<script lang="ts">
import { defineComponent, } from 'vue';
import { MastersViewModel } from '@/viewmodels/MastersViewModels';
import IconCreate from '@/components/icons/interface/IconCreate.vue';
import MasterSkeletonComponent from "@/components/masters/MasterSkeletonComponent.vue";
import MasterViewComponent from "@/components/masters/MasterViewComponent.vue";
import axios from '@/plugins/axios'
import { useI18n } from 'vue-i18n';
import MasterCreateModal from "@/components/masters/MasterCreateModal.vue";
import { PaginationMetaData } from "@/Utils/PaginationUtils";




export default defineComponent({
    components:{
        MasterCreateModal,
        MasterViewComponent,
        MasterSkeletonComponent,
        IconCreate
    },
    methods:{
        async getDataAsync() {
            this.isLoaded = false;
            const response = await axios.get("/api/common/master?page=1");



            this.mastersList = response.data;
            this.isLoaded = true;


            console.error("Error while fetching data:");
        },

        async searchDataAsync(){
            if (this.searchString.trim() === '') {
                    await this.getDataAsync();
                    return;
                }
            try {

                this.isLoaded = false;

                const response = await axios.get("/api/common/master/search?search="+ this.searchString);
                
                this.mastersList = response.data;
            } 
            catch(error) {
                console.log(error)
            }
            finally{
                this.isLoaded = true;
            }
        }
        
    },
    data() {
        return {
            metaData: new PaginationMetaData(),
            mastersList: [] as MastersViewModel[],
            isLoaded: false as boolean,
            page: 1 as number,
            defaultSkeletons: 6 as Number,
            currentPage: 1 as Number,
            totalPages: 1 as Number,
            searchString: ""
        }
    },
    setup(){
        const { t } = useI18n();
        return { t };
    },
    async mounted() {
        await this.getDataAsync();
    },
});
</script>

<template>
    <nav class="flex justify-between" aria-label="Breadcrumb">
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
                            $t('masters') }}</a>
                </div>
            </li>
        </ol>

    <!--end:: BreadCrumb-->

    <form class="flex mx-5 justify-end pb-5 w-full" @submit.prevent="searchDataAsync">
        <div class="flex relative right-0 w-2/5">
          <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
              fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
            </svg>
          </div>
          <input v-model="searchString" type="search" id="default-search"
            class="flex end w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Name..." />
          <button type="submit"
            class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            {{ $t("search") }}
          </button>
        </div>
    </form>
    <MasterCreateModal></MasterCreateModal>

    </nav>

    <!--begin:: Masters Skeletons-->
    <ul class="grid grid-cols-3 md:grid-cols-3 gap-5" v-show="isLoaded==false">
        <template  v-for="element in defaultSkeletons">
            <MasterSkeletonComponent
              >
            </MasterSkeletonComponent>
        </template>
    </ul>
    <!--end:: Masters Skeletons-->
    <!--begin:: Masters-->

    <ul class="grid grid-cols-4 md:grid-cols-4 gap-4" v-show="isLoaded==true">
        <template v-for="element in mastersList">
            <MasterViewComponent
                :firstName=element.firstName
                :lastName=element.lastName
                :imagePath=element.imagePath
                :phoneNumber = element.phoneNumber
                :phoneNumberConfirmed = element.phoneNumberConfirmed
                :isFree = element.isFree
                :createdAt=element.createdAt
                :updatedAt=element.updatedAt
                :id=element.id
                class="mt-1 mb-3">
            </MasterViewComponent>
        </template>
    </ul>
    <!--end:: Masters-->

</template>