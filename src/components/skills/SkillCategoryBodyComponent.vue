<script lang="ts">
import {defineComponent} from "vue";
import axios from "@/plugins/axios";
import type {SkillViewModel} from "@/viewmodels/SkillsViewModel";





export default  defineComponent({

    props: {
        cId : Number,
        cName: String
    },
    methods:{
        emitEvent(cId:number)
        {
           // eventBus.sharedData.value = cId;
        }

    },
    data(){
        return{
            SkillList : [] as SkillViewModel[],
            categoryId: 0 as Number,

        }
    },
    async mounted(){

    }
})
</script>


<template>

    <tr class="border-t border-gray-200 dark:border-gray-100">
        <td class="px-6 py-4 bg-gray-50 dark:bg-gray-700">
            <button   type="button" class=" text-gray-900 hover:text-white  border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 rounded hover:px-2  dark:border-gray-600 dark:text-gray-100 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800">
                {{cName}}

            </button>

        </td>
    </tr>
</template>


<style scoped>

</style>