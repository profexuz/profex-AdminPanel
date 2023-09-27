<script lang="ts">
 import {defineComponent} from "vue";
 import IconCreate from "@/components/icons/interface/IconCreate.vue";
 import axios from "@/plugins/axios";
 import LoadingCompanent from '../LoadingCompanent.vue'
 export default defineComponent({
     components:
     {
         IconCreate,
         LoadingCompanent
     },
     data(){
         return{
             vName:"",
             vLastName:"",
             vPassword:"",
             vPhone:"",
             vConfirmCode:"",
             ShowRegister:false,
             ShowVerify:false,
             verifyPhone:"",
             createError: false,
             phoneError: false,
             exitError: false,
             loading: true,
             codeError: false
         }
     },
     methods:{
        closeError(){
            this.createError = false;
            this.codeError = false;
            this.phoneError = false;
            this.exitError = false
        },
         OpenRegister(){
             this.ShowRegister = true;
             this.exitError = false,
            this.phoneError = false;
             this.createError =  false
         },
         CloseRegister(){
             this.ShowRegister = false;
             this.exitError = false,
             this.createError =  false
            this.phoneError = false;
             this.loading = true
         },
         OpenVerify(){
            this.loading = true
            this.ShowVerify = true;
            this.exitError = false,
            this.phoneError = false;
            this.createError =  false
         },
         CloseVerify(){
            this.ShowVerify = false;
            this.exitError = false,
            this.createError =  false,
            this.phoneError = false;
            this.CloseRegister();
         },
         async submitRegister(){
            try{
                if(this.validatePhoneNumber(this.vPhone)){
                    this.loading=false
                    const registerForm = new FormData();
                    registerForm.append("FirstName",this.vName);
                    registerForm.append("LastName",this.vLastName);
                    registerForm.append("PhoneNumber",this.vPhone);
                    registerForm.append("Password",this.vPassword);
                    const registerResponse = await axios.post("/api/user/register", registerForm)
                    if(registerResponse.status==200){
                        await this.submitSendCode();
                        this.CloseRegister();
                        this.OpenVerify();
                    }
                    else {
                        this.loading = true
                        this.exitError = true
                    }
                }
                else{
                    this.loading = true
                    this.phoneError = true
                }
                
            }
            catch{
                this.loading = true
                this.exitError = true
            }
        },
         async submitSendCode(){
            try {
                this.loading = false
                this.verifyPhone = this.vPhone.substring(1);
                const codeSendResponse = await axios.post("/api/user/register/send-code?phone=%2B"+this.verifyPhone);
                this.verifyPhone = this.vPhone;

                if(codeSendResponse.status == 200)
                {
                    this.CloseRegister();
                }
                else{
                    this.codeError = true
                    this.loading = true
                }

            } catch{
                this.codeError = true
                this.loading = true
            }
             
         },
         async submitVerify(){
            try {
                this.loading = false
                const formData = new FormData();
                formData.append("PhoneNumber",this.vPhone);
                formData.append("Code", this.vConfirmCode);
                const verifyForm ={
                    phoneNumber: this.verifyPhone,
                    code: this.vConfirmCode
                }
                const verifyResponse = await axios.post("/api/user/register/verify",verifyForm);
                 console.log(verifyForm);
                if(verifyResponse.status == 200){

                    this.CloseRegister();
                    location.reload();
                }else
                {
                    this.createError = true
                    this.loading = true
                }
            } catch {
                this.createError = true
                this.loading = true
            }
                
         },
         validatePhoneNumber(phoneNumber: string) {
            if(phoneNumber.length === 9){
                const phonePattern = /^[+]?[0-9]+(?:[\s\-]?[0-9]+)*$/;
                return phonePattern.test(phoneNumber);  
            }
            else{
                return false
            }
            
        },


     }

 })
</script>
<template>

<!--    button   start   -->
<button @click="OpenRegister"
            type="button" class="text-white mx-2 h-10 bg-gradient-to-r from-green-500 via-green-600 to-green-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
        <div class="flex flex items-center">
            <IconCreate></IconCreate>
            <p class="mx-2">{{ $t("create") }}</p>
        </div>
    </button>

  <!--    button   end   -->

