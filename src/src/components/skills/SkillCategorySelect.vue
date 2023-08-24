<script lang="ts">
import {defineComponent} from "vue";
import type {CategoryViewModel} from "@/viewmodels/CategoryViewModels";
import SkillTableBodyComponent from "@/components/skills/SkillTableBodyComponent.vue";
import SkillTableHeaderComponent from "@/components/skills/SkillTableHeaderComponent.vue";
import axios from "@/plugins/axios";

export default defineComponent({
    components: {SkillTableHeaderComponent, SkillTableBodyComponent},
    data(){
        return{
            selectedId : 0,
            categoryList: [] as CategoryViewModel[]
        }
    },
    methods:{
        async getDataAsync()
        {
            var response = await axios.get<CategoryViewModel[]>("/api/common/category");
            this.categoryList = response.data;
            console.log(this.categoryList.pop())
        }
    },
    async mounted() {
        await this.getDataAsync();

    }

})
</script>
<template>
    <div class="mb-3">

    <label  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select Category</label>
    <select @onchange="getDataAsync" v-model="selectedId" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">

        <option @onchange="getDataAsync" v-for="item in categoryList" :value="item.id">{{item.name}}</option>
            <option>hello</option>

    </select>

    </div>
    <div class="relative overflow-x-auto shadow-md ">
        <table class="w-full  text-sm  text-left text-gray-800 dark:text-gray-50">
            <SkillTableHeaderComponent></SkillTableHeaderComponent>

            <tbody >
            <SkillTableBodyComponent :cId = selectedId></SkillTableBodyComponent>
            </tbody>

        </table>
    </div>
</template>



<style scoped>

</style>