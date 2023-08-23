<script lang="ts">
import IconEdit from "../../components/icons/interface/IconEdit.vue"
import IconDelete from "../../components/icons/interface/IconDelete.vue"
import IconCalendar from "../../components/icons/interface/IconCalendar.vue";
import IconCalendarEdit from "../../components/icons/interface/IconCalendarEdit.vue";
import {formatDate} from "@/helpers/DateHelper";
import axios from '@/plugins/axios'
import { defineComponent } from "vue";
import FlowbiteSetup from "@/FlowbiteSetup.vue";
import CategoryEditComponent from "./CategoryEditComponent.vue";


export default defineComponent({
    components:{
        CategoryEditComponent,
        FlowbiteSetup,
        IconEdit, IconDelete,
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
            editName: "Salom" as String,
            editDesc: "Kurwa" as String,
            localId: 0  as Number
        }
    },
    methods: {
        load(){
            this.baseURL = axios.defaults.baseURL!;
            this.createdAtString = formatDate(this.createdAt!);
            this.updatedAtString = formatDate(this.updatedAt!);
        },

    },
    mounted() {
        this.load();
    }
});

</script>

<template>

    <div class="card flex border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div class="flex-auto p-4">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{{ name }}</h5>
            <p class="font-normal text-gray-700 dark:text-gray-400">{{ description }}</p>

            <div class="flex flex-wrap items-center mt-5 mb-5">
                <IconCalendar></IconCalendar>
                <p class="me-5 mx-1 font-normal bold text-gray-700 dark:text-gray-400">{{ createdAtString }}</p>
                <IconCalendarEdit></IconCalendarEdit>
                <p class="mx-1 font-normal bold text-gray-700 dark:text-gray-400">{{ updatedAtString }}</p>
            </div>
        </div>
        <div class="flex-none w-16">

            <CategoryEditComponent
                :name-prop=this.name
                :description-prop=this.description
                :id-prop=this.id>
            </CategoryEditComponent>

            <button type="button"
                    class="mt-5 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
                <IconDelete></IconDelete>
            </button>
        </div>
    </div>



    <!-- Main modal -->
    <FlowbiteSetup></FlowbiteSetup>


</template>