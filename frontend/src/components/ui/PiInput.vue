<script setup lang="ts">
import { computed, inject } from 'vue'
import * as feather from 'feather-icons'
import Icon from './PiIcon.vue'

export interface Props {
  modelValue?: string | number | null
  type?: 'text' | 'textarea' | 'number' | 'password' | 'email' | 'date'
  baseClass?: string
  defaultClass?: string
  errorClass?: string
  inputClass?: string
  heightClass?: string
  disableClass?: string
  placeholder?: string
  name?: string
  suffixIcon?: feather.FeatherIconNames
  prefixIcon?: feather.FeatherIconNames
  suffixIconClass?: string
  prefixIconClass?: string
  clearable?: boolean
  min?: number
  max?: number
  readonly?: boolean
  disabled?: boolean
}

defineOptions({
  name: 'PiInput'
})

defineSlots()

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  disabled: false,
  baseClass:
    'bg-white rounded-full appearance-none px-3 ring-1 focus:ring-2 focus:outline-none text-sm focus:bg-white w-full bg-white text-gray-600 transition duration-150 disabled:cursor-not-allowed',
  defaultClass: 'ring-slate-900/10 focus:ring-primary-400',
  errorClass: 'ring-red-500 focus:ring-red-400',
  disableClass: 'cursor-not-allowed bg-slate-200 ring-slate-300',
  heightClass: 'h-9'
})

const hasError = inject<Boolean>('hasError', false)

const showClearableIcon = computed(() => {
  return props.modelValue && props.clearable
})

defineEmits([
  'update:modelValue',
  'click-suffix-icon',
  'click-prefix-icon',
  'clear'
])

</script>
<template>
  <div class="relative flex items-center justify-center">
    <div class="relative flex items-center w-full">
      <div v-if="prefixIcon || $slots.prepend" class="absolute left-1 ml-2">
        <slot v-if="$slots.prepend" name="prepend"></slot>
        <Icon
          v-else-if="prefixIcon"
          class="cursor-pointer"
          :class="prefixIconClass"
          :type="prefixIcon"
          :size="20"
          @click="$emit('click-prefix-icon')"
        />
      </div>
      <div v-if="(suffixIcon || $slots.append) && !showClearableIcon" class="absolute right-0 mr-2">
        <slot v-if="$slots.append" name="append"></slot>
        <Icon
          v-else-if="suffixIcon"
          class="cursor-pointer"
          :class="suffixIconClass"
          :type="suffixIcon"
          :size="20"
          @click="$emit('click-suffix-icon')"
        />
      </div>
      <div v-if="showClearableIcon" class="absolute right-0 mr-2">
        <Icon
          class="cursor-pointer"
          type="x"
          :size="20"
          @click="$emit('clear')"
        />
      </div>
      <component
        :is="type == 'textarea' ? 'texarea' : 'input'"
        :disabled="disabled"
        :readonly="readonly"
        :type="type"
        :name="name"
        :class="[
          baseClass,
          inputClass,
          heightClass,
          hasError ? errorClass : defaultClass,
          { [disableClass]: disabled, 'pl-9': prefixIcon || $slots.prepend, 'pr-8': suffixIcon }
        ]"
        :placeholder="placeholder"
        :min="min"
        :max="max"
        v-bind="$attrs"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
      ></component>
    </div>
  </div>
</template>