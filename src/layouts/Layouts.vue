<script setup lang="ts">
import Header from "../components/common/Header.vue";
import Sidebar from "../components/common/Sidebar.vue";
import Footer from "../components/common/Footer.vue";
import ThemeSetter from '../components/common/ThemeSetter.vue'
import { RouterView } from "vue-router";
import FlowBiteSetup from "../FlowbiteSetup.vue";

import Cookies from 'js-cookie';

</script>

<template>
  <FlowBiteSetup></FlowBiteSetup>
  <ThemeSetter></ThemeSetter>
  <Header></Header>
  <Sidebar></Sidebar>
  <div class="p-4 sm:ml-64">
   <div class="p-4 mt-14">
     <RouterView></RouterView>
     <Footer></Footer>
   </div>
  </div> 
</template>