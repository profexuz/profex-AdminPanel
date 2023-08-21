<script lang="ts">
import { defineComponent} from 'vue';
import { MastersViewModel } from '@/viewmodels/MastersViewModels';
import IconCreate from '@/components/icons/interface/IconCreate.vue';
import MasterSkeletonComponent from "@/components/masters/MasterSkeletonComponent.vue";
import MasterViewComponent from "@/components/masters/MasterViewComponent.vue";
import axios from '@/plugins/axios'
import { useI18n } from 'vue-i18n';




export default defineComponent({
    components:{
        MasterViewComponent,
        MasterSkeletonComponent,
        IconCreate
    },
    methods:{
        async getDataAsync(){
            this.isLoaded = false;
            var response = await axios.get<MastersViewModel[]>("/api/common/master");
            this.isLoaded=true;
            this.mastersList = response.data;
            console.log(response.data);
        }
    },
    data() {
        return {

            mastersList: [] as MastersViewModel[],
            defaultSkeletons: 4 as Number,
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
                            $t('masters') }}</a>
                </div>
            </li>
        </ol>
    </nav>
    <!--end:: BreadCrumb-->
    <!--begin:: Categories Skeletons-->
    <ul v-show="isLoaded==false">
        <template v-for="element in defaultSkeletons">
            <MasterSkeletonComponent
                class="mt-2 mb-3">
            </MasterSkeletonComponent>
        </template>
    </ul>
    <!--end:: Categories Skeletons-->
    <!--begin:: Masters-->
    <div class="flex w-100 justify-end">
        <button type="button" class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 ">
            <div class="flex flex-wrap items-center">
                <IconCreate></IconCreate>
                <p class="mx-2">{{ $t("create") }}</p>
            </div>
        </button>
    </div>

    <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
    <ul v-show="isLoaded==true">
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
                class="mt-2 mb-3">
            </MasterViewComponent>
        </template>
    </ul>
    <!--end:: Masters-->
    </div>
</template>