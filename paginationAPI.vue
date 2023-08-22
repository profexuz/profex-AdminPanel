<template>
  <div>
    <ul>
      <li v-for="item in currentPageData" :key="item.id">{{ item.name }}</li>
    </ul>
    <button @click="loadPage(currentPage - 1)" :disabled="currentPage === 1">Previous</button>
    <button @click="loadPage(currentPage + 1)" :disabled="currentPage === totalPages">Next</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import axios from 'axios';

interface PaginationInfo {
  HasPrevious: boolean;
  HasNext: boolean;
  CurrentPage: number;
  TotalPages: number;
  PageSize: number;
  TotalItems: number;
}

export default defineComponent({
  name: 'PaginationComponent',
  setup() {
    const currentPage = ref(1);
    const itemsPerPage = 30;
    const totalPages = ref(0);
    const currentPageData = ref<any[]>([]); // Replace 'any' with your data type

    const loadData = async (page: number) => {
      try {
        const response = await axios.get(`your-api-endpoint?page=${page}&pageSize=${itemsPerPage}`);
        currentPageData.value = response.data;
        const paginationHeader = response.headers['x-pagination'];
        const paginationInfo: PaginationInfo = JSON.parse(paginationHeader);
        totalPages.value = paginationInfo.TotalPages;
        currentPage.value = paginationInfo.CurrentPage;
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const loadPage = (page: number) => {
      if (page >= 1 && page <= totalPages.value) {
        loadData(page);
      }
    };

    onMounted(() => {
      loadData(currentPage.value);
    });

    return {
      currentPage,
      currentPageData,
      totalPages,
      loadPage,
    };
  },
});
</script>
