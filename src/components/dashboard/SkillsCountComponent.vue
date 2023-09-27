<script lang="ts">
import axios from '../../plugins/axios'

export default {
  
    name:"cnt",
  data() {
    
    
    return {
      skillsCount: 0,
    };
  },
  mounted() {
    this.fetchTransportCount();
  },
  methods: {
    async fetchTransportCount() {
      try {
        const response = await axios.get('/api/common/skills/count');        
        this.skillsCount = response.data;
         
      } catch (error) {
        console.error('Error fetching transport count:', error);
      }
    },
  },
};
</script>

<template>
    <div class="card flex flex-col items-center w-60 border border-gray-300 rounded-lg p-5 items-center mt-3">
        <p class="light::text-white text-xl font-bold dark:text-white">{{ $t('total') }} {{ $t('skills') }}</p>
        <hr class="w-48 h-1 mx-auto my-2 bg-gray-100 border-0 rounded dark:bg-gray-700"> 
        <p class="light::text-white text-xl font-medium dark:text-white">{{ skillsCount }}</p>
      </div>
</template>
