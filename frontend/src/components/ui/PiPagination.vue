<script setup lang="ts">
import { computed } from 'vue';
import usePagination from './composables/use-pagination';
import PiIcon from './PiIcon.vue';

export interface Props {
  modelValue: number
  limit: number
  total: number
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'update:modelValue', value?: number): void,
}>()

const { paginate } = usePagination()

const page = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const pageCount = computed(() => Math.ceil(props.total / props.limit))

const changePage = (to: number) =>
  page.value != to ? emit('update:modelValue', to) : null

const next = () => {
  if (page.value && page.value < pageCount.value) changePage(page.value + 1)
}

const prev = () => {
  if (page.value && page.value > 1) changePage(page.value - 1)
}

const pages = computed(() =>
  paginate(pageCount.value, page.value - 1, 9)
)
</script>
<template>
  <div>
    <ul class="items-center inline-flex space-x-1">
      <li>
        <component
          :is="page > 1 ? 'button': 'span'"
          @click="prev"
          class="flex flex-none h-8 w-8 rounded-full font-medium text-xs items-center justify-center appearance-none hover:bg-gray-100"
        >
          <PiIcon :size="20" type="chevron-left"></PiIcon>
        </component>
      </li>
      <template v-for="n in pages" :key="n">
        <li v-if="n > -1">
          <button
            :class="[
              'flex flex-none h-8 w-8 rounded-full font-medium text-xs items-center justify-center appearance-none',
              {
                'bg-primary-500 text-white ': page == n + 1,
                'hover:bg-gray-100': page != n + 1
              }
            ]"
            @click.prevent="changePage(n + 1)"
          >
            {{ n + 1 }}
          </button>
        </li>
        <li v-else>
          <span class="flex flex-none h-8 w-8 justify-center text-gray-400">...</span>
        </li>
      </template>
      <li>
        <component
          :is="page < pageCount ? 'button': 'span'"
          @click="next"
          class="flex flex-none h-8 w-8 rounded-full font-medium text-xs items-center justify-center appearance-none hover:bg-gray-100"
        >
          <PiIcon :size="20" type="chevron-right"></PiIcon>
        </component>
      </li>
    </ul>
  </div>
</template>