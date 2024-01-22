<script setup lang="ts">
import { computed, ref, watch, getCurrentInstance } from 'vue'
import { useElementSize, useVModels } from '@vueuse/core'
import { vElementSize } from '@vueuse/components'
import PiInput from './PiInput.vue'
import PiPagination from './PiPagination.vue'
import PiCheckbox from './PiCheckbox.vue'
import PiIcon from './PiIcon.vue'
import PiButton from './PiButton.vue'
import PiDropdown from './PiDropdown.vue'

export interface TableColumn {
  label: string
  key: string
  isKey?: boolean
  returntedValue?: (val: any) => void
}

export interface Pagination {
  page: number
  total: number
  limit: number
}

const current = getCurrentInstance()

export interface TableProps {
  columns: TableColumn[]
  rows: Array<any>
  loading?: boolean
  search?: string
  selected?: any
  pagination?: Pagination
  searchPlaceholder?: string
  selectalbe?: boolean
  columnKey?: string
  showColumns?: string[]
  extraHeight?: number,
  emptyText?: string,
  selectAll?: boolean
}

defineOptions({
  name: 'PiTable'
})

const props = withDefaults(defineProps<TableProps>(), {
  extraHeight: 0,
  emptyText: 'No Data'
})

const emit = defineEmits<{
  (e: 'update:search', value: string | undefined): void,
  (e: 'update:pagination', value: Pagination | undefined): void,
  (e: 'search', value: string): void,
  (e: 'clear-search'): void,
  (e: 'update:selected', value: any[]): void,
  (e: 'update:showColumns', value: string[] | undefined): void
  (e: 'update:selectAll', value: boolean | undefined): void
}>()

const {
  search,
  pagination,
  selected,
  showColumns,
  selectAll
} = useVModels(props, emit)

const openDropdownColumn = ref(false)

watch(selectAll, (val) => {
  if (val) {
    const rows = props.columnKey
      ? props.rows.map(r => r[props.columnKey as string])
      : props.rows
    selected.value = rows
  } else {
    selected.value = []
  }
})

watch(() => props.pagination?.page, () => selectAll.value = false)

const pageCount = computed(() => {
  const { pagination } = props;
  if (pagination) {
    return Math.ceil(pagination.total / pagination.limit)
  }
})

const header = ref<HTMLDivElement | null>(null)
const footer = ref<HTMLDivElement | null>(null)

const headerHeight = computed(
  () => header.value?.clientHeight || 0
)
const footerHeight = computed(
  () => footer.value?.clientHeight || 0
)

const calculatedHeight = computed(() => {
  return window.innerHeight - props.extraHeight - headerHeight.value - footerHeight.value
})

const th = ref([])
const width = ref<{ [key: number]: number }>({})

const onThResize = ({ width: w, height }: { width: number, height: number }, index: number) => {
  width.value[index] = w
}

const table = ref<HTMLTableElement | null>(null)

const { width: tableWidth } = useElementSize(table)

const computedColumns = computed(() => {
  return props.columns.filter((column) => {
    return !column.isKey
  })
})
</script>

