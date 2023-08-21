<script lang="ts">
import { defineComponent} from 'vue';
import { CategoryViewModel } from '@/viewmodels/CategoryViewModels';
import IconCreate from '@/components/icons/interface/IconCreate.vue';
import CategorySkeletonComponent from "@/components/categories/CategorySkeletonComponent.vue";
import CategoryViewComponent from "@/components/categories/CategoryViewComponent.vue";
import axios from '@/plugins/axios'
import { useI18n } from 'vue-i18n';

export default defineComponent({
    components:{
        CategoryViewComponent, CategorySkeletonComponent,
        IconCreate
    },
    methods:{
        async getDataAsync(){
            this.isLoaded = false;
            var response = await axios.get<CategoryViewModel[]>("/api/common/categories");
            this.isLoaded=true;
            this.categoriesList = response.data;
        }
    },
    data() {
        return {
            categoriesList: [] as CategoryViewModel[],
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
    <!--begin:: Categories Skeletons-->
    <ul v-show="isLoaded==false">
        <template v-for="element in defaultSkeletons">
            <CategorySkeletonComponent
                class="mt-2 mb-3">
            </CategorySkeletonComponent>
        </template>
    </ul>
    <!--end:: Categories Skeletons-->

    <!--begin:: Categories-->
    <div class="flex w-100 justify-end">
        <button type="button" class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 ">
            <div class="flex flex-wrap items-center">
                <IconCreate></IconCreate>
                <p class="mx-2">{{ $t("create") }}</p>
            </div>
        </button>
    </div>
    <ul v-show="isLoaded==true">
        <template v-for="element in categoriesList">
            <CategoryViewComponent
                :name=element.name
                :description=element.description
                :createdAt=element.createdAt
                :updatedAt=element.updatedAt
                :id=element.id
                class="mt-2 mb-3">
            </CategoryViewComponent>
        </template>
    </ul>
    <!--end:: Categories-->
</template>
