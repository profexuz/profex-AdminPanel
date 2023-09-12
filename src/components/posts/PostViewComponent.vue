<script lang="ts">
import IconCalendar from "../../components/icons/interface/IconCalendar.vue";
import IconCalendarEdit from "../../components/icons/interface/IconCalendarEdit.vue";
import {formatDate} from "@/helpers/DateHelper";
import axios from '@/plugins/axios'
import { defineComponent } from "vue";
import FlowbiteSetup from "@/FlowbiteSetup.vue";
import PostDeleteModal from "@/components/posts/PostDeleteModal.vue";
import PostImages from "./PostImages.vue";
import type PostImagesVue from "./PostImages.vue";

export default defineComponent({
    components:{
    PostDeleteModal,
    FlowbiteSetup,
    IconCalendar,
    IconCalendarEdit,
    PostImages,
},
    props: {

        categoryId: Number ,
        userId : Number ,
        title: String,
        price:Number,
        description: String,
        region: String,
        district: String,
        longitude:Number,
        latidute:Number,
        phoneNumber: String,
        imagePath: String<[]>,
        firstName: String,
        lastName: String,
        categoryName: String,
        // skillTitle: String<[]>,
        createdAt: Date ,
        updatedAt: Date ,
        id: Number
    },
    data() {
        return{
            baseURL: "" as String,
            createdAtString: "" as string,
            updatedAtString: "" as string,
            localId: 0  as Number,
            imageFullPath: "https://sun6-22.userapi.com/s/v1/ig2/GaqrqzMiGw_KKTSL9BRKqQz_gWkKRa970sMfeaPgF0ALKDbX0lXYakM-_AiJ9lYKcVqSR2YkytPiy3ei7MdaFLyK.jpg?size=2160x2160&quality=95&crop=0,0,2160,2160&ava=1" as String,

        }
    },
    methods: {
        load(){
            this.baseURL = axios.defaults.baseURL!;

            console.log(this.imagePath);
            
            // this.imageFullPath = `${this.baseURL}/${this.imagePath.split(',')[0]}`;
            this.createdAtString = formatDate(this.createdAt!);
            this.updatedAtString = formatDate(this.updatedAt!);
        },

    },
    mounted() {
        // alert(this.baseURL)

        this.load();
    }
});

</script>

<template>
        <div class="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                        <PostImages 
                            :imagePath = imagePath>
                        </PostImages>
                    <!-- <div class="image-container px-2 ">
                        <h5 class="text-2xl pt-1 pb-1 font-bold tracking-tight text-gray-900 dark:text-white">{{firstName}} {{lastName}}</h5>
                        <img class="image-square rounded-lg" v-bind:src="imageFullPath"  alt="" />
                    </div> -->
                    <div class="px-2 pt-1 pb-2">
                            <h5 class="text-xl font-bold tracking-tight text-gray-900 dark:text-white">{{$t('title')}}: {{title}} </h5>
                        <p class=" font-normal text-gray-700 dark:text-gray-400">{{$t('description')}}: {{description}}</p>
                        <p class=" font-normal text-gray-700 dark:text-gray-400">{{$t('region')}}: {{region}}</p>
                        <p class=" font-normal text-gray-700 dark:text-gray-400">{{$t('district')}}: {{district}}</p>
                        <p class=" font-normal text-gray-700 dark:text-gray-400">{{$t('categories')}}: {{categoryName}}</p>
                        <p class=" font-normal text-gray-700 dark:text-gray-400">{{phoneNumber}}    </p>



                        <div class="flex mt-1 flex-wrap items-center ">
                            <IconCalendar></IconCalendar>
                            <p class="me-5 mx-1 font-normal bold text-gray-700 dark:text-gray-400">{{ createdAtString}}</p>
                        </div>
                        <div class="flex mt-1 flex-wrap items-center ">
                            <IconCalendarEdit></IconCalendarEdit>
                            <p class="mx-1 font-normal bold text-gray-700 dark:text-gray-400">{{ createdAtString}}</p>
                        </div>
                      <PostDeleteModal :id-master=id></PostDeleteModal>
                    </div>
        </div>





              <!-- Main modal -->
    <FlowbiteSetup></FlowbiteSetup>


</template>