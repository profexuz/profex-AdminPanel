<template>
    <div class="card flex border mb-3 border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div class="flex-auto p-3">
        <div class="animate-pulse">
          <h5 class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">&nbsp;</h5>
          <p class="font-normal text-gray-700 dark:text-gray-400">&nbsp;</p>
          <div class="w-44">
            <button class="inline-flex text-gray-700 w-full items-center justify-center mt-1 text-l font-medium rounded hover:text-gray-900 bg-gray-100 dark:text-gray-200 dark:bg-gray-600 px-3 dark:hover:bg-gray-700 dark:hover:text-white">
              <span class="w-full">&nbsp;</span>
              <svg class="w-4 h-4 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
              </svg>
            </button>
          </div>
          <div class="flex flex-wrap items-center mt-2 mb-2">
            <div class="w-5 h-5 bg-gray-200 rounded-full animate-pulse"></div>
            <p class="me-5 mx-1 font-normal bold text-gray-700 dark:text-gray-400">&nbsp;</p>
            <div class="w-5 h-5 bg-gray-200 rounded-full animate-pulse"></div>
            <p class="mx-1 font-normal bold text-gray-700 dark:text-gray-400">&nbsp;</p>
          </div>
        </div>
      </div>
      <div class="flex-none w-16">
        <div class="animate-pulse">
          <CategoryEditComponent :nameProp="null" :descriptionProp="null" :idProp="null"></CategoryEditComponent>
          <button type="button" class="mt-5 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
            <CategoryDeleteComponents :id-category="null"></CategoryDeleteComponents>
          </button>
        </div>
      </div>
    </div>
  </template>
  