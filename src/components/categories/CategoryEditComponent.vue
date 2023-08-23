<script lang="js">

export  default {
    name : "EditComponent",
    props: ['id','name','description']




}
</script>
<template>

 <!-- &lt;!&ndash; Main modal &ndash;&gt; -->
   <div :id="'defaultModal'+id" tabindex="-1" aria-hidden="true" class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
       <div class="relative w-full max-w-2xl max-h-full">
<!--            &lt;!&ndash; Modal content &ndash;&gt;-->
           <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
<!--                &lt;!&ndash; Modal header &ndash;&gt;-->
               <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                   <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                       Category Edit
                   </h3>
                   <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="defaultModal">
                       <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                           <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                       </svg>
                       <span class="sr-only">Close modal</span>
                   </button>
               </div>
<!--                &lt;!&ndash; Modal body &ndash;&gt;-->
               <div class="p-6 space-y-6">
                   <form>
                       <div class="mb-6">
                           <label  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                           <input type="text"  value="{{name}}"
                                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                       </div>
                       <div class="mb-6">
                           <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                           <textarea id="message" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" ></textarea>
                       </div>

                   </form>
               </div>
               <!--  Modal footer  -->
               <div class="flex justify-end p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                   <button data-modal-hide="defaultModal" type="button" class="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Create</button>
               </div>
           </div>
       </div>
   </div>


</template>



<style scoped>

</style>