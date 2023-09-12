<template>


<div id="gallery" class="relative w-full" data-carousel="slide" >
    <!-- Carousel wrapper -->
    <div class="relative h-56 overflow-hidden rounded-lg md:h-96" >
         <!-- Item 1 -->
         <div v-for="element in imagePath" >
        
        <div className="hidden duration-700 ease-in-out" data-carousel-item >
                <img :src=bace+element className="absolute block max-w-full h-auto -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="" />
        </div>
    </div>
        
    </div>

    <!-- Slider controls -->
    <button type="button" class="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-prev>
        <span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
            <svg class="w-4 h-4 text-white dark:text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4"/>
            </svg>
            <span class="sr-only">Previous</span>
        </span>
    </button>
    <button type="button" class="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-next>
        <span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
            <svg class="w-4 h-4 text-white dark:text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
            </svg>
            <span class="sr-only">Next</span>
        </span>
    </button>
</div>


<FlowbiteSetup></FlowbiteSetup>
</template>

<script lang="ts">
import axios from '@/plugins/axios'
import FlowbiteSetup from "@/FlowbiteSetup.vue"
import { defineComponent } from "vue";

export default defineComponent({
    components:{
    FlowbiteSetup,
},
    props: {
        imagePath: String<[]>
    },
    data() {
        return{
            baseURL: "" as String,
            imageFullPath: "https://sun6-22.userapi.com/s/v1/ig2/GaqrqzMiGw_KKTSL9BRKqQz_gWkKRa970sMfeaPgF0ALKDbX0lXYakM-_AiJ9lYKcVqSR2YkytPiy3ei7MdaFLyK.jpg?size=2160x2160&quality=95&crop=0,0,2160,2160&ava=1" as String,
            bace: "http://64.227.42.134:4040/" as String,
        }
    },
    methods: {
        load(){
            this.baseURL = axios.defaults.baseURL!;
            // this.imageFullPath = this.baseURL + "/" + this.imagePath[0];
            console.log(this.imagePath)
            
        },

    },
    mounted() {
        this.load();
    }
});
</script>