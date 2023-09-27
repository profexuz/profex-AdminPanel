<script lang="ts">
import PostViewComponent from "@/components/posts/PostViewComponent.vue";
import { defineComponent } from "vue";
import { useI18n } from 'vue-i18n';
import axios from "@/plugins/axios";
import { PostViewModelAA } from "@/viewmodels/PostsViewModel"
import { PaginationMetaData } from "@/Utils/PaginationUtils";
import IconRefresh from "@/components/icons/interface/IconRefresh.vue";
import PostSkelation from "../../components/posts/PostSkelation.vue"
export default defineComponent({
    components: {
        PostViewComponent,
        IconRefresh,
        PostSkelation
    },
    methods: {
        async getDataAsync(page: number) {
            this.isLoaded = false;
            this.paginationBool = true;
            var response = await axios.get<PostViewModelAA[]>("/api/common/posts?page=" + page);
            const paginationJson = JSON.parse(response.headers['x-pagination']);
            this.metaData = new PaginationMetaData();
            this.metaData.currentPage = paginationJson.CurrentPage;
            this.metaData.totalPages = paginationJson.TotalPages;
            this.metaData.hasNext = paginationJson.HasNext;
            this.metaData.hasPrevious = paginationJson.HasPrevious;
            this.postList = response.data;
            this.isLoaded = true;
        },
        async searchDataAsync() {
            if (this.searchString.trim() === '') {
                this.paginationBool= true
                await this.getDataAsync(1);
                return;
            }
            try {
                this.paginationBool = false
                this.isLoaded = false;
                const response = await axios.get("/api/common/posts/search?search=" + this.searchString + "&page=1");
                this.postList = response.data;
                console.log(this.postList)
            }
            catch (error) {
                console.log(error)
            }
            finally {
                this.isLoaded = true;
            }
        },
        async refresh(){
            debugger;
            this.searchString = ""
            this.selectId = "-1"
            this.$router.push({
    name: "posts", // Replace with the actual name of your destination route
    params: {
      id: "-1",
    }})
            console.log(this.selectId, this.$route.params.id);
            
            await this.getDataAsync(1)
        },
        async getDataChildAsync(myId:string)
        {
            debugger;
            this.isLoaded = false
            var responce = await axios.get('/api/common/posts/users/' + myId + '?page=1')
            this.postList = responce.data
            this.isLoaded = true
        },
        async load(){
            if (this.selectId == null) {
                this.paginationBool =true;
                this.getDataAsync(1);
            } else {
            this.getDataChildAsync(this.selectId);
        }
        }
    },
    // watch:{
    //     postList:"searchDataAsync"
    // },
    data() {
        return {
            postList: [] as PostViewModelAA[],
            metaData: new PaginationMetaData(),
            page: 1 as number,
            isLoaded: false as boolean,
            searchString: "",
            Aurl:"" as String,
            defaultSkeletons: 6 as Number,
            selectId: this.$route.params.id,
            paginationBool: false
        }
    },
    setup() {
        const { t } = useI18n();
    },
    async mounted() {
       await this.load()
    }
});
</script>
<template>
    <nav class="justify-between mb-5" aria-label="Breadcrumb">
        <div class="flex ">
        <ol class="inline-flex items-center space-x-1 md:space-x-3">
            <li class="inline-flex items-center">
                <a href="#"
                    class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                        viewBox="0 0 20 20">
                        <path
                            d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                    </svg>
                </a>
            </li>
            <li class="inline-flex items-center">
                <div class="flex items-center">
                    <svg class="w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                        fill="none" viewBox="0 0 6 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="m1 9 4-4-4-4" />
                    </svg>
                    <a
                        class="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white">
                        {{ $t('Posts') }}
                    </a>
                </div>
            </li>
        </ol>
        <form class="flex justify-end pb-5 w-full">
            <div class="flex h-10 relative right-0 w-2/5">
                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                    </svg>
                </div>
                <input v-model="searchString" @input="searchDataAsync" type="search" id="default-search"
                    class="flex end w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                     />
            </div>
        </form>

        <button @click="refresh"
            type="button" class="mx-2 h-10 text-yellow-700 border border-yellow-700 hover:bg-yellow-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:border-yellow-500 dark:text-yellow-500 dark:hover:text-white dark:focus:ring-yellow-800 dark:hover:bg-yellow-500">
        <div class="flex flex items-center">
            <IconRefresh></IconRefresh>
        </div>
    </button>
        </div>
    </nav>

    <!--end:: BreadCrumb-->

    <ul class="grid grid-cols-3 md:grid-cols-3 gap-5" v-show="isLoaded == false">
        <template v-for="element in defaultSkeletons">
            <PostSkelation></PostSkelation>            
        </template>
    </ul>


    <ul class="grid grid-cols-3 md:grid-cols-3 gap-5" v-show="isLoaded == true">
        <template v-for="item in postList">
            <PostViewComponent :category-id=item.categoryId :user-id=item.userId :title=item.title :price=item.price
                :description=item.description :region=item.region :district=item.district :longitude=item.longitude
                :latidute=item.latidute :phoneNumber=item.phoneNumber :imagePath=item.imagePath :firstName=item.firstName
                :lastName=item.lastName :categoryName=item.categoryName 
                :createdAt=item.createdAt :updatedAt=item.updatedAt :id=item.id>
            </PostViewComponent>
        </template>
    </ul>



    <!-- start:: Pagination-->

    <nav v-if = paginationBool aria-label="Page navigation example">
        <ul class="flex items-center-space-x-px mt-3 h-8 text-sm">
            <li v-show="metaData.hasPrevious == true">
                <button @click="getDataAsync(metaData.currentPage - 1)"
                    class="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                    <span class="sr-only">Previous</span>
                    <svg class="w-2.5 h-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                        viewBox="0 0 6 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M5 1 1 5l4 4" />
                    </svg>
                </button>
            </li>

            <li v-for="el in metaData.totalPages">
                <button @click="getDataAsync(el)"
                    class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                    {{ el }}</button>
            </li>

            <li v-show="metaData.hasNext == true">
                <button @click="getDataAsync(metaData.currentPage + 1)"
                    class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                    <span class="sr-only">Next</span>
                    <svg class="w-2.5 h-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                        viewBox="0 0 6 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="m1 9 4-4-4-4" />
                    </svg>
                </button>
            </li>
        </ul>
    </nav>


    <!--    end:: Pagination-->
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