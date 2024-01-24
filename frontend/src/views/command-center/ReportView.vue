<script setup lang="ts">
import PiSelect, { type Option as SelectOption } from '@/components/ui/PiSelect.vue';
import PiTable, { TableColumn } from '@/components/ui/PiTable.vue';
// import useAxios from '@/composables/use-axios';
import { computed, reactive, ref, watch } from 'vue';
import { dataPetugas, DataPetugasProps } from "@/data-lakalantas"
import { formatPhone } from "@/utils"
import { addWeeks, endOfMonth, endOfYear, startOfMonth, startOfWeek, startOfYear, subMonths } from 'date-fns';
import PiIcon from '@/components/ui/PiIcon.vue';
import PiCard from '@/components/ui/PiCard.vue';
// import { watchDebounced } from '@vueuse/core';

// interface

// search-table
const searchInput = ref('');
const onClear = () => {
    searchInput.value = ""
}

// kategori-option
const categoryOptions: SelectOption[] = [
    {
        label: "Parent",
        value: "Parent"
    },
    {
        label: "Children",
        value: "Children"
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
        console.log(pager)
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

const dataBoardReport = [
    {
        id: 1,
        images: "./src/assets/images/icon-report/analisis-lokasi-laka.png",
        title: "Analisis Lokasi Laka Terbanyak"
    },
    {
        id: 2,
        images: "./src/assets/images/icon-report/analisis-lokasi-laka.png",
        title: "Analisis Lokasi Korban Terbanyak"
    },
    {
        id: 3,
        images: "./src/assets/images/icon-report/analisis-lokasi-laka.png",
        title: "Analisis Waktu Laka"
    },
    {
        id: 4,
        images: "./src/assets/images/icon-report/statistik-waktu.png",
        title: "Statistik Waktu Laka"
    },
    {
        id: 5,
        images: "./src/assets/images/icon-report/analisis-faktor-utama.png",
        title: "Analisis Faktor Utama Laka"
    },
    {
        id: 6,
        images: "./src/assets/images/icon-report/analisis-rata-kerugian.png",
        title: "Analisis Rata-Rata Kerugian"
    },
    {
        id: 7,
        images: "./src/assets/images/icon-report/statistik-prilaku-pengemudi.png",
        title: "Statistik Prilaku Pengemudi"
    },
    {
        id: 8,
        images: "./src/assets/images/icon-report/statistik-jenis-lokasi-kendaraan.png",
        title: "Statistik Jenis Kendaraan"
    },
    {
        id: 9,
        images: "./src/assets/images/icon-report/statistik-jenis-laka.png",
        title: "Statistik Jenis Laka"
    },
    {
        id: 10,
        images: "./src/assets/images/icon-report/statistik-jenis-lokasi-kendaraan.png",
        title: "StatistiK Lokasi Kecelakaan"
    },
    {
        id: 11,
        images: "./src/assets/images/icon-report/statistik-jumlah-korban.png",
        title: "Statistik Jumlah Korban"
    }
]

const indexing = [0, 1, 2];

</script>


<template>
    <div class="w-full bg-gray-100 p-4 tracking-wide">
        <div class="w-full flex flex-col lg:flex-row lg:justify-between lg:items-center mb-5">
            <div class="w-full lg:w-1/3">
                <h3 class="font-semibold text-lg">Laporan</h3>
            </div>
            <div class="w-full lg:w-2/3 flex items-center justify-end gap-2">
                <div class="w-full flex flex-col lg:flex-row gap-2 lg:justify-end">
                    <PiSelect show-search v-model:search="selectedSearch"
                            btn-class="w-[11rem] rounded-full py-2 focus:border focus:border-primary-500 bg-white"
                            v-model="selectedCategory" :options="searchCategories" :selected-text="selectedCategory"
                            placeholder="Pilih induk" />

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
                                <span role="button" :tabindex="0" @click="presetDate(value)"
                                    @keyup.enter.prevent="presetDate(value)" @keyup.space.prevent="presetDate(value)">
                                    {{ label }}
                                </span>
                            </template>
                        </VueDatePicker>
                    </div>

                    <div class="w-full lg:w-1/3">
                        <button type="button"
                            class="rounded-full px-5 h-10 bg-white border hover:bg-gray-200 text-gray-500 text-sm">
                            <div class="flex items-center space-x-3">
                                <span>Cetak Semua Laporan</span>
                                <PiIcon :size="16" type="printer" class="text-inherit"></PiIcon>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <div class="w-full mb-3">
            <h3 class="font-semibold text-md text-gray-500">Umum</h3>

            <div v-if="dataBoardReport.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                <PiCard v-for="(item, index) in indexing" :key="item" class="w-full p-4 bg-white rounded-lg">
                    <div class="grid grid-cols-1 lg:grid-cols-3">
                        <div><img :src="dataBoardReport[index].images" alt="icon" /></div>
                        <div class="w-full lg:col-span-2">{{ dataBoardReport[index].title }}</div>
                    </div>
                </PiCard>
            </div>
        </div>

        <div class="w-full">
            <h3 class="font-semibold text-md text-gray-500">Jagorawi</h3>

            <div v-if="dataBoardReport.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                <PiCard v-for="(item, index) in dataBoardReport" :key="index" class="w-full p-4 bg-white rounded-lg">
                    <div class="grid grid-cols-1 lg:grid-cols-3">
                        <div><img :src="item.images" alt="icon" /></div>
                        <div class="w-full lg:col-span-2">{{ item.title }}</div>
                    </div>
                </PiCard>
            </div>
        </div>
    </div>
</template>