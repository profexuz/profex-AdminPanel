<script lang="ts">
import { defineComponent } from "vue";
import IconEdit from "@/components/icons/interface/IconEdit.vue";
import axios from '@/plugins/axios';

export default defineComponent({
    components: {
        IconEdit
    },
    props: {
        nameProp:String,
        descriptionProp:String,
        idProp:Number
    },
    data() {
        return {
            showModal: false,
            categoryName: "",
            categoryDescription: "",
        };
    },
    methods: {
        openModal() {
            this.categoryName = this.nameProp!;
            this.categoryDescription = this.descriptionProp!;
            this.showModal = true;
        },
        closeModal() {
            this.showModal = false;
        },
        async submitForm() {
                const formData = new FormData();
                formData.append("Name", this.categoryName);
                formData.append("Description", this.categoryDescription);
            const responce = await axios.put("/api/common/category?categoryId="+this.idProp, formData);
            console.log(responce.status);
            if (responce.status == 200) {
                this.$router.push("/categories");
                this.hideModal();
            }

        },
        async hideModal() {
            const modal = document.getElementById("create-modal");
            if (modal) {
                modal.classList.add("hidden");
                modal.setAttribute("aria-hidden", "true");
            }
        }
        },


});
</script>

<template>
  <!--begin:: Edit Modal Button-->
    <button  @click="openModal"
            class="mt-5 text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-yellow-400 dark:hover:bg-yellow-500 dark:focus:ring-yellow-600">
        <IconEdit></IconEdit>
    </button>

  <!--end:: Edit Modal Button-->

  <!--For Edit Modal Window  Start-->
    <div v-if="showModal"
         class="fixed top-0 left-0 right-0 z-50 w-full h-screen flex items-center justify-center bg-black bg-opacity-50">
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
                    <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">Edit
                        Category</h3>
                    <form @submit.prevent="submitForm" class="space-y-6" action="#">
                        <!--Category Name Edit Start-->
                        <div>
                            <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category
                                name
                            </label>
                            <input v-model="categoryName" type="text" name="name" id="name"
                                   class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                   required>
                        </div>
                        <!--Category Name Edit End-->

                        <!--Edit Description Start-->
                        <div>
                            <label for="description"
                                   class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category
                                description</label>
                            <textarea v-model="categoryDescription" name="description" id="description"
                                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                      required>
                            </textarea>
                        </div>
                        <!--Edit Description End-->
                        <div class="m-5">
                            <button type="submit"
                                    class="w-full text-white bg-yellow-500 hover:bg-yellow-600 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-yellow-500 dark:hover:bg-yellow-600 dark:focus:ring-yellow    -800">
                                Update
                            </button>
                        </div>


                    </form>
                </div>
            </div>
        </div>
    </div>
  <!--For Edit Modal Window  End-->

    <div id="CategoryModelEdit" tabindex="-1" aria-hidden="true" class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
        <div class="relative w-full max-w-2xl max-h-full">
            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                    <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                        Category Edit
                    </h3>
                    <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                            data-modal-hide="CategoryModelEdit">
                        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                        <span class="sr-only">Close modal</span>
                    </button>
                </div>
                <div class="p-6 space-y-6">
                    <form>
                        <div class="mb-6">
                            <label  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                            <input type="text"  v-model="editName"
                                   class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                        </div>
                        <div class="mb-6">
                            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                            <textarea id="message"  rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" >
                                {{editDesc}}
                            </textarea>
                        </div>

                    </form>
                </div>
                <!--  Modal footer  -->
                <div class="flex justify-end p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                    <button data-modal-hide="CategoryModelEdit" type="button" class="text-white bg-yellow-700 hover:bg-yellow-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-green-800">
                        Update</button>
                </div>
            </div>
        </div>
    </div>
</template>