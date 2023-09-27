<script lang="ts">
import IconCalendar from "../../components/icons/interface/IconCalendar.vue";
import IconCalendarEdit from "../../components/icons/interface/IconCalendarEdit.vue";
import { formatDate } from "@/helpers/DateHelper";
import axios from '@/plugins/axios'
import { defineComponent } from "vue";
import FlowbiteSetup from "@/FlowbiteSetup.vue";
import PostDeleteModal from "@/components/posts/PostDeleteModal.vue";
import PostImages from "./PostImages.vue";
import PostInfo from "./PostInfo.vue"

export default defineComponent({
    components: {
        PostDeleteModal,
        FlowbiteSetup,
        IconCalendar,
        IconCalendarEdit,
        PostImages,
        PostInfo
    },
    props: {
        categoryId: Number,
        userId: Number,
        title: String,
        price: Number,
        description: String,
        region: String,
        district: String,
        longitude: Number,
        latidute: Number,
        phoneNumber: String,
        imagePath: { type: Array as () => string[], default: () => [] as string[], },
        firstName: String,
        lastName: String,
        categoryName: String,
        createdAt: Date,
        updatedAt: Date,
        id: Number,
    },
    watch:{
        id:"load",
        imagePath:'load'
    },
    data() {
        return {
            baseURL: "" as String,
            createdAtString: "" as String,
            updatedAtString: "" as String,
            localId: 0 as Number,
            imageFullPath: "https://sun6-22.userapi.com/s/v1/ig2/GaqrqzMiGw_KKTSL9BRKqQz_gWkKRa970sMfeaPgF0ALKDbX0lXYakM-_AiJ9lYKcVqSR2YkytPiy3ei7MdaFLyK.jpg?size=2160x2160&quality=95&crop=0,0,2160,2160&ava=1" as String,

        }
    },

    methods: {
        load() {
            this.baseURL = axios.defaults.baseURL!;
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
        <PostImages :imagePath=imagePath>
        </PostImages>
        <div class="px-2 pt-1 pb-2">

            <div class="flex items-center">
                <h5 class="text-xl items-center font-bold tracking-tight text-gray-900 dark:text-white">{{ title }}</h5>
                <div class="ml-auto">
                    <PostInfo :id-k="id" :category-name-k="categoryName" :created-at-k="createdAtString"
                        :updated-at-k="updatedAtString" :title-k="title" :first-name-k="firstName" :last-name-k="lastName"
                        :description-k="description" :region-k="region" :phone-number-k="phoneNumber"
                        :district-k="district">
                    </PostInfo>
                </div>
            </div>

        </div>
    </div>





    <!-- Main modal -->
    <FlowbiteSetup></FlowbiteSetup>
</template>