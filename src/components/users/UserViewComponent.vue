<script lang="ts">
import IconCalendar from "../../components/icons/interface/IconCalendar.vue";
import IconCalendarEdit from "../../components/icons/interface/IconCalendarEdit.vue";
import UserDeleteComponent from "../../components/users/UserDeleteComponent.vue"
import {formatDate} from "@/helpers/DateHelper";
import axios from '@/plugins/axios'
import { defineComponent } from "vue";
import UserEditModal from "./UserEditModal.vue";


export default defineComponent({
    components:
    {
        UserEditModal,
        IconCalendar,
        IconCalendarEdit,
        UserDeleteComponent
    },
    props: {
        id: Number,
        firstName: String,
        lastName: String,
        phoneNumber:String,
        phoneNumberConfirmed:Boolean,
        imagePath:String,
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
    watch: {
        id: 'load',
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

        pushToPosts() {
    this.$router.push({
    name: "post", // Replace with the actual name of your destination route
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
<template >
    <div class="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div class="image-container px-2 pt-2">
            <img v-bind:src= "imageFullPath" class="image-square rounded-lg"   alt="" />
        </div>
        <div class="px-2 pt-1 pb-2">
            <div class="truncate-text">
          <h6 class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{{ firstName }} {{ lastName }}</h6>
        </div>
<!--            <h5 class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{{firstName}} {{lastName}}</h5>-->

            <p class=" font-normal text-gray-700 dark:text-gray-400">{{phoneNumber}}
                <span class=" ml-1 bg-green-700  dark:bg-green-700  inline-flex items-center justify-center w-6 h-6 mr-2 text-sm font-semibold text-gray-800 rounded-full  dark:text-gray-300">
                <svg class="w-2.5 h-2.5 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                    <path stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5.917 5.724 10.5 15 1.5"/>
                </svg>
                </span>
            </p>
            <div class="flex mt-1 flex-wrap items-center ">
                <IconCalendar></IconCalendar>
                <p class="me-5 mx-1 font-normal bold text-gray-700 dark:text-gray-400">{{ createdAtS}}</p>
            </div>
            <div class="flex mt-1 flex-wrap items-center ">
                <IconCalendarEdit></IconCalendarEdit>
                <p class="mx-1 font-normal bold text-gray-700 dark:text-gray-400">{{ updatedAtS }}</p>
            </div>
            <button  @click="pushToPosts" class="inline-flex w-full items-center justify-center mt-1 text-lg font-medium  text-gray-500 rounded   hover:text-gray-900 bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white">
                <span class="w-full">{{ $t('Posts') }}</span>
                <svg class="w-4 h-4 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                </svg>
            </button>
            <div class="flex">
            <UserEditModal 
                :editId=id
                :nameProp=firstName
                :lastnameProp=lastName
                :phoneProp=phoneNumber>
            </UserEditModal>
            <button type="button"
                    class="w-full">
                <UserDeleteComponent :id-user=id></UserDeleteComponent>
            </button>
            
            </div>
            

        </div>

    </div>
</template>

<style scoped>
.image-square
{
    width: 100%;
    height: 100%;
    max-width: 280px;
    max-height: 265px;
    object-fit: cover;
    object-position: top;
    aspect-ratio: 1/1;
}
.image-container
{
    position: relative;
}

.truncate-text {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

</style>