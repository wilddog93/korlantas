<script setup lang="ts">
import { computed, inject, ref, watch } from 'vue';
import PiIcon from './PiIcon.vue';
import PiInput from './PiInput.vue';
import { onClickOutside, useElementBounding, useVModels, useWindowSize } from '@vueuse/core';

export interface Option {
  label: string
  value: any,
  disabled?: boolean
}

export interface Props {
  options: Option[]
  disabled?: boolean
  modelValue?: any
  placeholder?: string
  closeOnselect?: boolean
  search?: string
  showSearch?: boolean
  loading?: false
  selectedText: string | undefined | null | Function
  btnClass?: any;
}

defineOptions({
  name: 'PiSelect2'
})

const props = withDefaults(defineProps<Props>(), {
  placeholder: 'Please select',
  closeOnselect: true,
})
const emit = defineEmits()

const tabIndex = ref(0);
const hasError = inject<Boolean>('hasError', false)

const { modelValue, search } = useVModels(props, emit)

const showDropdown = ref(false)
const target = ref<HTMLElement | null>(null)
const dropdown = ref<HTMLElement | null>(null)
const button = ref<HTMLButtonElement | null>(null)

onClickOutside(target, () => showDropdown.value = false)

const {
  width: parentWidth,
  top: parentTop,
  left: parentLeft,
  bottom: parentBottom
} = useElementBounding(button);

const { height: dropdownHeight } = useElementBounding(dropdown)
const { height: windowHeight } = useWindowSize()

const dropdownTopPosition = computed(() => {
  return parentBottom.value + dropdownHeight.value >= windowHeight.value
    ? parentTop.value - dropdownHeight.value - 10
    : parentTop.value + 35
})

const toggle = () => showDropdown.value = !showDropdown.value
const close = () => showDropdown.value = false

watch(showDropdown, (val) => {
  return val ? emit('open') : emit('close')
})

const setValue = (value: any, i?: number) => {
  if (i) tabIndex.value = i;
  if (props.closeOnselect) close();
  if (search?.value) search.value = '';
  modelValue.value = value;
}

const increment = () => {
  if (props.options.length - 1 > tabIndex.value) {
    tabIndex.value++
  }
}

const decrement = () => {
  if (tabIndex.value > 0) tabIndex.value--;
}
</script>
<template>
  <div class="relative" ref="target" @keyup.down="increment" @keyup.up="decrement"
    @keyup.enter="setValue(options[tabIndex].value)">
    <div>
      <button ref="button" :class="[btnClass, {
        'rounded-lg h-9 ': !btnClass,
        'ring-primary-500 ring-2': showDropdown,
        'ring-red-500 focus:ring-red-400': hasError,
        'ring-slate-900/10': !hasError,
      }]"
        class="appearance-none outline-none ring-1 focus:outline-none justify-center items-center flex w-full px-3 focus:shadow-inner"
        type="button"
        @click="toggle"
      >
        <slot>
          <span
            :class="['text-sm', selectedText != null ? 'text-gray-600' : 'text-gray-400']"
          >
            {{ (typeof selectedText == 'function' ? selectedText(modelValue) : selectedText) || placeholder }}
          </span>
        </slot>
        <span class="ml-auto">
          <PiIcon :type="showDropdown ? 'chevron-up' : 'chevron-down'" size="16"></PiIcon>
        </span>
      </button>
      <div v-if="showDropdown" ref="dropdown"
        :style="{ width: parentWidth + 'px', left: parentLeft + 'px', top: dropdownTopPosition + 'px', zIndex: 99999 }"
        class="bg-white border border-gray-300 mt-1 py-2 px-2 rounded-lg max-h-80 overflow-y-scroll drop-shadow-sm fixed">
        <PiInput v-if="showSearch" v-model="search" placeholder="Search" clearable @clear="search = ''" />
        <template v-if="loading">
          <div class="px-3 py-4">
            <div v-for="i in 2" :key="i" class="animate-pulse flex space-x-4 mt-2">
              <div class="rounded-full bg-slate-300 w-full h-3 mb-1"></div>
              <span class="sr-only">loading</span>
            </div>
          </div>
        </template>
        <ul v-else-if="options.length" class="mt-2">
          <li v-for="(o, i) in options" :key="i" class="mb-1">
            <a href="#" :class="[
              'block py-2 hover:bg-slate-100 px-3 rounded-lg text-sm font-medium',
              {
                // 'bg-slate-100': isEqual(localValue?.value, o.value),
                'bg-slate-50': tabIndex === i
              }
            ]" @click.prevent="setValue(o.value, i)">
              {{ o.label }}
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>