<script lang="ts">
import Cookies from 'js-cookie';
import IconCreate from "@/components/icons/interface/IconCreate.vue";
import { defineComponent } from "vue";
import axios from "@/plugins/axios";
import {Dropdown} from "flowbite";
import type { DropdownOptions, DropdownInterface } from "flowbite";
import FlowbiteSetup from "@/FlowbiteSetup.vue";
export default defineComponent({
    components: {
        FlowbiteSetup,
        IconCreate,

    },
    data() {
        return {
            showModal:false ,
            name: "" as String,
            description: "" as string,
            createError: false as boolean

        };
    },
    methods: {
        openDropdown() {
            const $targetEl: HTMLElement | null = document.getElementById('dropdownDefaultButton');
            const $triggerEl: HTMLElement | null = document.getElementById('dropdownDefaultButton');

            if ($targetEl && $triggerEl) {
                const options: DropdownOptions = {
                    // Your options here
                };

                const dropdown: DropdownInterface = new Dropdown($targetEl, $triggerEl, options);
                dropdown.show();
            }
        },
        openModal() {
            this.showModal = true;
        },
        closeModal() {
            this.showModal = false;
        },
        async createAsync() {
            const formData = new FormData();
            formData.append("Name", this.name);
            formData.append("Description", this.description);
            const responce = await axios.post("/api/common/category", formData);

            if (responce.status == 200) {
                // this.$router.push('/categories');

                location.reload();
                this.closeModal();
            }
            else {
                this.createError = true;
            }
        }
    },
});
</script>
<template>
<FlowbiteSetup></FlowbiteSetup>
    <div class="flex w-100 justify-end">
        <button @click="openModal" type="button"
                class="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
            <div class="flex flex-wrap items-center">
                <IconCreate></IconCreate>
                <p class="mx-2">{{$t("create") }}</p>
            </div>
        </button>
    </div>

<div v-if="showModal"  class="fixed top-0 left-0 right-0 z-50 w-full h-screen flex items-center justify-center bg-black bg-opacity-50">


<div class="">

  <!-- Main modal -->
    <button  id="dropdownDefaultButton" data-dropdown-toggle="dropdown" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">Dropdown button <svg class="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
    </svg></button>
  <!-- Dropdown menu -->
    <div id="dropdown" class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
        <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
            <li>
                <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</a>
            </li>
            <li>
                <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings</a>
            </li>
            <li>
                <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Earnings</a>
            </li>
            <li>
                <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Sign out</a>
            </li>
        </ul>
    </div>
</div>

<!--    <div class="fixed top-0 left-0 right-0 z-50 w-full h-screen flex items-center justify-center bg-black bg-opacity-50">-->
        <div>
        <div class="relative w-full max-w-md max-h-full">
            <!-- Modal content -->
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
                        Create </h3>

                    <div class="flex">



                        <form @submit.prevent="createAsync" class="space-y-6" action="#">
                        <!--Category Name Edit Start-->
                        <div>
                            <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Name
                            </label>
                            <input v-model="name" type="text" name="name" id="name" autocomplete="off"
                                   class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                   required>
                        </div>
                        <!--Category Name Edit End-->

                        <!--Edit Description Start-->
                        <div>
                            <label for="description"
                                   class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Description</label>
                            <textarea v-model="description" name="description" id="description"
                                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                      required>
                            </textarea>
                        </div>
                        <!--Edit Description End-->
                        <div class="m-5">
                            <button  type="submit"
                                     class="w-full text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-500 dark:hover:bg-green-600 dark:focus:ring-green-800">
                                Create
                            </button>
                        </div>
                    </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>