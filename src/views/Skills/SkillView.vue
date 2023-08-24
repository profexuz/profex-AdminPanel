<script lang="ts">

import {defineComponent} from "vue";
import SkillCategoryBodyComponent from "@/components/skills/SkillCategoryBodyComponent.vue";
import SkillCategoryHeaderTableComponent from "@/components/skills/SkillCategoryHeaderTableComponent.vue";
import SkillTableHeaderComponent from "@/components/skills/SkillTableHeaderComponent.vue";
import SkillTableBodyComponent from "@/components/skills/SkillTableBodyComponent.vue";
import axios from "@/plugins/axios";
import type {CategoryViewModel} from "@/viewmodels/CategoryViewModels";
import CategoryCreateModalComponent from "@/components/categories/CategoryCreateModalComponent.vue";
import SkillCreateModal from "@/components/skills/SkillCreateModal.vue";
import {Dropdown, DropdownInterface, DropdownOptions} from "flowbite";

export default defineComponent({
    components:
    {
        SkillCreateModal,
        CategoryCreateModalComponent,
        SkillTableBodyComponent,
        SkillTableHeaderComponent,
        SkillCategoryHeaderTableComponent,
        SkillCategoryBodyComponent
    },
    methods:
    {
      async getDataAsync()
      {
          this.isLoaded = false;
          var response = await axios.get<CategoryViewModel[]>("/api/common/category");
          this.isLoaded = false;
          this.categoriesList = response.data;
      }
    },
    data()
    {
        return {
            categoriesList: [] as CategoryViewModel[],

            isLoaded: false as Boolean,
        }
    },
    async mounted(){
        await this.getDataAsync();
    }

})
</script>

<template>

  <!--begin:: BreadCrumb-->
    <nav class="flex justify-between mb-5" aria-label="Breadcrumb">
        <ol class="inline-flex items-center space-x-1 md:space-x-3">
            <li class="inline-flex items-center">
                <a href="#"
                   class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                         viewBox="0 0 20 20">
                        <path
                                d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                    </svg>
                    <!-- {{ $t('home') }} -->
                </a>
            </li>
            <li>
                <div class="flex items-center">
                    <svg class="w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                         viewBox="0 0 6 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="m1 9 4-4-4-4" />
                    </svg>
                    <a
                            class="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white">
                        {{  $t('skills') }}</a>
                </div>
            </li>
        </ol>
        <!--end:: BreadCrumb-->

        <SkillCreateModal></SkillCreateModal>
    </nav>
        <!--end:: BreadCrumb-->



        <div class="flex">
      <div class="mr-8">
          <div class="relative w-48  shadow-md sm:rounded-lg">
              <table class="w-48 text-sm  text-left text-gray-800 dark:text-gray-50">
                <SkillCategoryHeaderTableComponent></SkillCategoryHeaderTableComponent>
                <tbody v-for="element in categoriesList">
                  <SkillCategoryBodyComponent
                    :cId = element.id
                    :cName = element.name
                                        >
                  </SkillCategoryBodyComponent>
                </tbody>
              </table>
          </div>
      </div>

      <div>

          <div class="relative overflow-x-auto shadow-md ">
              <table class="w-full  text-sm  text-left text-gray-800 dark:text-gray-50">
                <SkillTableHeaderComponent></SkillTableHeaderComponent>

                  <tbody >
                <SkillTableBodyComponent></SkillTableBodyComponent>
                  </tbody>

              </table>
          </div>

      </div>


    </div>

</template>


<style scoped>

</style>