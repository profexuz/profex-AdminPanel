<script lang="ts">
import axios from '../../plugins/axios'

export default {

  name: "cnt",
  data() {


    return {
      categoryCount: 0,
    };
  },
  mounted() {
    this.fetchTransportCount();
  },
  methods: {
    async getDataAsync() {
      this.isLoaded = false;
      var response = await axios.get("/api/common/categories");
      this.isLoaded = true;
      console.log(response.data);
      this.categoriesList = response.data;
    },

    async fetchTransportCount() {
      try {
        const response = await axios.get('/api/common/categories');

        if (Array.isArray(response.data)) {
          const dataLength = response.data.length;
          this.categoryCount = dataLength;
        } else {
          console.error('Response data is not an array.');
        }

      } catch (error) {
        console.error('Error fetching transport count:', error);
      }
    },
  },
};
</script>

<template>
  <div class="card flex flex-col items-center w-60 border border-gray-300 rounded-lg p-5 items-center mt-3">
    <p class="light::text-white text-xl font-bold dark:text-white">{{ $t('total') }} {{ $t('categories') }}</p>
    <hr class="w-48 h-1 mx-auto my-2 bg-gray-100 border-0 rounded dark:bg-gray-700">
    <p class="light::text-white text-xl font-medium dark:text-white">{{ categoryCount }}</p>
  </div>
</template>
