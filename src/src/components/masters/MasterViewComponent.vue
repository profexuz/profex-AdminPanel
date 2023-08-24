<script lang="ts">

import IconCalendar from "../../components/icons/interface/IconCalendar.vue";
import IconCalendarEdit from "../../components/icons/interface/IconCalendarEdit.vue";
import {formatDate} from "@/helpers/DateHelper";
import axios from '@/plugins/axios'
import { defineComponent } from "vue";
import MasterDeleteComponent from "@/components/masters/MasterDeleteComponent.vue";
import MasterEditModal from "@/components/masters/MasterEditModal.vue";
import UserEditModal from "@/components/users/UserEditModal.vue";


export default defineComponent({
    components:{
        UserEditModal,
        MasterEditModal,
        MasterDeleteComponent,

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
        <div class="image-container p-1">
            <img class="image-square rounded-lg" v-bind:src="imageFullPath"  alt="" />
            <img v-if="isFree" class="p-1 status-badge" src="@/assets/free.png"  alt="" />
            <img v-else class="p-1 status-badge" src="@/assets/busy.png"  alt="" />
        </div>
        <div class="p-3">
                <h5 class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{{firstName}} {{lastName}}</h5>
            <p class=" font-normal text-gray-700 dark:text-gray-400">{{phoneNumber}} 
                <span class=" ml-1 bg-green-700  dark:bg-green-700  inline-flex items-center justify-center w-6 h-6 mr-2 text-sm font-semibold text-gray-800 rounded-full  dark:text-gray-300">
                <svg class="w-2.5 h-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                    <path stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5.917 5.724 10.5 15 1.5"/>
                </svg>
                </span>
            </p>
            <!-- <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Status: 
                <span v-if="isFree" class="bg-blue-600 text-white text-sm font-medium mr-2 px-2.5 py-0.5 rounded">Free</span>
                  <span v-else class="bg-red-800 text-slate-200 text-sm font-medium mr-2 px-2.5 py-0.5 rounded">Busy</span>
            </p> -->
            <div class="flex mt-1 flex-wrap items-center ">
                <IconCalendar></IconCalendar>
                <p class="me-5 mx-1 font-normal bold text-gray-700 dark:text-gray-400">{{ createdAtS}}</p>
            </div>
            <div class="flex mt-1 flex-wrap items-center ">
                <IconCalendarEdit></IconCalendarEdit>
                <p class="mx-1 font-normal bold text-gray-700 dark:text-gray-400">{{ updatedAtS }}</p>
            </div>
            <a href="#" class="inline-flex w-full items-center justify-center mt-1 text-lg font-medium  text-gray-500 rounded   hover:text-gray-900 bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white">
                <span class="w-full">Skills</span>
                <svg class="w-4 h-4 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                </svg>
            </a> 

            <MasterEditModal
                :editId=id
                :nameProp=firstName
                :lastnameProp=lastName
                :phoneProp=phoneNumber
                :free=isFree
            ></MasterEditModal>
                <button type="button"
                        class=" w-full">
                        <!-- <IconDelete></IconDelete>-->
                       <MasterDeleteComponent :id-master="id"></MasterDeleteComponent>
                </button>
            
        </div>

    </div>
</template>

<style scoped>
.image-square
{
    width: 100%;
    height: 100%;
    max-width: 300px;
    object-fit: cover;
    object-position: top;
    aspect-ratio: 1/1;
}
.image-container
{
    position: relative;
}
.image-container img:last-child
{
    bottom: 0;
    right: 0;
    position: absolute;
    width: 80px;
    height: 50px;
}
/* .status-badge
{
    top: 0;
    left:0;
    position: absolute;
    width: 80px;
    height: 50px;
} */



</style>