<script lang="ts">
import IconCreate from "@/components/icons/interface/IconCreate.vue";
import { defineComponent } from "vue";
import axios from "@/plugins/axios";
import LoadingCompanent from "../LoadingCompanent.vue";
import ErrorAlert from "../ErrorAlert.vue"
export default defineComponent({
    components: {
        IconCreate,
        LoadingCompanent,
        ErrorAlert
    },
    data() {
        return {
            showModal: false,
            name: "" as string,
            description: "" as string,
            createError: false as boolean,
            loading: true
        };
    },
    methods: {
        openModal() {
            this.showModal = true;
            this.createError = false;
        },
        closeModal() {
            this.showModal = false;
            this.createError = false;
        },
        closeError(){
            this.createError = false;
        },
        async createAsync() {
            try {
                this.loading = false;
                const formData = new FormData();
                formData.append("Name", this.name);
                formData.append("Description", this.description);
                const response = await axios.post("/api/admin/categories", formData);

                if (response.status === 200) {
                    location.reload();
                    this.closeModal();
                } else {
                    this.loading = true;
                    this.createError = true;
                    setTimeout(() => {
                        this.createError = false;
                    }, 5000);
                }
            } catch (error) {
                this.loading = true;
                this.createError = true;
                setTimeout(() => {
                        this.createError = false;
                    }, 5000);
            }
        }

    },
});
</script>
<template>
    <div class="flex w-100 justify-end">
        <button @click="openModal" type="button"
            class="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
            <div class="flex flex-wrap items-center">
                <IconCreate></IconCreate>
                <p class="mx-2">{{ $t("create") }}</p>
            </div>
        </button>
    </div>



    <!-- Main modal -->
    <div v-if="showModal"
        class="fixed top-0 left-0 right-0 z-50 w-full h-screen flex items-center justify-center bg-black bg-opacity-50">

        <div class="relative w-full max-w-md max-h-full">
            <!-- Modal content -->
                <div v-if="createError" id="alert-2" 
                    class="flex items-center p-4 mb-4 text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                    role="alert">
                    <svg class="flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor" viewBox="0 0 20 20">
                        <path
                            d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                    </svg>
                    <span class="sr-only">Info</span>
                    <div class="ml-3 text-sm font-medium">
                            {{ $t('errorCreate') }}
                    </div>
                    <button type="button" @click="closeError"
                        class="ml-auto -mx-1.5 -my-1.5 bg-red-50 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-red-400 dark:hover:bg-gray-700"
                        data-dismiss-target="#alert-2" aria-label="Close">
                        <span class="sr-only">Close</span>
                        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                            viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                        </svg>
                    </button>
                </div>
            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <button @click="closeModal"
                    class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    data-modal-hide="edit-modal">
                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                        viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                    </svg>
                    <span class="sr-only">Close modal</span>
                </button>
                <div class="px-6 py-6 lg:px-8">
                    <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">
                        {{ $t("categories") }} {{ $t("create") }} </h3>
                    <form @submit.prevent="createAsync" class="space-y-6" action="#">
                        <!--Category Name Edit Start-->
                        <div>
                            <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                {{ $t("fName") }}
                            </label>
                            <input v-model="name" type="text" name="name" id="name" autocomplete="off"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                required>
                        </div>
                        <!--Category Name Edit End-->

                        <!--Edit Description Start-->
                        <div>
                            <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                {{ $t("description") }}</label>
                            <textarea v-model="description" name="description" id="description"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                required>
                            </textarea>
                        </div>
                        <!--Edit Description End-->
                        <div class="m-5">
                            <button v-if="loading" type="submit"
                                class="w-full text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-500 dark:hover:bg-green-600 dark:focus:ring-green-800">
                                {{ $t('create') }}
                            </button>
                            <button v-else type="submit"
                                class="w-full text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-500 dark:hover:bg-green-600 dark:focus:ring-green-800">
                                <LoadingCompanent></LoadingCompanent>
                            </button>
                        </div>


                    </form>
            </div>

        </div>
    </div>
</div>
</template>