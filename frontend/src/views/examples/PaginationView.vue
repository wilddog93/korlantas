<script setup lang="ts">
import PiPagination from '@/components/ui/PiPagination.vue';
import { ref } from 'vue';

const page = ref(1);
const limit = ref(10);
const total = ref(100);

</script>

<template>
  <h1 class="text-lg font-medium border-b pb-2 mb-5 flex">Pagination</h1>
  <div>
    <div class="mb-5">Current page: {{ page }}</div>
    <PiPagination v-model="page" :limit="limit" :total="total" />
  </div>
</template>