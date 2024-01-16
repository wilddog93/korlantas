<script setup lang="ts">
import { computed, getCurrentInstance } from 'vue';

defineOptions({
  name: 'PiCheckbox'
})
export interface Props {
  modelValue?: any
  value?: string | number | boolean | object
  id?: string
  label?: string
  disabled?: boolean
}
const instance = getCurrentInstance()

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'update:modelValue', value?: any): void,
}>()

const model = computed({
  get:() => props.modelValue,
  set:(val) => {
    emit('update:modelValue', val)
  }
})

</script>
<template>
  <div class="flex items-center mr-4">
    <input
      v-bind="$attrs"
      v-model="model"
      :value="value"
      :disabled="disabled"
      :id="id || String(`checbox-instance-${instance?.uid}`)"
      :class="['h-4 w-4 ease-soft accent-primary-600  ring-red-400', disabled ? 'cursor-not-allowed' : 'cursor-pointer']"
      type="checkbox"
    >
    <label :for="id || String(`checbox-instance-${instance?.uid}`)" :class="['ml-2 text-sm font-medium text-gray-900', { 'sr-only': !label }]">
      {{ label }}
    </label>
  </div>
</template>