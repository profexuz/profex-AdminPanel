<script lang="ts">
import { defineComponent } from 'vue';
import { useI18n } from 'vue-i18n';
import axios from '@/plugins/axios'
import { UserViewModel } from '@/viewmodels/UsersViewModel'
import DahboardSkeletonComponent from "../../components/dashboard/DahboardSkeletonComponent.vue"
import UsersComponent from '@/components/dashboard/UsersComponent.vue';
import SkillsCountComponent from '@/components/dashboard/SkillsCountComponent.vue';
import PostCountComponent from '@/components/dashboard/PostCountComponent.vue';
import CategoryCountComponent from '@/components/dashboard/CategoryCountComponent.vue';
import userImage from "../../assets/userImage.jpg"
export default defineComponent({
    components: {
        DahboardSkeletonComponent,
        UsersComponent,
        SkillsCountComponent,
        PostCountComponent,
        CategoryCountComponent,
    },
    methods: {
        async getDataAsync() {
            this.isLoaded = false;
            const response = await axios.get("/api/common/user/getAll?page=1");
            this.userlist = response.data
            this.isLoaded = true;
        },
    },
    data() {
        return {
            userlist: [] as UserViewModel[],
            defaultSkeletons: 4 as Number,
            isLoaded: false as Boolean,
        }
    },
    setup() {
        const { t } = useI18n();
    },
    async mounted() {
        await this.getDataAsync()
    },
})
</script>
<template>
    <!--begin:: Dashboard Skeletons-->
    <ul v-show="isLoaded == false">
        <template v-for="element in defaultSkeletons">
            <DahboardSkeletonComponent class="mt-2 mb-3">
            </DahboardSkeletonComponent>
        </template>
    </ul>
    <!--end:: Dashboard Skeletons-->
    <div class="flex h-52">

        <a href="/users"
            class="flex mr-10 flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
            <img class="image-container w-64 h-full px-2 pt-2" src="http://64.227.42.134:4040/media/avatarmaster/user.jpg"
                alt="">
            <div class="flex flex-col justify-between p-4 leading-normal">
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"> {{ $t('users') }}</h5>
                <p class="mb-2 font-normal text-gray-700 dark:text-gray-400">{{ $t('titalMaster') }}</p>
            </div>
        </a>

        <a href="/masters"
            class="flex w-120 flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
            <img class="image-container  w-64 h-full px-2 pt-2" src="http://64.227.42.134:4040/media/avatarmaster/ustaa.jpg"
                alt="">
            <div class="flex flex-col justify-between p-4 leading-normal">
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{{ $t('masters') }}</h5>
                <p class="mb-2 font-normal text-gray-700 dark:text-gray-400">{{ $t('titalUsers') }}</p>
            </div>
        </a>

    </div>



    <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
        <SkillsCountComponent></SkillsCountComponent>
        <PostCountComponent></PostCountComponent>
        <CategoryCountComponent></CategoryCountComponent>
    </div>
    <div class="mt-7 flex items-center justify-between 4mb-">
        <h5 class="text-xl font-bold leading-none text-gray-900 dark:text-white">{{ $t('latest') }}</h5>
        <a href="/users" class="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">
            {{ $t("view") }}
        </a>
    </div>
    <div class="flow-root my-3">
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" class="px-6 py-3">
                            {{ $t('image') }}
                        </th>
                        <th scope="col" class="px-6 py-3">
                            {{ $t('fullname') }}
                        </th>
                        <th scope="col" class="px-6 py-3">
                            {{ $t('phone') }}
                        </th>
                        <th scope="col" class="px-6 py-3">
                            {{ $t('createAt') }}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <template v-for="element in userlist">
                        <UsersComponent :firstName=element.firstName :lastName=element.lastName :imagePath=element.imagePath
                            :phoneNumber=element.phoneNumber :createdAt=element.createdAt>
                        </UsersComponent>
                    </template>
                </tbody>
            </table>
        </div>





    </div>
</template>


<style scoped>
.image-square {
    width: 100%;
    height: 100%;
    max-width: 280px;
    max-height: 265px;
    object-fit: cover;
    object-position: top;
    aspect-ratio: 1/1;
}

.image-container {
    position: relative;
}
</style>  