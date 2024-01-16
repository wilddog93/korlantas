<script setup lang="ts">
import PiSelect, { type Option as SelectOption } from '@/components/ui/PiSelect.vue';
import { ref } from 'vue';

const value = ref<any>();
const items: SelectOption[] = [
  { label: 'Horse', value: 'Horse' },
  { label: 'Dog', value: 'Dog' },
  { label: 'Cat', value: 'Cat' },
  { label: 'Dinosaurus', value: 'Dinosaurus' },
  { label: 'Lion', value: 'Lion' },
]
</script>

<template>
  <h1 class="text-lg font-medium border-b pb-2 mb-5 flex">Select</h1>
  <div>
    <div class="mb-5">Value is: {{ value }}</div>
    <PiSelect v-model="value" :options="items" :selected-text="value"></PiSelect>
  </div>
</template>