<script lang="ts">
import { defineComponent} from 'vue';
import { UserViewModel } from  '@/viewmodels/UsersViewModel'
import IconCreate from '@/components/icons/interface/IconCreate.vue';
import UserSkeletonComponent from "@/components/users/UserSkeletonComponent.vue";
import UserViewComponent from "@/components/users/UserViewComponent.vue";
import axios from '@/plugins/axios'
import { useI18n } from 'vue-i18n';
import UserCreateModal from "@/components/users/UserCreateModal.vue";




export default defineComponent({
    components:{
        UserCreateModal,
        UserViewComponent,
        UserSkeletonComponent,
        IconCreate
    },
    methods:{
        async getDataAsync(){
            this.isLoaded = false;
            var response = await axios.get<UserViewModel[]>("/api/common/user/get-all");
            this.isLoaded=true;
            this.mastersList = response.data;
            console.log(response.data);
        },

    },
    data() {
        return {

            mastersList: [] as MastersViewModel[],
            defaultSkeletons: 6 as Number,
            isLoaded: false as Boolean
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
        <template v-for="element in mastersList">
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
</template>