<template>
  <div ref="tableParent" class="border rounded-2xl border-gray-500/20 relative">
    <div ref="header" class="flex items-center py-4 px-4 border-gray-500/20 border-b">
      <div class="w-1/3">
        <PiInput prefix-icon="search" class="w-full" clearable :placeholder="searchPlaceholder" v-model="search"
          @clear="$emit('clear-search')" />
      </div>
      <!-- <div class="w-1/3 ml-auto flex justify-end">
        <PiDropdown v-model="openDropdownColumn" position="right">
          <PiButton>
            <div class="flex space-x-1 justify-end items-center text-gray-500">
              <PiIcon type="columns" size="18"></PiIcon>
              <span class="font-light underline">Column</span>
            </div>
          </PiButton>
          <template v-slot:item>
            <ul>
              <template v-for="(col, index) in columns">
                <li :key="index" v-if="!col.isKey" :class="index < columns.length - 1 ? 'mb-3' : ''">
                  <PiCheckbox
                    v-model="showColumns"
                    :id="`${col.key}-select`"
                    :value="col.key"
                    :label="col.label"
                  />
                </li>
              </template>
            </ul>
          </template>
        </PiDropdown>
      </div> -->
    </div>
    <div class="relative overflow-x-auto">
      <div class="w-full">
        <div :style="{ width: tableWidth + 'px' }" class="sticky top-0 z-20">
          <table class="text-sm table-auto border-collapse w-full">

            <thead class="text-xs text-gray-700 uppercase bg-gray-50 border-b border-slate-200">
              <tr>
                <th v-if="selectalbe" scope="col" aria-controls="col-0" class="px-6 py-3 w-10">
                  <PiCheckbox v-model="selectAll"></PiCheckbox>
                </th>
                <th v-for="(column, columnKey) in computedColumns" :key="columnKey" :aria-controls="`col-${columnKey + 1}`"
                  :style="{ width: `${width[columnKey + 1]}px` }" class="px-6 py-3 text-left" scope="col">
                  <span class="text-gray-500">{{ column.label }}</span>
                </th>
              </tr>
            </thead>
          </table>
        </div>
        <div class="w-full -mt-11" :style="{ height: `${calculatedHeight}px` }">
          <!-- Empty state -->
          <div v-if="!pagination?.total && !loading"
            class="absolute flex justify-center items-center bottom-0 top-0 w-full">
            <span class="text-sm text-gray-500">{{ emptyText }}</span>
          </div>
          <!-- Main table -->
          <table ref="table" class="text-sm table-auto border-collaps w-full">
            <colgroup>
              <col id="col-0">
              <col v-for="i in computedColumns.length" :key="i" :id="`col-${i}`" v-element-size="(e) => onThResize(e, i)">
            </colgroup>
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 border-b border-slate-200 text-left">
              <tr>
                <th v-if="selectalbe" scope="col" aria-controls="col-0" class="px-6 py-3 w-10">
                  <PiCheckbox v-model="selectAll"></PiCheckbox>
                </th>
                <th v-for="(column, columnKey) in computedColumns" :key="columnKey" ref="th" :aria-colindex="columnKey"
                  :class="['px-6 py-3 text-left whitespace-nowrap']" :aria-controls="`col-${columnKey + 1}`" scope="col">
                  <span>{{ column.label }}</span>
                </th>
              </tr>
            </thead>
            <tbody>
              <!-- Loading state -->
              <template v-if="loading">
                <tr v-for="i in pagination?.limit" :key="i" class="bg-white border-b border-gray-500/20 text-gray-600">
                  <td v-for="(column, columnKey) in computedColumns" :key="columnKey" class="px-6 py-4">
                    <div class="animate-pulse flex space-x-4">
                      <div class="rounded-full bg-slate-300 w-28 h-2"></div>
                      <span class="sr-only">loading {{ column }}</span>
                    </div>
                  </td>
                </tr>
              </template>
              <template v-else>
                <tr v-for="(row, rowKey) in rows" :key="rowKey"
                  class="bg-white border-b border-gray-500/20 text-gray-600 hover:bg-gray-50">
                  <td v-if="selectalbe" class="px-6 py-4 w-10">
                    <PiCheckbox v-model="selected" :value="columnKey ? row[columnKey] : row"></PiCheckbox>
                  </td>
                  <td v-for="(column, columnKey) in computedColumns" :key="columnKey" class="px-6 py-4 whitespace-nowrap">
                    <slot :name="column.key" v-bind="row">
                      {{ row[column.key] }}
                    </slot>
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Table footer -->
    <div ref="footer" class="grid grid-cols-3 gap-5 py-3 items-center px-6 border-t border-gray-500/20">
      <div v-if="pagination" class="flex items-center space-x-3">
        <span>Row per page:</span>
        <div class="flex items-center space-x-2">
          <select v-model="pagination.limit"
            class="text-gray-500 font-light underline border-none cursor-pointer outline-none">
            <option v-for="i in [15, 20, 50, 100]" :key="i" :value="i">{{ i }}</option>
          </select>
        </div>
      </div>
      <div class="flex justify-center">
        <PiPagination v-if="pagination && pagination.total > 0" v-model="pagination.page" :limit="pagination.limit"
          :total="pagination.total" />
      </div>
      <div v-if="pagination && pagination.total" class="flex items-center space-x-2 justify-end">
        <span>Page:</span>
        <div class="flex items-center space-x-2">
          <select v-model="pagination.page"
            class="text-gray-500 font-light underline border-none cursor-pointer outline-none">
            <option v-for="i in pageCount" :key="i" :value="i">{{ i }}</option>
          </select>
        </div>
        <span class="text-sm text-gray-500">of {{ pageCount }}</span>
      </div>
    </div>
  </div>
</template>