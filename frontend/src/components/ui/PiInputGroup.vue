<script setup lang="ts">
import { provide, toRef } from 'vue';

interface Props {
  label?: string
  labelClass?: string
  labelHint?: string
  hint?: string
  mask?: string | number
  hasError?: boolean
  required?: boolean
}

defineOptions({
  name: 'PiInputGroup'
})

const props = defineProps<Props>()

provide('hasError', toRef(props, 'hasError'));

</script>

<template>
  <div class="relative mb-3">
    <div class="mb-1">
      <label v-if="label" class="text-gray-500 block text-sm font-medium" :class="labelClass">
        {{ label }} <span v-if="required" class="text-red-500">*</span>
      </label>
      <span v-if="labelHint" class="text-sm text-gray-500">
        {{ labelHint }}
      </span>
    </div>
    <slot></slot>
    <span
      v-if="hint"
      :class="['block text-xs mt-1', hasError ? 'text-red-500' : 'text-gray-600']"
    >
      {{ hint }}
    </span>
    <span
      v-if="mask"
      :class="['block text-xs mt-1 text-green-600']"
    >
      {{ mask }}
    </span>
  </div>
</template>