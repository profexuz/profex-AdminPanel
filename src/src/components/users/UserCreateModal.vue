<script lang="ts">
 import {defineComponent} from "vue";
 import IconCreate from "@/components/icons/interface/IconCreate.vue";
 import axios from "@/plugins/axios";

 export default defineComponent({
     components:
     {
         IconCreate
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
             verifyPhone:""
         }
     },
     methods:{
         OpenRegister(){
             this.ShowRegister = true;
         },
         CloseRegister(){
             this.ShowRegister = false;
         },
         OpenVerify(){
             this.ShowVerify = true;
         },
         CloseVerify(){
             this.ShowVerify = false;
             this.CloseRegister();
         },
        async submitRegister(){

             const registerForm = new FormData();
             registerForm.append("FirstName",this.vName);
             registerForm.append("LastName",this.vLastName);
             registerForm.append("PhoneNumber",this.vPhone);
             registerForm.append("Password",this.vPassword);
             const registerResponse = await axios.post("/api/user/register",registerForm)
            if(registerResponse.status==200){
                this.CloseRegister();
                this.OpenVerify();
                await this.submitSendCode();
            }
            else {
                alert("Something wrong in Register form");
            }
         },
         async submitSendCode(){
             this.verifyPhone = this.vPhone.substring(1);
             const codeSendResponse = await axios.post("/api/user/register/send-code?phone=%2B"+this.verifyPhone);
             if(codeSendResponse.status == 200)
             {
                 this.CloseRegister();
                 this.OpenVerify();
             }
             else{
                 alert("Something wrong in Send Code form");
                 console.log("status ",codeSendResponse.status);
                 console.log("vPhone ", this.vPhone );
                 console.log(codeSendResponse)
             }

         },
         async submitVerify(){
            const verifyForm ={
                phoneNumber: this.vPhone,
                code: this.vConfirmCode
            }
            const verifyResponse = await axios.post("/api/user/register/verify",verifyForm);
             console.log(verifyForm);
            if(verifyResponse.status == 200){

                this.CloseRegister();
                location.reload();
            }else
            {
                alert("Something wrong in Confirm Code form");
            }
         }


     }

 })
</script>
<template>

<!--    button   start   -->
    <button @click="OpenRegister"
        type="button" class="text-white bg-gradient-to-r from-green-500 via-green-600 to-green-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-1 ">
        <div class="flex flex-wrap items-center">
            <IconCreate></IconCreate>
            <p class="mx-2">{{ $t("create") }}</p>
        </div>
    </button>

  <!--    button   end   -->

<!--    Modal Register Start-->
    <div v-if="ShowRegister"
            class="fixed top-0 left-0 right-0 z-50 w-full h-screen flex items-center justify-center bg-black bg-opacity-50">
    <div class="relative w-full max-w-md max-h-full">
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

                    <button  type="submit"
                             class="w-full text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-500 dark:hover:bg-green-600 dark:focus:ring-green-800">
                        {{$t("next")}}
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
                        <button  type="submit"
                                 class="w-full text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-500 dark:hover:bg-green-600 dark:focus:ring-green-800">
                            {{$t("create")}}
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