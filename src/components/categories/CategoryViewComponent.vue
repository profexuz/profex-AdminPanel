<script lang="ts">
import IconCalendar from "../../components/icons/interface/IconCalendar.vue";
import IconCalendarEdit from "../../components/icons/interface/IconCalendarEdit.vue";
import {formatDate} from "@/helpers/DateHelper";
import axios from '@/plugins/axios'
import { defineComponent } from "vue";
import FlowbiteSetup from "@/FlowbiteSetup.vue";
import CategoryEditComponent from "./CategoryEditComponent.vue";
import CategoryDeleteComponents from "./CategoryDeleteComponents.vue";
import router from "@/router";


export default defineComponent({
    components:{
        CategoryEditComponent,
        FlowbiteSetup,
        CategoryDeleteComponents,
        IconCalendar, IconCalendarEdit
    },
    props: {
        id: Number,
        name: String,
        description: String,
        createdAt: Date,
        updatedAt: Date
    },
    data() {
        return{
            baseURL: "" as String,
            createdAtString: "" as String,
            updatedAtString: "" as String,
            localId: 0  as Number
        }
    },
    methods: {
        load(){
            this.baseURL = axios.defaults.baseURL!;
            this.createdAtString = formatDate(this.createdAt!);
            this.updatedAtString = formatDate(this.updatedAt!);
        },
        pushToSkills() {
  router.push({
    name: "skillsDetails", // Replace with the actual name of your destination route
    params: {
      id: this.id,
    }})
},


    },
    mounted() {
        this.load();
    }
});

</script>

<template>

    <div class="card flex border mb-3 border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div class="flex-auto p-3">
            <h5 class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{{ name }}</h5>
            <p class="font-normal text-gray-700 dark:text-gray-400">{{ description }}</p>
            <div class="w-44">
                <button @click="pushToSkills" class="inline-flex text-gray-700 w-full items-center justify-center mt-1 text-l font-medium   rounded   hover:text-gray-900 bg-gray-100 dark:text-gray-200 dark:bg-gray-600 px-3 dark:hover:bg-gray-700 dark:hover:text-white">
                    <span class="w-full">{{ $t('skills') }}</span>
                    <svg class="w-4 h-4 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                    </svg>
                </button>
            </div>
            <div class="flex flex-wrap items-center mt-2 mb-2">
                <IconCalendar></IconCalendar>
                <p class="me-5 mx-1 font-normal bold text-gray-700 dark:text-gray-400">{{ createdAtString }}</p>
                <IconCalendarEdit></IconCalendarEdit>
                <p class="mx-1 font-normal bold text-gray-700 dark:text-gray-400">{{ updatedAtString }}</p>
            </div>

        </div>

        <div class="flex-none w-16">

            <CategoryEditComponent
                :nameProp=name
                :descriptionProp=description

                :idProp=id>
            </CategoryEditComponent>

            <button type="button"
                    class="mt-5 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300
                     font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-red-600
                      dark:hover:bg-red-700 dark:focus:ring-red-800"
            >
                <CategoryDeleteComponents :id-category=id>

                </CategoryDeleteComponents>
            </button>
        </div>
    </div>



    <!-- Main modal -->
    <FlowbiteSetup></FlowbiteSetup>


</template>