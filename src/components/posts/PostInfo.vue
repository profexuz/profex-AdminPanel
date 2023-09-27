<script lang="ts">
import { defineComponent } from "vue";
import FlowbiteSetup from "@/FlowbiteSetup.vue";
import PointIcon from "../icons/interface/PointIcon.vue"
import IconCalendar from "../../components/icons/interface/IconCalendar.vue";
import IconCalendarEdit from "../../components/icons/interface/IconCalendarEdit.vue";
import IconCategories from "../icons/IconCategories.vue";
import IconRegion from "../icons/interface/IconRegion.vue"
import IconPhone from "../icons/interface/IconPhone.vue"
import PostDeleteModal from "./PostDeleteModal.vue";
export default defineComponent({
    components: {
        FlowbiteSetup,
        PointIcon,
        IconCalendarEdit,
        IconCalendar,
        IconCategories,
        IconRegion,
        IconPhone,
        PostDeleteModal,
    },
    props: {
        idK: Number,
        categoryNameK: String,
        createdAtK: String,
        updatedAtK: String,
        titleK: String,
        firstNameK: String,
        lastNameK: String,
        descriptionK: String,
        regionK: String,
        phoneNumberK: String,
        districtK: String,
    },
    watch:{
        idK:"load"

    },
    methods: {
        load() {
            this.idS = this.idK!;
            this.categoryNameS = this.categoryNameK!;
            this.createdAtS = this.createdAtK!;
            this.updatedAtS = this.updatedAtK!;
            console.log(this.createdAtS, this.updatedAtS)
            this.titleS = this.titleK!;
            this.firstNameS = this.firstNameK!;
            this.lastNameS = this.lastNameK!;
            this.descriptionS = this.descriptionK!;
            this.regionS = this.regionK!;
            this.phoneNumberS = this.phoneNumberK!;
            this.districtS = this.districtK!;
        },
        openModal() {
            debugger;
            this.showInfoModal = true;
        },
        closeModal() {
            this.showInfoModal = false;
        },
    },
    data() {
        return {
            showInfoModal: false,
            idS: 0 as Number,
            categoryNameS: "" as String,
            createdAtS: "" as String,
            updatedAtS: "" as String,
            titleS: "" as String,
            firstNameS: "" as String,
            lastNameS: "" as String,
            descriptionS: "" as String,
            regionS: "" as String,
            phoneNumberS: "" as String,
            districtS: "" as String,
        }
    },
    mounted() {
        this.load()
    }

})


</script>

<template>
    <div class="block space-y-4 md:flex md:space-y-0 md:space-x-4">
        <!-- Modal toggle -->
        <button @click="openModal"
            class=" mt-2 w-full justify-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            <PointIcon></PointIcon>
        </button>
    </div>



    <!-- Default Modal -->
    <div v-if="showInfoModal"
        class="fixed top-0 left-0 right-0 z-50 w-full h-screen flex items-center justify-center bg-black bg-opacity-50">
        <div class="relative w-full max-w-lg max-h-full">
            <!-- Modal content -->
            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <!-- Modal header -->
                <div class="flex items-center justify-between p-5 border-b rounded-t dark:border-gray-600">
                    <h5 class="text-xl font-bold tracking-tight text-gray-900 dark:text-white"> {{ firstNameS }}</h5>

                    <h5 class="mx-3 text-xl font-bold tracking-tight text-gray-900 dark:text-white"> {{ lastNameS }}</h5>
                    <button @click="closeModal"
                        class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                        data-modal-hide="medium-modal">
                        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                            viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                        </svg>
                        <span class="sr-only">Close modal</span>
                    </button>
                </div>
                <!-- Modal body -->
                <div class="px-2 pt-1 pb-2">
                    <h5 class="text-xl font-bold tracking-tight text-center text-gray-900 dark:text-white">{{ titleS }}</h5>

                    <div class="flex">
                        <p class="my-5 flex font-normal text-gray-700 dark:text-gray-400">
                            <IconRegion></IconRegion> {{ $t('region') }}: {{ regionS }}
                        </p>
                        <p class="my-5 mx-5 flex font-normal text-gray-700 dark:text-gray-400">
                            <IconRegion></IconRegion> {{ $t('district') }}: {{ districtS }}
                        </p>
                    </div>

                    <p class="my-5 flex font-normal text-gray-700 dark:text-gray-400">
                        <IconCategories></IconCategories> {{ $t('categories') }}: {{ categoryNameS }}
                    </p>
                    <p class="my-5 flex font-normal text-gray-700 dark:text-gray-400"><IconPhone></IconPhone> {{ $t('phone') }}: {{ phoneNumberS }}</p>
                    <p class="my-5 font-normal text-gray-700 dark:text-gray-400">{{ $t('description') }}: 
                        {{ descriptionS }}</p>

                    <div class=" flex flex-items">
                        <div class="flex mt-1 flex-items items-center ">
                            <IconCalendar></IconCalendar>
                            <p class="me-5 mx-1 font-normal bold text-gray-700 dark:text-gray-400">{{ createdAtK }}</p>
                        </div>
                        <div class="flex mt-1 flex-wrap items-center ">
                            <IconCalendarEdit></IconCalendarEdit>
                            <p class="mx-1 font-normal bold text-gray-700 dark:text-gray-400">{{ updatedAtK }}</p>
                        </div>
                    </div>
                    <PostDeleteModal :id-master="idS"></PostDeleteModal>
                </div>
            </div>
        </div>
    </div>




    <FlowbiteSetup></FlowbiteSetup>
</template>