<script lang="ts">
import PostViewComponent from "@/components/posts/PostViewComponent.vue";
import { defineComponent } from "vue";
import { useI18n } from 'vue-i18n';
import axios from "@/plugins/axios";
import PostViewModelAA from "@/viewmodels/PostsViewModel"

export default defineComponent ({
    components: {
        PostViewComponent,
    },
    methods:{
        async getDataAsync(){

            var response = await axios.get<PostViewModelAA[]>("/api/common/post");

            console.log(response.data);
            this.postList = response.data;
        }
    },
    data()
    {
        return{
            postList : [] as PostViewModelAA[],
        }
    },
    setup(){
        const {t} = useI18n();
    },
    async mounted(){
        await this.getDataAsync();
    }
});
</script>
<template>




    <ul class="grid grid-cols-3 md:grid-cols-3 gap-5">

              <template v-for="item in postList">

              <PostViewComponent
                      :categoryId=item.categoryId
                      :userId = item.userId
                      :title= item.title
                      :price= item.price
                      :description= item.description
                      :region= item.region
                      :district= item.district
                      :longitude= item.longitude
                      :latidute= item.latidute
                      :phoneNumber= item.phoneNumber
                      :imagePath= item.imgaePath
                  :firstName= item.firstName
                  :lastName= item.lastName
                  :categoryName= item.categoryName
                  :skillTitle= item.skillTitle
                  :createdAt = item.createdAt
                  :updatedAt: = item.updatedAt
                  :id= item.id






                  >
            </PostViewComponent>
              </template>


    </ul>




</template>



<style scoped>

</style>