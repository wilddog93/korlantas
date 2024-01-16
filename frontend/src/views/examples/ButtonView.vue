<script setup lang="ts">
import PiButton, { type Props as ButtonProps } from '@/components/ui/PiButton.vue';
import PiIcon from '@/components/ui/PiIcon.vue';
import PiSelect, { type Option as SelectOption } from '@/components/ui/PiSelect.vue';
import PiCheckbox from '@/components/ui/PiCheckbox.vue';
import { ref } from 'vue';

const variant = ref('primary');
const disabled = ref(false)
const loading = ref(false)

const items: SelectOption[] = [
  { label: 'Primary', value: 'primary' },
  { label: 'Secondary', value: 'secondary' },
  { label: 'Dark', value: 'dark' },
  { label: 'Error', value: 'error' },
]
</script>

<template>
  <h1 class="text-lg font-medium border-b pb-2 mb-5 flex">Buttons</h1>
  <div>
    <div class="flex space-x-3">
      <PiButton :variant="(variant as ButtonProps['variant'])" :loading="loading" :disabled="disabled">Button</PiButton>
      <PiButton variant="error">
        <div class="flex items-center space-x-3">
          <PiIcon :size="16" type="trash" class="text-white"></PiIcon>
          <span>Delete</span>
        </div>
      </PiButton>
    </div>
    <div class="flex space-x-3 items-center mt-10">
      <div class="w-48">
        <PiSelect v-model="variant" :options="items" :selected-text="items.find(item => item.value == variant)?.label" />
      </div>
      <div>
        <PiCheckbox v-model="disabled" label="Disabled"></PiCheckbox>
      </div>
      <div>
        <PiCheckbox v-model="loading" label="Loading"></PiCheckbox>
      </div>
    </div>
  </div>
</template>