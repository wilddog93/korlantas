<script setup lang="ts">
import PiSelect, { type Option as SelectOption } from '@/components/ui/PiSelect.vue';
import PiTable, { TableColumn } from '@/components/ui/PiTable.vue';
import useAxios from '@/composables/use-axios';
import { computed, reactive, ref, watch } from 'vue';
import { dataPetugas, DataPetugasProps } from "@/data-lakalantas"
import { formatPhone } from "@/utils"
import { addWeeks, endOfMonth, endOfYear, startOfMonth, startOfWeek, startOfYear, subMonths } from 'date-fns';
import PiIcon from '@/components/ui/PiIcon.vue';
import PiCard from '@/components/ui/PiCard.vue';
import { watchDebounced } from '@vueuse/core';

// interface

// search-table
const searchInput = ref('');
const onClear = () => {
  searchInput.value = ""
}

// kategori-option
const categoryOptions: SelectOption[] = [
  {
    label: "Depan",
    value: "depan"
  },
  {
    label: "Belakang",
    value: "belakang"
  },
  {
    label: "Kiri",
    value: "kiri"
  },
  {
    label: "Kanan",
    value: "kanan"
  },
  {
    label: "Depan - Belakang",
    value: "depan-belakang"
  },
  {
    label: "Kiri - Kanan",
    value: "kiri-kanan"
  },
];
const selectedCategory = ref<any>();
const selectedSearch = ref<string>("");

const searchCategories = computed(() => {
  return categoryOptions.filter(c => {
    return c.label.toLowerCase().includes(selectedSearch.value.toLowerCase())
  })
})

// watchDebounced(
//   selectedSearch,
//   (v) => {
//     const hasSearchFilter = Boolean(v);
//     let filteredCategory = [...categoryOptions];

//     if (hasSearchFilter) {
//       filteredCategory = filteredCategory.filter((cat) =>
//         cat.label.toLowerCase().includes(v.toLowerCase())
//       );
//     }
//     console.log(filteredCategory)
//     return filteredCategory;
//   }, { debounce: 2000 })

// date-range
const currentDate = new Date();
const date = ref([currentDate, currentDate]);

// Get the start of the current week
const startOfCurrentWeek = startOfWeek(currentDate);
const endOfCurrentWeek = startOfWeek(addWeeks(currentDate, 1));

// Get the start of last week
const startOfLastWeek = startOfWeek(addWeeks(currentDate, -1));
const endOfLastWeek = startOfWeek(addWeeks(startOfLastWeek, 1));

const presetDates = ref([
  { label: 'Today', value: [currentDate, currentDate] },
  // {
  //   label: 'Today (Slot)',
  //   value: [new Date(), new Date()],
  //   slot: 'preset-date-range-button'
  // },
  { label: 'Last week', value: [startOfLastWeek, endOfLastWeek] },
  { label: 'This week', value: [startOfCurrentWeek, endOfCurrentWeek] },
  { label: 'This month', value: [startOfMonth(currentDate), endOfMonth(currentDate)] },
  {
    label: 'Last month',
    value: [startOfMonth(subMonths(currentDate, 1)), endOfMonth(subMonths(currentDate, 1))],
  },
  { label: 'This year', value: [startOfYear(currentDate), endOfYear(currentDate)] },
]);


const columns = computed<TableColumn[]>(() => [
  { label: "ID", key: "id", isKey: true },
  { label: "Kode Petugas", key: "kode_petugas" },
  { label: "Nama Tampilan", key: "nama_panggilan" },
  { label: "Nama Lengkap", key: "nama_lengkap" },
  { label: "Prioritas", key: "lokasi" },
  { label: "Waktu Terdaftar", key: "waktu_terdaftar" },
  { label: "Nomor Telpon", key: "no_telp" },
  { label: "Aksi", key: "aksi" },
]);

interface Meta {
  page: number
  limit: number
  total: number
}

interface Response {
  data: DataPetugasProps[]
  meta: Meta
}

const defaultMeta = (): Meta => ({
  page: 1,
  total: 0,
  limit: 10,
})

const table = reactive<Response>({
  data: [],
  meta: defaultMeta(),
})

const fetching = ref(false)
// const axios = useAxios();

const fetchData = async (pager = 1) => {
  try {
    fetching.value = true
    const { data, total, page, limit } = await dataPetugas
    table.data = data;
    table.meta = { page, total, limit }
  } catch (error) {
    console.log(error)
  } finally {
    fetching.value = false
  }
}

fetchData();

watch(() => table.meta.page, (v) => {
  fetchData(v);
})

const selectAll = ref(false);
const selected = ref([])

</script>


