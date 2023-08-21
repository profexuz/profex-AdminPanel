<script lang="ts">
import IconEdit from "../../components/icons/interface/IconEdit.vue"
import IconDelete from "../../components/icons/interface/IconDelete.vue"
import IconCalendar from "../../components/icons/interface/IconCalendar.vue";
import IconCalendarEdit from "../../components/icons/interface/IconCalendarEdit.vue";
import {formatDate} from "@/helpers/DateHelper";
import axios from '@/plugins/axios'
import { defineComponent } from "vue";


export default defineComponent({
    components:{
        IconEdit, IconDelete,
        IconCalendar, IconCalendarEdit
    },
    props: {
        id: Number,
        firstName: String,
        lastName: String,
        phoneNumber:String,
        phoneNumberConfirmed:Boolean,
        imagePath:String,
        isFree:Boolean,
        createdAt: Date,
        updatedAt: Date

    },
    data() {
        return{
            baseURL: "" as String,
            imageFullPath: "" as String,
            phoneNumberS: "" as String,
            name: "" as String,
            createdAtS: "" as String,
            updatedAtS: "" as String
        }
    },
    methods: {
        load(){
            this.baseURL = axios.defaults.baseURL!;
            this.imageFullPath = this.baseURL+"/"+this.imagePath;
            this.phoneNumberS = this.phoneNumber!;
            this.name = this.firstName!;
            this.createdAtS = formatDate(this.createdAt!);
            this.updatedAtS = formatDate(this.updatedAt!);

        },
    },
    mounted() {
        this.load();
    }
});
</script>
<template >
    <div class="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <img class="rounded-t-lg" v-bind:src="imageFullPath"  alt="" />
        <div class="p-5">
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{{firstName}} {{lastName}}</h5>
            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Phone: {{phoneNumber}}</p>
            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Phone Confirmed: {{phoneNumberConfirmed}}</p>
            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">IsFree: {{isFree}}</p>
            <div class="flex flex-wrap items-center mt-5">
                <IconCalendar></IconCalendar>
                <p class="me-5 mx-1 font-normal bold text-gray-700 dark:text-gray-400">{{ createdAtS}}</p>
                <IconCalendarEdit></IconCalendarEdit>
                <p class="mx-1 font-normal bold text-gray-700 dark:text-gray-400">{{ updatedAtS }}</p>

                <button type="button"
                        class="mt-5 w-full justify-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Edit
<!--                    <IconEdit></IconEdit>-->
            </button>
            <button type="button"
                    class="mt-5 w-full justify-center text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
<!--                <IconDelete></IconDelete>-->
            Delete
            </button>

            </div>
        </div>

    </div>
</template>