<script lang="ts">

import {defineComponent} from "vue";
import LoadingCompanent from "../LoadingCompanent.vue";
import axios from '@/plugins/axios';
export default defineComponent({
    components: {
        LoadingCompanent
    },
    props:
        {
            editId : Number,
            nameProp:String,
            lastnameProp:String,
            phoneProp:String,

        },
    data(){
        return{
            modalShow : false,
            vname : ""  ,
            vlname: "" ,
            vphone: "" ,
            selectedImage: null,
            errorModal: false,
            loading: true
        };
    },
    methods:{
        closeError(){
            this.errorModal = false;
        },
        handleImageChange(event: any) {
            this.selectedImage = event.target.files[0];
        },
        openModal(){
            this.modalShow = true;
            this.vname = this.nameProp!;
            this.vlname = this.lastnameProp!;
            this.vphone = this.phoneProp!;
            this.loading = true
            this.errorModal = false
        },
        closeModal()
        {
            this.modalShow = false;
            this.errorModal = false
        },
        async submitForm(){
            try {
                this.loading=false
                const formData = new FormData();
                formData.append("FirstName", this.vname);
                formData.append("LastName", this.vlname);
                formData.append("PhoneNumber", this.vphone);
                if (this.selectedImage) {
                    formData.append("ImagePath", this.selectedImage);
                }
                const responce = await axios.put("/api/admin/users/" + this.editId, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                if (responce.status == 200) {
                    location.reload();
                    this.closeModal();
                }
            } catch {
                this.loading = true;
                this.errorModal = true
            }
                
        }

    }
});
</script>

<template>
    <!-- Modal toggle -->
    <button @click="openModal"
            class="mt-2 w-full justify-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        {{$t("edit")}}

    </button>

    <!-- Main modal -->
    <div v-if="modalShow"
         class="fixed top-0 left-0 right-0 z-50 w-full h-screen flex items-center justify-center bg-black bg-opacity-50">
        <div class="relative w-full max-w-md max-h-full">
            <div v-if="errorModal" id="alert-2" 
                    class="flex items-center p-4 mb-4 text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                    role="alert">
                    <svg class="flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor" viewBox="0 0 20 20">
                        <path
                            d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                    </svg>
                    <span class="sr-only">Info</span>
                    <div class="ml-3 text-sm font-medium">
                            {{ $t('errorUpdate') }}
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
            <!-- Modal content -->
            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <button type="button"
                        @click="closeModal"
                        class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="authentication-modal">
                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span class="sr-only">Close modal</span>
                </button>
                <div class="px-6 py-6 lg:px-8">
                    <form @submit.prevent="submitForm" class="space-y-6" action="#">
                        <div class="grid md:grid-cols-2 md:gap-6">
                            <div>
                                <label  class="block mb-2  text-sm font-medium text-gray-900 dark:text-white">
                                    {{$t("fName")}} </label>
                                <input v-model="vname" type="text"  class="bg-gray-50 border border-gray-300 text-gray-900
                                       text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500
                                        block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500
                                        dark:text-white"
                                       required>
                            </div>
                            <div>
                                <label  class="block mb-2  text-sm font-medium text-gray-900 dark:text-white">
                                    {{$t("lName")}} </label>
                                <input v-model="vlname" type="text" class="bg-gray-50 border border-gray-300 text-gray-900
                                       text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500
                                        block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500
                                        dark:text-white"
                                       required>
                            </div>
                        </div>
                        <div>
                            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="user_avatar">
                                {{$t("image")}} </label>
                            <input @change="handleImageChange" accept="image/png, image/gif, image/jpeg" class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="user_avatar_help" id="user_avatar" type="file">
                        </div>

                        <div class="mb-6">
                            <label  class="block mb-2  text-sm font-medium text-gray-900 dark:text-white">
                                {{$t("phone")}} </label>
                            <input v-model="vphone" type="text" class="bg-gray-50 border border-gray-300 text-gray-900
                                   text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500
                                    block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500
                                    dark:text-white"
                                   required>
                        </div>

                        <button v-if="loading" type="submit"
                                 class="w-full text-white bg-yellow-500 hover:bg-yellow-600 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-yellow-500 dark:hover:bg-yellow-600 dark:focus:ring-yellow    -800">
                            {{$t("edit")}}
                        </button>
                        <button  v-else
                                 class="w-full text-white bg-yellow-500 hover:bg-yellow-600 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-yellow-500 dark:hover:bg-yellow-600 dark:focus:ring-yellow    -800">
                            <LoadingCompanent></LoadingCompanent>
                        </button>

                    </form>
                </div>
            </div>
        </div>
    </div>
</template>



<style scoped>

</style>