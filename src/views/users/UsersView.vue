<script lang="ts">
import { defineComponent} from 'vue';
import { UserViewModel } from  '@/viewmodels/UsersViewModel'
import IconCreate from '@/components/icons/interface/IconCreate.vue';
import UserSkeletonComponent from '@/components/users/UserSkeletonComponent.vue'
import UserViewComponent from "@/components/users/UserViewComponent.vue";
import UserCreateModal from "@/components/users/UserCreateModal.vue";
import { PaginationMetaData } from "@/Utils/PaginationUtils";
import axios from '@/plugins/axios'
import { useI18n } from 'vue-i18n';




export default defineComponent({
    components:{
        UserCreateModal,
        UserViewComponent,
        UserSkeletonComponent,
        IconCreate
    },
    methods:{
        async getDataAsync(page: number){
            this.isLoaded = false;
            const response = await axios.get("/api/common/user/get-all?page="+page);
            const paginationJson = JSON.parse(response.headers['x-pagination']);
            this.metaData = new PaginationMetaData();
            this.metaData.currentPage = paginationJson.CurrentPage;
            this.metaData.totalPages = paginationJson.TotalPages;
            this.metaData.hasNext = paginationJson.HasNext;
            this.metaData.hasPrevious = paginationJson.HasPrevious;

            this.isLoaded=true;
            this.userlist = response.data;
            console.log(response.data);
        },

    },
    data() {
        return {

            userlist: [] as UserViewModel[],
            isLoaded: false as Boolean,
            metaData: new PaginationMetaData(),
            page: 1 as number,
        }
    },
    setup(){
        const { t } = useI18n();
        return { t }; // t o'zgaruvchisini qaytarish uchun

    },
    async mounted() {
        await this.getDataAsync(1);
    },
});
</script>

<template>
    <!--start:: BreadCrumb-->
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
                            $t('users') }}</a>
                </div>
            </li>
        </ol>
        <!--end:: BreadCrumb-->

        <UserCreateModal></UserCreateModal>

    </nav>

    <!--begin:: Categories Skeletons-->
    <ul class="grid grid-cols-3 md:grid-cols-3 gap-2" v-show="isLoaded==false">
        <template  v-for="element in defaultSkeletons">
            <UserSkeletonComponent
            >
            </UserSkeletonComponent>
        </template>
    </ul>
    <!--end:: Categories Skeletons-->
    <!--begin:: Masters-->


    <!-- <div class="grid grid-cols-2 md:grid-cols-3 gap-4"> -->
    <ul class="grid grid-cols-4 md:grid-cols-4 gap-4" v-show="isLoaded==true">
        <template v-for="element in userlist">
            <UserViewComponent
                :firstName=element.firstName
                :lastName=element.lastName
                :imagePath=element.imagePath
                :phoneNumber = element.phoneNumber
                :phoneNumberConfirmed = element.phoneNumberConfirmed
                :createdAt=element.createdAt
                :updatedAt=element.updatedAt
                :id=element.id
                class="mt-2 mb-3">
            </UserViewComponent>
        </template>
    </ul>
    <!--end:: Masters-->
    <!-- </div> -->


    <!-- start:: Pagination-->

    <nav aria-label="Page navigation example">
        <ul class="flex items-center -space-x-px h-8 text-sm">
            <li v-show="metaData.hasPrevious == true">
                <a href="#"
                   class="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                    <span class="sr-only">Previous</span>
                    <svg class="w-2.5 h-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                         viewBox="0 0 6 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M5 1 1 5l4 4" />
                    </svg>
                </a>
            </li>

            <li v-for="el in metaData.totalPages">
                <button @click="getDataAsync(el)" class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                    {{ el }}</button>
            </li>

            <li v-show="metaData.hasNext == true">
                <a href="#"
                   class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                    <span class="sr-only">Next</span>
                    <svg class="w-2.5 h-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                         viewBox="0 0 6 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="m1 9 4-4-4-4" />
                    </svg>
                </a>
            </li>
        </ul>
    </nav>


    <!--    end:: Pagination-->
</template>