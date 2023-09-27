<script lang="ts">
import { defineComponent } from "vue";
import { formatDate } from '../../helpers/DateHelper';
import axios from "../../plugins/axios";
export default defineComponent({
    components: {
    },
    props: {
        firstName: String,
        lastName: String,
        imagePath: String,
        phoneNumber: String,
        createdAt: String,
    },
    methods: {
        load() {
            this.baseURL = axios.defaults.baseURL!;
            this.imageFullPath = this.baseURL + "/" + this.imagePath;
            this.createdAtS = formatDate(this.createdAt!);
        }
    },
    data() {
        return {
            createdAtS: "",
            imageFullPath: ""
        }
    },
    mounted() {
        this.load()
    }

})


</script>


<template>
    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            <div class="flex-shrink-0">
                <img class="w-8 h-8 rounded-full" v-bind:src="imageFullPath" alt="">
            </div>
        </th>
        <td class="px-6 py-4">
            {{ firstName }} {{ lastName }}
        </td>
        <td class="px-6 py-4">
            {{ phoneNumber }}
        </td>
        <td class="px-6 py-4">
            {{ createdAtS }}
        </td>
    </tr>
</template>