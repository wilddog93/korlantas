<script setup lang="ts">
import PiCheckbox from '@/components/ui/PiCheckbox.vue';
import { ref } from 'vue';

const isChecked = ref(false);
const checkValue = ref(1);
</script>

<template>
  <h1 class="text-lg font-medium border-b pb-2 mb-5 flex">Checkbox</h1>
  <div>
   <div class="flex space-x-3">
     <PiCheckbox v-model="isChecked" :label="isChecked ? 'checked' : 'Unchecked'"></PiCheckbox>
     <PiCheckbox v-model="checkValue" :true-value="1" :false-value="0" :label="`Value is ${checkValue}`"></PiCheckbox>
   </div>
  </div>
</template>