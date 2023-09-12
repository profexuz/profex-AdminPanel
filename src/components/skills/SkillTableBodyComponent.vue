<script lang="ts">

import {defineComponent} from "vue";
import axios from "@/plugins/axios";
import {SkillViewModel} from "@/viewmodels/SkillsViewModel";
import IconEdit from "@/components/icons/interface/IconEdit.vue";
import IconDelete from "@/components/icons/interface/IconDelete.vue";
import {formatDate} from "@/helpers/DateHelper";
import IconCalendar from "@/components/icons/interface/IconCalendar.vue";
import IconCalendarEdit from "@/components/icons/interface/IconCalendarEdit.vue";
import SkillEditModal from "@/components/skills/SkillEditModal.vue";
import SkillDeleteModal from "@/components/skills/SkillDeleteModal.vue";

import SkillTableHeaderComponent from "@/components/skills/SkillTableHeaderComponent.vue";
import {CategoryViewModel} from "@/viewmodels/CategoryViewModels";

export default defineComponent( {

    components:{
        SkillTableHeaderComponent,
        SkillDeleteModal,
        SkillEditModal,
        IconCalendarEdit,
        IconCalendar,
        IconDelete,
        IconEdit

    },
    props: {
        id : Number,
        cName: String
    },
    methods:{
        formatDate,
        async getDataCategory(){
            var catresponse = await axios.get<CategoryViewModel[]>("/api/common/category");
            this.categoryList = catresponse.data;
            console.log(this.categoryList)
        },
        async getDataChildAsync(myId:number)
        {
            console.log(myId);
            this.Aurl = `/api/common/category/allSkillsBy/categoryId?categoryId=${myId}`
            var responce = await axios.get<SkillViewModel[]>(this.Aurl);
            this.SkillList = responce.data;
        }

    },
    data(){
        return{
            SkillList : [] as SkillViewModel[],
            categoryId: 0 as Number,
            baseURL: "" as String,
            createdAtString: "" as String,
            updatedAtString: "" as String,
            Aurl:"" as String,
            selectedId : 0,
            categoryList: [] as CategoryViewModel[]
        }
    },
    async mounted(){
        await  this.getDataCategory();
        await this.getDataChildAsync(this.$route.params.id);
    },


})
</script>
<template>

    <div class="mb-3">
        <label  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            {{$t('selectCategory')}}
        </label>
        <select @click="getDataChildAsync(selectedId)" v-model="selectedId" class="bg-gray-50 text-base border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">

            <option class="text-base" v-for="item in categoryList" :value="item.id">{{item.name}}</option>

        </select>

    </div>
    <div class="relative overflow-x-auto shadow-md ">
        <table class="w-full  text-sm  text-left text-gray-800 dark:text-gray-50">
            <SkillTableHeaderComponent></SkillTableHeaderComponent>

            <tbody >
                    <tr v-for="element in SkillList"
                    class="border-t border-gray-200 dark:border-gray-100">
                <td class="px-6 py-4 bg-gray-50 dark:bg-gray-700">
                    {{element.title}}
                </td>
                <td class="px-6 py-4 bg-gray-50 dark:bg-gray-700">
                    {{element.description}}
                </td>
                <td class="  px-6 py-2 bg-gray-50 dark:bg-gray-700">
                    <div class="flex mb-2"><IconCalendar class="mr-2"></IconCalendar>  {{formatDate(element.createdAt)}}  </div>
                    <div class="flex"> <IconCalendarEdit class="mr-2"></IconCalendarEdit> {{ formatDate(element.updatedAt)}} </div>

                </td>
                <td class="px-6 py-4 bg-gray-50 dark:bg-gray-700">

                    <SkillEditModal
                      :descriptionProp = element.description
                      :idProp = element.id
                      :nameProp = element.title
                      :CategoryId = element.categoryId
                    ></SkillEditModal>

                    <button class=" text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300
                     font-medium rounded-lg text-sm p-1.5 text-center inline-flex items-center mr-2 dark:bg-red-600
                      dark:hover:bg-red-700 dark:focus:ring-red-800">
                       <SkillDeleteModal :idDel = element.id></SkillDeleteModal>
                    </button>
                </td>
            </tr>
            </tbody>

        </table>
    </div>


</template>



<style scoped>

</style>