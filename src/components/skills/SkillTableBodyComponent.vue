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

export default defineComponent( {

    components:{
        SkillDeleteModal,
        SkillEditModal,
        IconCalendarEdit,
        IconCalendar,
        IconDelete,
        IconEdit

    },
    props: {
        cId : Number,
        cName: String
    },
    methods:{
        formatDate,
        async getDataAsync()
        {
            var responce = await axios.get<SkillViewModel[]>("/api/common/category/getall/by/categoryId?categoryId=67");
            this.SkillList = responce.data;
            console.log(this.SkillList)
        }

    },
    data(){
        return{
            SkillList : [] as SkillViewModel[],
            categoryId: 0 as Number,
            baseURL: "" as String,
            createdAtString: "" as String,
            updatedAtString: "" as String,
        }
    },
    async mounted(){
        await this.getDataAsync();

    },


})
</script>
<template>

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



</template>



<style scoped>

</style>