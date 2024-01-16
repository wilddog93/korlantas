<script setup lang="ts">
import PiButton from '@/components/ui/PiButton.vue';
import PiModal from '@/components/ui/PiModal.vue';
import { ref } from 'vue';

const show = ref(false);
const ok = () => {
  console.log('ok')
}

</script>

<template>
  <h1 class="text-lg font-medium border-b pb-2 mb-5 flex">Modals</h1>
  <div>
    <div class="flex space-x-3">
      <PiButton variant="primary" @click="show = true">Show Modal</PiButton>
    </div>
    <PiModal v-model="show" @ok="ok">
      Hallo this is modal
    </PiModal>
  </div>
</template>