<!--    Modal Register Start-->
    <div v-if="ShowRegister"
            class="fixed top-0 left-0 right-0 z-50 w-full h-screen flex items-center justify-center bg-black bg-opacity-50">
    <div class="relative w-full max-w-md max-h-full">
        
        <div v-if="exitError" id="alert-2" 
                    class="flex items-center p-4 mb-4 text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                    role="alert">
                    <svg class="flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor" viewBox="0 0 20 20">
                        <path
                            d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                    </svg>
                    <span class="sr-only">Info</span>
                    <div class="ml-3 text-sm font-medium">
                            {{ $t('exitNumber') }}
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

        <div v-if="phoneError" id="alert-2" 
                    class="flex items-center p-4 mb-4 text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                    role="alert">
                    <svg class="flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor" viewBox="0 0 20 20">
                        <path
                            d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                    </svg>
                    <span class="sr-only">Info</span>
                    <div class="ml-3 text-sm font-medium">
                            {{ $t('hasnumber') }}
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
                    @click="CloseRegister"
                    class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="authentication-modal">
                <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                </svg>
                <span class="sr-only">Close modal</span>
            </button>
            <div class="px-6 py-6 lg:px-8">
                <form @submit.prevent="submitRegister" class="space-y-6" action="#">
                    <div class="grid md:grid-cols-2 md:gap-6">
                        <div>
                            <label  class="block mb-2  text-sm font-medium text-gray-900 dark:text-white">
                                {{$t("fName")}} </label>
                            <input v-model="vName" type="text"  class="bg-gray-50 border border-gray-300 text-gray-900
                                       text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500
                                        block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500
                                        dark:text-white"
                                   autocomplete="off"
                                   required>
                        </div>
                        <div>
                            <label  class="block mb-2  text-sm font-medium text-gray-900 dark:text-white">
                                {{$t("lName")}} </label>
                            <input v-model="vLastName"
                                   type="text"
                                   class="bg-gray-50 border border-gray-300 text-gray-900
                                       text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500
                                        block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500
                                        dark:text-white"
                                   autocomplete="off"
                                   required>
                        </div>
                    </div>

                    <div class="mb-6">
                        <label  class="block mb-2  text-sm font-medium text-gray-900 dark:text-white">
                            {{$t("phone")}} </label>
                        <input v-model="vPhone"
                               type="text"
                               class="bg-gray-50 border border-gray-300 text-gray-900
                                   text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500
                                    block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500
                                    dark:text-white"
                               autocomplete="off"
                               required>
                    </div>
                    <div class="mb-6">
                        <label  class="block mb-2  text-sm font-medium text-gray-900 dark:text-white">
                            {{$t("password")}} </label>
                        <input v-model="vPassword" type="password" class="bg-gray-50 border border-gray-300 text-gray-900
                                   text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500
                                    block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500
                                    dark:text-white"
                               autocomplete="off"
                               required>
                    </div>

                    <button v-if="loading" type="submit"
                                 class="w-full text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-500 dark:hover:bg-green-600 dark:focus:ring-green-800">
                            {{$t("next")}}
                        </button>
                        <button v-else type="submit"
                                 class="w-full text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-500 dark:hover:bg-green-600 dark:focus:ring-green-800">
                            <LoadingCompanent></LoadingCompanent>
                        </button>

                </form>
            </div>
        </div>
    </div>
    </div>


    <!--    Modal Verify start-->
    <div v-if="ShowVerify"
         class="fixed top-0 left-0 right-0 z-50 w-full h-screen flex items-center justify-center bg-black bg-opacity-50">
        <div class="relative w-full max-w-md max-h-full">

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

            <!-- Modal content -->
            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <button type="button"
                        @click="CloseVerify"
                        class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="authentication-modal">
                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span class="sr-only">Close modal</span>
                </button>
                <div class="px-6 py-6 lg:px-8">
                    <form @submit.prevent="submitVerify" class="space-y-6" action="#">
                        <div class="mb-6">
                            <label  class="block mb-2  text-sm font-medium text-gray-900 dark:text-white">
                                {{$t("code")}} </label>
                            <input v-model="vConfirmCode"
                                   type="tel"
                                   class="bg-gray-50 border border-gray-300 text-gray-900
                                   text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500
                                    block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500
                                    dark:text-white"
                                   autocomplete="off"
                                   required>
                        </div>
                        <button v-if="loading" type="submit"
                                 class="w-full text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-500 dark:hover:bg-green-600 dark:focus:ring-green-800">
                            {{$t("create")}}
                        </button>

                        <button v-else type="submit"
                                 class="w-full text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-500 dark:hover:bg-green-600 dark:focus:ring-green-800">
                            <LoadingCompanent></LoadingCompanent>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
    <!--    Modal Verify end-->
</template>


<style scoped>

</style>