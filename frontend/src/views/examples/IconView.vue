<script setup lang="ts">
import PiIcon from '@/components/ui/PiIcon.vue';
import { icons as featherIcons } from 'feather-icons';

const icons = Object.keys(featherIcons) as feather.FeatherIconNames[];
const copy = (text:string) => {
  const script = `<PiIcon type="${text}" />`;
  navigator.clipboard.writeText(script);
  alert('copied');
}
</script>

<template>
  <h1 class="text-lg font-medium border-b pb-2 mb-5 flex">Icons</h1>
  <div class="grid grid-cols-6 gap-10 max-w-screen-md mx-auto">
    <div v-for="icon in icons" :key="icon" class="text-center">
      <PiIcon
        :type="icon"
        class="cursor-pointer mx-auto text-gray-600 mb-3"
        @click="copy(icon)"
      />
      <span class="text-sm text-gray-600">
        {{ icon }}
      </span>
    </div>
  </div>
</template>