<template>
  <div class="w-full bg-gray-100 p-4 tracking-wide">
    <div class="w-full flex flex-col lg:flex-row lg:justify-between lg:items-center mb-5">
      <div class="w-full lg:w-1/2">
        <h3 class="font-semibold text-lg">Data Petugas</h3>
      </div>
      <div class="w-full lg:w-1/2 flex items-center justify-end gap-2">
        <button type="button" class="rounded-full px-5 h-10 bg-white border hover:bg-gray-200 text-gray-500 text-sm">
          <div class="flex items-center space-x-3">
            <span>Unggah Data</span>
            <PiIcon :size="16" type="upload" class="text-inherit"></PiIcon>
          </div>
        </button>

        <button type="button" class="rounded-full px-5 h-10 bg-primary-600 hover:bg-primary-500 text-white text-sm">
          <div class="flex items-center space-x-3">
            <span>Tambah Pengumuman</span>
            <PiIcon :size="16" type="plus" class="text-white"></PiIcon>
          </div>
        </button>
      </div>
    </div>

    <div class="w-full">
      <PiTable selectalbe search-placeholder="Search user" v-model:search="searchInput" @clear-search="onClear"
        column-key="id" :columns="columns" :rows="table.data" :loading="fetching" :extra-height="200"
        v-model:selected="selected" v-model:selectAll="selectAll" v-model:pagination="table.meta">

        <!-- header -->
        <template v-slot:header>
          <div class="w-full flex flex-col lg:flex-row gap-2 lg:justify-end">
            <div class="w-full lg:w-2/3 flex gap-1 px-2 items-center lg:justify-end">
              <p class="text-sm w-full max-w-max text-gray-500">Jenis Kecelakaan:</p>
              <PiSelect show-search v-model:search="selectedSearch"
                btn-class="w-[14rem] lg:w-[12rem] rounded-full py-2 focus:border focus:border-primary-500 bg-white"
                v-model="selectedCategory" :options="searchCategories" :selected-text="selectedCategory"
                placeholder="Pilih Jenis" />
            </div>

            <div class="w-full lg:w-1/3">
              <VueDatePicker v-model="date" range :preset-dates="presetDates">
                <template #dp-input="{ value }">
                  <input type="text" :value="value"
                    class="w-full px-8 py-2 rounded-full border border-gray-300 focus:border-primary-500 text-sm">
                </template>
                <template #input-icon>
                  <PiIcon type="calendar" :size="16" class="ml-2" />
                </template>
                <template #preset-date-range-button="{ label, value, presetDate }">
                  <span role="button" :tabindex="0" @click="presetDate(value)" @keyup.enter.prevent="presetDate(value)"
                    @keyup.space.prevent="presetDate(value)">
                    {{ label }}
                  </span>
                </template>
              </VueDatePicker>
            </div>
          </div>
        </template>

        <template v-slot:subHeader>
          <div class="grid grid-cols-7 gap-2 mb-3 bg-white rounded-xl">
            <PiCard class="w-full p-4 font-semibold">
              <h1 class="text-sm text-gray-500">Bitung</h1>
              <p class="text-xl">50</p>
            </PiCard>
            <PiCard class="w-full p-4 font-semibold">
              <h1 class="text-sm text-gray-500">Cikampek</h1>
              <p class="text-xl">50</p>
            </PiCard>
            <PiCard class="w-full p-4 font-semibold">
              <h1 class="text-sm text-gray-500">Cipularang</h1>
              <p class="text-xl">50</p>
            </PiCard>
            <PiCard class="w-full p-4 font-semibold">
              <h1 class="text-sm text-gray-500">Serang</h1>
              <p class="text-xl">50</p>
            </PiCard>
            <PiCard class="w-full p-4 font-semibold">
              <h1 class="text-sm text-gray-500">Jagorawi</h1>
              <p class="text-xl">50</p>
            </PiCard>
            <PiCard class="w-full p-4 font-semibold">
              <h1 class="text-sm text-gray-500">BSD</h1>
              <p class="text-xl">50</p>
            </PiCard>
            <PiCard class="w-full p-4 font-semibold">
              <h1 class="text-sm text-gray-500">Borr</h1>
              <p class="text-xl">50</p>
            </PiCard>
          </div>
        </template>

        <!-- rows -->
        <template v-slot:no_telp="row">
          <span>{{ formatPhone("+62", row.no_telp) }}</span>
        </template>

        <template v-slot:aksi="row">
          <div class="flex items-center gap-1">
            <button class="p-1 text-primary-600" @click="console.log(row.id, 'edit-action')">
              <PiIcon type="edit" :size="16" class="text-inherit" />
            </button>
            <button class="p-1 text-primary-600" @click="console.log(row.id, 'detail-action')">
              <PiIcon type="eye" :size="16" class="text-inherit" />
            </button>
          </div>
        </template>
      </PiTable>
    </div>
  </div>
</template>